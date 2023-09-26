import {convertKeksToRub} from '../utils/utils.js';

const CURRENCY_FORMAT = 'ru-RU';
const CURRENCY = 'RUB';

const formBuySellElement = document.querySelector('#form-buy-sell');
const exchangeRateField = document.querySelector('#exchange-rate');
const sendingAmountField = document.querySelector('#sending-amount');
const sendingCurrencyField = document.querySelector('#sending-currency');
const sendingUnitElement = document.querySelector('#sending-unit');

const pristine = new Pristine(formBuySellElement, {
  classTo: 'custom-input',
  errorTextParent: 'custom-input',
  errorTextClass: 'custom-input__error'
});

const getUserBalance = () => JSON.parse(localStorage.getItem('balances'))
  .find((balance) => balance.currency === sendingCurrencyField.value).amount;

const getMessageSendingAmountMin = () => `Минимальная сумма — ${localStorage.getItem('cashLimitMin')} ₽`;
const getMessageSendingAmountMax = () => `Максимальная сумма — ${localStorage.getItem('cashLimitMax')} ₽`;
const getMessageLowBalance = () => `У вас на счету только — ${getUserBalance().toLocaleString(CURRENCY_FORMAT)} ${sendingUnitElement.textContent}`;

const validateByCashLimitMin = () => {
  let value = sendingAmountField.value;
  if (sendingCurrencyField.value !== CURRENCY) {
    value = convertKeksToRub(value, exchangeRateField.value);
  }
  return value >= parseFloat(localStorage.getItem('cashLimitMin'));
};

const validateByCashLimitMax = () => {
  let value = sendingAmountField.value;
  if (sendingCurrencyField.value !== CURRENCY) {
    value = convertKeksToRub(value, exchangeRateField.value);
  }
  return value <= parseFloat(localStorage.getItem('cashLimitMax'));
};

const validateByBalance = () => sendingAmountField.value <= getUserBalance();

const validateForm = () => pristine.validate();
const resetFormValidator = () => pristine.reset();

const initFormValidator = () => {
  pristine.addValidator(sendingAmountField, validateByCashLimitMin, getMessageSendingAmountMin);
  pristine.addValidator(sendingAmountField, validateByCashLimitMax, getMessageSendingAmountMax);
  pristine.addValidator(sendingAmountField, validateByBalance, getMessageLowBalance);
};

export {initFormValidator, validateForm, resetFormValidator};
