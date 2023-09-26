import {editCashLimit} from '../utils/utils.js';
import {renderForm} from '../form-buy-sell/render-form.js';

const userTableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');

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

const createListItem = (contractor) => {
  const {userName, balance, exchangeRate, paymentMethods} = contractor;
  const tableRow = userTableRowTemplate.cloneNode(true);

  if (!contractor.isVerified) {
    tableRow.querySelector('.users-list__table-name svg').remove();
  }

  tableRow.querySelector('.users-list__table-name span').textContent = userName;
  tableRow.querySelector('.users-list__table-currency').textContent = balance.currency;
  tableRow.querySelector('.users-list__table-exchangerate').textContent = exchangeRate;
  editCashLimit(tableRow.querySelector('.users-list__table-cashlimit'), contractor);
  editPaymentBadges(tableRow.querySelector('.users-list__badges-list'), paymentMethods);
  tableRow.querySelector('.users-list__table-btn button').addEventListener('click', (event) => onButtonBuySellClick(event, contractor));
  return tableRow;
};

export {createListItem};
