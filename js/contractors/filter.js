const TRANSACTION_BUY_TEXT = 'Купить';
const TRANSACTION_BUY_CONTRACTOR_STATUS = 'seller';
const TRANSACTION_SELL_TEXT = 'Продать';
const TRANSACTION_SELL_CONTRACTOR_STATUS = 'buyer';
const TEXT_CONTENT_MAP = 'Карта';
const CASH_ONLY_TEXT = 'Cash in person';

let status = '';
let isVerifiedContractorsOnly = false;
let isCashOnly = false;

const filterByStatus = (contractorStatus) => contractorStatus === status;

const filterByVerification = (isContractorVerified) => !isVerifiedContractorsOnly || isContractorVerified;

const filterByPaymentMethod = (paymentMethods) => !isCashOnly || paymentMethods.some((method) => method.provider === CASH_ONLY_TEXT);

const filterContractors = (contractors) => {
  const buttonBuySellActiveElement = document.querySelector('.tabs--toggle-buy-sell [data-tabs="control"].is-active');
  const buttonListMapActiveElement = document.querySelector('.tabs--toggle-list-map [data-tabs="control"].is-active');
  const toggleCheckedUsersElement = document.querySelector('#checked-users');

  isVerifiedContractorsOnly = toggleCheckedUsersElement.checked;
  isCashOnly = buttonListMapActiveElement.textContent === TEXT_CONTENT_MAP;

  switch (buttonBuySellActiveElement.textContent) {
    case TRANSACTION_BUY_TEXT:
      status = TRANSACTION_BUY_CONTRACTOR_STATUS;
      break;

    case TRANSACTION_SELL_TEXT:
      status = TRANSACTION_SELL_CONTRACTOR_STATUS;
      break;
  }

  return contractors.filter((contractor) =>
    filterByStatus(contractor.status) &&
    filterByVerification(contractor.isVerified) &&
    filterByPaymentMethod(contractor.paymentMethods || [])
  );
};

export {filterContractors};
