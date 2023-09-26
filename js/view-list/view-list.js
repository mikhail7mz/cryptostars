import {createListItem} from './create-list-item.js';

const contractorsListElement = document.querySelector('#contractors-list');
const contractorsListTableBodyElement = document.querySelector('.users-list__table-body');
const contractorsMapElement = document.querySelector('#contractors-map');
const contractorsListEmptyMessageElement = document.querySelector('#contractors-list-empty-message');

const renderContractorsList = (contractors) => {
  contractorsListElement.style.display = 'block';
  contractorsMapElement.style.display = 'none';
  contractorsListTableBodyElement.innerHTML = '';

  if (!contractors.length) {
    contractorsListEmptyMessageElement.style.display = 'block';
    return;
  }

  contractorsListEmptyMessageElement.style.display = 'none';
  contractors.forEach((contractor) => contractorsListTableBodyElement.appendChild(createListItem(contractor)));
};

export {renderContractorsList};
