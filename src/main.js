'use strict';
import style from './styles.css';
const axios = require('axios');
import swal from 'sweetalert';

const baseUrl = 'http://localhost:3001/';

userActionForm.addEventListener('submit', formAction);
userAction.addEventListener('input', inputStyling);
window.addEventListener('load', getPhonebookData);

function formAction(event) {
  event.preventDefault();
  console.log(event);
  if (userAction.value === 'findContact') {
    console.log('find');
  }
  if (userAction.value === 'deleteContact') {
    console.log('delete');
    deleteContact();
  }
  if (userAction.value === 'addContact') {
    console.log('add');
    addContact();
  }
}

function inputStyling() {
  if (userAction.value === 'addContact') {
    inputNameOrId.style['width'] = '25vw';
    inputLabelName.textContent = 'Name';
    inputNameOrId.placeholder = 'Name';
    inputPhoneNumber.hidden = false;
  } else {
    inputNameOrId.style['width'] = '50vw';
    inputLabelName.textContent = 'Name or ID';
    inputNameOrId.placeholder = 'Name or ID';
    inputPhoneNumber.hidden = true;
  }
}

function getPhonebookData() {
  axios.get(`${baseUrl}api/persons`).then((response) => {
    displayData(response.data);
  });
}

function displayData(data) {
  phonebookInfo.textContent = '';
  for (const contact in data) {
    const tableRow = document.createElement('tr');
    tableRow.append(createTableElement(data[contact].id));
    tableRow.append(createTableElement(data[contact].name));
    tableRow.append(createTableElement(data[contact].number));
    phonebookInfo.append(tableRow);
  }
}
function createTableElement(text) {
  const tableElement = document.createElement('td');
  tableElement.textContent = text;
  tableElement.classList.add('tableElem');
  return tableElement;
}
function deleteContact() {
  axios
    .delete(`${baseUrl}api/persons/${inputNameOrId.value}`)
    .then((response) => {
      displayData(response.data);
      deleteNotify();
    });
}
function deleteNotify() {
  inputNameOrId.value = '';
  inputPhoneNumber.value = '';
}
function addContact() {
  axios
    .post(`${baseUrl}api/persons`, {
      name: inputNameOrId.value,
      number: inputPhoneNumber.value,
    })
    .then((response) => {
      displayData(response.data);
      deleteNotify();
    })
    .catch((err) => {
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}
