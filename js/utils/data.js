const DEFAULT_METHOD = 'POST';

const messageServerUnavailableElement = document.querySelector('#server-unavailable-message');
const contentElements = document.querySelectorAll('.content');

const getData = (url, onGetSuccess, onGetError) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => onGetSuccess(data))
    .catch((error) => onGetError(error));
};

const sendData = (url, onGetSuccess, onGetError, body, method = DEFAULT_METHOD) => {
  fetch(url, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      onGetSuccess();
    })
    .catch((error) => onGetError(error));
};

const showServerUnavailableMessage = () => {
  messageServerUnavailableElement.style.display = 'block';
  contentElements.forEach((element) => {
    element.style.display = 'none';
  });
};

export {getData, sendData, showServerUnavailableMessage};
