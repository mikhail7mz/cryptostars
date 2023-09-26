import {editCashLimit} from '../utils/utils.js';
import {renderForm} from '../form-buy-sell/render-form.js';

const userCardTemplate = document.querySelector('#map-baloon__template').content.querySelector('.user-card');

const editPaymentBadges = (element, paymentMethods) => {
  if (!paymentMethods || !paymentMethods.length) {
    element.remove();
    return;
  }

  const paymentBadgeTemplate = element.firstElementChild;
  element.innerHTML = '';

  paymentMethods.forEach((paymentMethod) => {
    const newPaymentBadge = paymentBadgeTemplate.cloneNode(true);
    newPaymentBadge.textContent = paymentMethod.provider;
    element.append(newPaymentBadge);
  });
};

const onButtonBuySellClick = (event, contractor) => {
  event.preventDefault();
  renderForm(contractor);
};

const createCard = (contractor) => {
  const {userName, balance, exchangeRate, isVerified, paymentMethods} = contractor;
  const userCard = userCardTemplate.cloneNode(true);

  if (!isVerified) {
    userCard.querySelector('.user-card__user-name svg').style.display = 'none';
  }
  userCard.querySelector('.user-card__user-name span').textContent = userName;
  userCard.querySelector('#user-card-currency').textContent = balance.currency;
  userCard.querySelector('#user-card-exchange-rate').textContent = exchangeRate;
  editCashLimit(userCard.querySelector('#user-card-amount'), contractor);
  editPaymentBadges(userCard.querySelector('.user-card__badges-list'), paymentMethods);
  userCard.querySelector('.user-card__change-btn').addEventListener('click', (event) => onButtonBuySellClick(event, contractor));

  return userCard;
};

export {createCard};
