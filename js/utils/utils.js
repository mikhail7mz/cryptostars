const CURRENCY_FORMAT = 'ru-RU';
const STATUS_BUYER = 'buyer';
const STATUS_SELLER = 'seller';
const AMOUNT_PRECISION = 2;

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
const convertKeksToRub = (amount, exchangeRate) => amount * exchangeRate;

const convertRubToKeks = (amount, exchangeRate) => amount / exchangeRate;

const editCashLimit = (element, contractor) => {
  const {status, minAmount, balance, exchangeRate} = contractor;
  let min, max;

  if (status === STATUS_BUYER) {
    min = minAmount.toFixed(AMOUNT_PRECISION);
    max = balance.amount.toFixed(AMOUNT_PRECISION);
  }

  if (status === STATUS_SELLER) {
    min = convertKeksToRub(minAmount, exchangeRate).toFixed(AMOUNT_PRECISION);
    max = convertKeksToRub(balance.amount, exchangeRate).toFixed(AMOUNT_PRECISION);
  }

  localStorage.setItem('cashLimitMin', min);
  localStorage.setItem('cashLimitMax', max);
  element.innerHTML = `${parseFloat(min).toLocaleString(CURRENCY_FORMAT)}&nbsp;₽&nbsp;-&nbsp;${parseFloat(max).toLocaleString(CURRENCY_FORMAT)}&nbsp;₽`;
};

const getActiveButton = (buttons) => Array.from(buttons).find((button) => button.classList.contains('is-active'));

const isEscape = (event) => event.key === 'Escape';

export {createElement, convertKeksToRub, convertRubToKeks, editCashLimit, getActiveButton, isEscape};
