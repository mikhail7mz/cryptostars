import {isEscape} from '../utils/utils.js';
import {updateFormData} from './update-form-data.js';
import {validateForm, resetFormValidator} from './validation.js';
import {sendData} from '../utils/data.js';

const SEND_DATA_URL = 'https://cryptostar.grading.pages.academy';

const STATUS_BUYER = 'buyer';
const STATUS_SELLER = 'seller';

const modalBuySellElement = document.querySelector('#modal-buy-sell');
const formBuySellElement = document.querySelector('#form-buy-sell');
const buttonCloseElement = document.querySelector('.modal__close-btn');
const modalOverlayElement = document.querySelector('.modal__overlay');

const formMessageSuccessElement = document.querySelector('#form-message-success');
const formMessageErrorElement = document.querySelector('#form-message-error');

const onButtonCloseClick = (event) => {
  event.preventDefault();
  closeForm();
};

const onModalOverlayClick = (event) => {
  event.preventDefault();
  closeForm();
};

const onDocumentKeydown = (event) => {
  if (isEscape(event) && !event.target.closest('.modal__content')) {
    closeForm();
  }
};

const onSendDataSuccess = () => {
  formMessageSuccessElement.style.display = 'flex';
  formMessageErrorElement.style.display = 'none';
};

const onSendDataError = () => {
  formMessageSuccessElement.style.display = 'none';
  formMessageErrorElement.style.display = 'flex';
};

const onFormSubmit = (event) => {
  event.preventDefault();
  if (validateForm()) {
    sendData(SEND_DATA_URL, onSendDataSuccess, onSendDataError, new FormData(event.target));
  } else {
    formMessageSuccessElement.style.display = 'none';
    formMessageErrorElement.style.display = 'flex';
  }
};

const openForm = (contractor) => {
  formBuySellElement.reset();
  resetFormValidator();
  switch (contractor.status) {
    case STATUS_BUYER:
      modalBuySellElement.classList.add('modal--sell');
      formBuySellElement.classList.add('modal-sell');

      modalBuySellElement.classList.remove('modal--buy');
      formBuySellElement.classList.remove('modal-buy');
      break;

    case STATUS_SELLER:
      modalBuySellElement.classList.add('modal--buy');
      formBuySellElement.classList.add('modal-buy');

      modalBuySellElement.classList.remove('modal--sell');
      formBuySellElement.classList.remove('modal-sell');
      break;
  }

  modalBuySellElement.style.display = 'flex';
  modalBuySellElement.classList.add('is-active');
  document.body.classList.add('scroll-lock');
  modalOverlayElement.addEventListener('click', onModalOverlayClick);
  buttonCloseElement.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
  formBuySellElement.addEventListener('submit', onFormSubmit);
};

/*
  Функции closeForm и обработчики событий ссылаются друг на друга.
  Во избежании ошибок линтера closeForm написана декларативным способом.
*/
function closeForm () {
  formBuySellElement.reset();
  resetFormValidator();

  modalBuySellElement.style.display = 'none';
  modalBuySellElement.classList.remove('is-active');
  formMessageSuccessElement.style.display = 'none';
  formMessageErrorElement.style.display = 'none';
  document.body.classList.remove('scroll-lock');

  modalOverlayElement.removeEventListener('click', onModalOverlayClick);
  buttonCloseElement.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const renderForm = (contractor) => {
  updateFormData(contractor);
  openForm(contractor);
};

export {renderForm};
