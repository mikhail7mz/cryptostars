const CURRENCY_FORMAT = 'ru-RU';

const formBuySellElement = document.querySelector('#form-buy-sell');
const sendingAmountField = document.querySelector('#sending-amount');

const pristine = new Pristine(formBuySellElement, {
  classTo: 'custom-input',
  errorTextParent: 'custom-input',
  errorTextClass: 'custom-input__error'
});

const getUserBalance = () => {
  const sendingCurrencyField = document.querySelector('#sending-currency').value;
  return JSON.parse(localStorage.getItem('balances'))
    .find((balance) => balance.currency === sendingCurrencyField).amount;
};

const getMessageSendingAmountMin = () => `Минимальная сумма — ${localStorage.getItem('cashLimitMin')} ₽`;
const getMessageSendingAmountMax = () => `Максимальная сумма — ${localStorage.getItem('cashLimitMax')} ₽`;
const getMessageLowBalance = () => `У вас на счету только — ${getUserBalance().toLocaleString(CURRENCY_FORMAT)} ₽`;

const validateByCashLimitMin = () => sendingAmountField.value >= parseFloat(localStorage.getItem('cashLimitMin'));
const validateByCashLimitMax = () => sendingAmountField.value <= parseFloat(localStorage.getItem('cashLimitMax'));
const validateByBalance = () => sendingAmountField.value <= getUserBalance();

const validateForm = () => pristine.validate();
const resetFormValidator = () => pristine.reset();

const initFormValidator = () => {
  pristine.addValidator(sendingAmountField, validateByCashLimitMin, getMessageSendingAmountMin);
  pristine.addValidator(sendingAmountField, validateByCashLimitMax, getMessageSendingAmountMax);
  pristine.addValidator(sendingAmountField, validateByBalance, getMessageLowBalance);
};

export {initFormValidator, validateForm, resetFormValidator};
