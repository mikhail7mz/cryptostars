import {createElement, convertKeksToRub, convertRubToKeks, editCashLimit} from '../utils/utils.js';

const STATUS_BUYER = 'buyer';
const STATUS_SELLER = 'seller';
const CASH_PAYMENT_PROVIDER_NAME = 'Cash in person';

const formSettings = {
  formTitle: {
    buyer: 'Продажа криптовалюты',
    seller: 'Покупка криптовалюты'
  },
  formType: {
    buyer: 'SELL',
    seller: 'BUY'
  },
  sendingCurrency: {
    buyer: 'KEKS',
    seller: 'RUB'
  },
  sendingUnit: {
    buyer: 'KEKS',
    seller: '₽'
  },
  receivingUnit: {
    buyer: '₽',
    seller: 'KEKS'
  },
};

const changeEvent = new CustomEvent('change');
const inputEvent = new CustomEvent('input');

const formTitleElement = document.querySelector('#form-title');
const formTypeField = document.querySelector('#type');
const contractorIdField = document.querySelector('#contractor-id');
const exchangeRateField = document.querySelector('#exchange-rate');
const sendingCurrencyField = document.querySelector('#sending-currency');
const receivingCurrencyField = document.querySelector('#receiving-currency');

const contractorNameIconElement = document.querySelector('#contractor-name-icon');
const contractorNameElement = document.querySelector('#contractor-name');
const exchangeRateElement = document.querySelector('#exchange-rate-info');
const cashLimitElement = document.querySelector('#cash-limit');

const sendingUnitElement = document.querySelector('#sending-unit');
const sendingAmountField = document.querySelector('#sending-amount');
const receivingUnitElement = document.querySelector('#receiving-unit');
const receivingAmountField = document.querySelector('#receiving-amount');
const paymentMethodField = document.querySelector('#paymentMethod');
const bankCardNumberField = document.querySelector('#bank-card-number');
const walletNumberField = document.querySelector('#wallet-number');

const paymentDataElement = document.querySelector('#payment-data');
const paymentMethodContainerElement = document.querySelector('#payment-method-container');
const walletNumberContainerElement = document.querySelector('#wallet-number-container');
const passwordContainerElement = document.querySelector('#password-container');

const buttonSendAllElement = document.querySelector('#button-send-all');
const buttonReceiveAllElement = document.querySelector('#button-receive-all');

let contractor;

const getPaymentMethods = () => {
  switch (contractor.status) {
    case STATUS_SELLER:
      return contractor.paymentMethods;
    case STATUS_BUYER:
      return JSON.parse(localStorage.getItem('paymentMethods'));
    default:
      return {};
  }
};

const onSendingAmountChange = ({target}) => {
  const {status, exchangeRate} = contractor;
  let value;
  switch (status) {
    case STATUS_SELLER:
      value = convertRubToKeks(target.value, exchangeRate);
      break;
    case STATUS_BUYER:
      value = convertKeksToRub(target.value, exchangeRate);
      break;
  }
  receivingAmountField.value = value;
  receivingAmountField.dispatchEvent(inputEvent);
};

const onReceivingAmountChange = ({target}) => {
  const {status, exchangeRate} = contractor;
  let value;
  switch (status) {
    case STATUS_SELLER:
      value = convertKeksToRub(target.value, exchangeRate);
      break;
    case STATUS_BUYER:
      value = convertRubToKeks(target.value, exchangeRate);
      break;
  }
  sendingAmountField.value = value;
  sendingAmountField.dispatchEvent(inputEvent);
};

const onButtonSendAllClick = () => {
  sendingAmountField.value = JSON.parse(localStorage.getItem('balances'))
    .find((item) => item.currency === formSettings.sendingCurrency[contractor.status]).amount;
  sendingAmountField.dispatchEvent(changeEvent);
  sendingAmountField.dispatchEvent(inputEvent);
  receivingAmountField.dispatchEvent(inputEvent);
};

const onButtonReceiveAllClick = () => {
  receivingAmountField.value = contractor.balance.amount;
  receivingAmountField.dispatchEvent(changeEvent);
  sendingAmountField.dispatchEvent(inputEvent);
};

const onPaymentMethodsSelectChange = ({target}) => {
  let value = '';

  if (target.value !== CASH_PAYMENT_PROVIDER_NAME) {
    value = getPaymentMethods().find((method) => method.provider === target.value).accountNumber;
  }

  bankCardNumberField.value = value;
};

const editPaymentMethodsField = (select, paymentMethods) => {
  const optionsFragment = document.createDocumentFragment();
  optionsFragment.append(select.firstElementChild);
  paymentMethods.forEach((method) => {
    optionsFragment.append(createElement(`<option>${method.provider}</option>`));
  });
  select.replaceChildren(optionsFragment);
  select.value = select.firstElementChild.value;
  select.addEventListener('change', onPaymentMethodsSelectChange);
};

const editWalletNumberField = ({status, wallet}) => {
  let walletNumber;
  switch (status) {
    case STATUS_SELLER:
      walletNumber = JSON.parse(localStorage.getItem('wallet')).address;
      break;
    case STATUS_BUYER:
      walletNumber = wallet.address;
      break;
  }
  walletNumberField.value = walletNumber;
};

const updateFormData = (data) => {
  const {id, balance, exchangeRate, isVerified, status, userName} = data;
  contractor = data;

  formTitleElement.textContent = formSettings.formTitle[status];
  formTypeField.value = formSettings.formType[status];
  contractorIdField.value = id;
  exchangeRateField.value = exchangeRate;
  sendingCurrencyField.value = formSettings.sendingCurrency[status];
  receivingCurrencyField.value = balance.currency;

  contractorNameIconElement.style.display = (isVerified) ? 'block' : 'none';
  contractorNameElement.textContent = userName;
  exchangeRateElement.textContent = exchangeRate;

  editCashLimit(cashLimitElement, data);

  sendingUnitElement.textContent = formSettings.sendingUnit[status];
  sendingAmountField.value = '';

  receivingUnitElement.textContent = formSettings.receivingUnit[status];
  receivingAmountField.value = '';

  editPaymentMethodsField(paymentMethodField, getPaymentMethods());
  bankCardNumberField.value = '';

  editWalletNumberField(data);

  sendingAmountField.addEventListener('change', onSendingAmountChange);
  receivingAmountField.addEventListener('change', onReceivingAmountChange);

  buttonSendAllElement.addEventListener('click', onButtonSendAllClick);
  buttonReceiveAllElement.addEventListener('click', onButtonReceiveAllClick);

  switch (status) {
    case STATUS_SELLER:
      paymentDataElement.insertBefore(walletNumberContainerElement, passwordContainerElement);
      break;
    case STATUS_BUYER:
      paymentDataElement.insertBefore(walletNumberContainerElement, paymentMethodContainerElement);
      break;
  }
};

export {updateFormData};
