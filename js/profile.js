import {getData, showServerUnavailableMessage} from './utils/data.js';

const GET_DATA_URL = 'https://cryptostar.grading.htmlacademy.pro/user';

const userProfileElement = document.querySelector('.user-profile');
const userCryptoBalanceElement = document.querySelector('#user-crypto-balance');
const userFiatBalanceElement = document.querySelector('#user-fiat-balance');
const userProfileNameElement = document.querySelector('.user-profile__name span');

const onGetDataSuccess = (user) => {
  const {userName, balances} = user;
  userCryptoBalanceElement.textContent = balances.find((value) => value.currency === 'KEKS').amount;
  userFiatBalanceElement.textContent = balances.find((value) => value.currency === 'RUB').amount;
  userProfileNameElement.textContent = userName;

  Object.entries(user).forEach((entry) => {
    const [key, value] = entry;
    localStorage.setItem(key, (typeof(value) === 'object') ? JSON.stringify(value) : value);
  });
};

const onGetDataError = () => {
  userProfileElement.remove();
  showServerUnavailableMessage();
};

const renderProfile = () => {
  getData(GET_DATA_URL, onGetDataSuccess, onGetDataError);
};

export {renderProfile};
