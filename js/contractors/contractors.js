import {getData, showServerUnavailableMessage} from '../utils/data.js';
import {renderContractorsList} from '../view-list/view-list.js';
import {renderContractorsMap} from '../view-map/view-map.js';
import {getActiveButton} from '../utils/utils.js';
import {filterContractors} from './filter.js';
import {initFormValidator} from '../form-buy-sell/validation.js';

const GET_CONTRACTORS_URL = 'https://cryptostar.grading.pages.academy/contractors';
const TEXT_CONTENT_LIST = 'Список';
const TEXT_CONTENT_MAP = 'Карта';

const buttonBuySellElements = document.querySelectorAll('.tabs--toggle-buy-sell [data-tabs="control"]');
const buttonCheckedUsersElement = document.querySelector('#checked-users');
const buttonListMapElements = document.querySelectorAll('.tabs--toggle-list-map [data-tabs="control"]');

let buttonBuySellActiveElement = getActiveButton(buttonBuySellElements);
let buttonListMapActiveElement = getActiveButton(buttonListMapElements);

const onGetDataSuccess = (contractors) => {
  if (buttonListMapActiveElement.textContent === TEXT_CONTENT_LIST) {
    renderContractorsList(filterContractors(contractors));
  }

  if (buttonListMapActiveElement.textContent === TEXT_CONTENT_MAP) {
    renderContractorsMap(filterContractors(contractors));
  }
};

const onGetDataError = () => showServerUnavailableMessage();

const getContractors = () => getData(GET_CONTRACTORS_URL, onGetDataSuccess, onGetDataError);

const onBuySellButtonClick = (event) => {
  event.preventDefault();
  buttonBuySellActiveElement.classList.remove('is-active');
  event.target.classList.add('is-active');
  buttonBuySellActiveElement = event.target;
  getContractors();
};

const onCheckedUsersButtonChange = (event) => {
  event.preventDefault();
  getContractors();
};

const onListMapButtonsClick = (event) => {
  event.preventDefault();
  buttonListMapActiveElement.classList.remove('is-active');
  event.target.classList.add('is-active');
  buttonListMapActiveElement = event.target;
  getContractors();
};

const initContractors = () => {
  buttonBuySellElements.forEach((button) => button.addEventListener('click', onBuySellButtonClick));
  buttonCheckedUsersElement.addEventListener('change', onCheckedUsersButtonChange);
  buttonListMapElements.forEach((button) => button.addEventListener('click', onListMapButtonsClick));
  initFormValidator();
  getContractors();
};

export {initContractors};
