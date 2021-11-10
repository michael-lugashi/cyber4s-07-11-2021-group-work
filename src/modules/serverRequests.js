'use strict';
import axios from 'axios';
import swal from 'sweetalert';
import { displayData, notify } from './displayData';
const baseUrl = 'http://localhost:3001/';

export function getPhonebookData() {
  axios.get(`${baseUrl}api/persons`).then((response) => {
    displayData(response.data);
  });
}

export function addContact() {
  axios
    .post(`${baseUrl}api/persons`, {
      name: inputName.value,
      number: inputPhoneNumber.value,
    })
    .then((res) => {
      console.log(res.data)

      displayData(res.data);
      notify('Contact succesfully added!');
    })
    .catch((err) => {
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}
export function findContact() {
  axios
    .get(`${baseUrl}api/persons/${inputName.value}`)
    .then((res) => {
      swal(`Contact:`, `Name: ${res.data.name}\nNumber: ${res.data.number}`);
    })
    .catch((err) => {
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}

export function deleteContact() {
  axios
    .delete(`${baseUrl}api/persons/${inputName.value}`)
    .then((response) => {
      displayData(response.data);
      notify('Contact succesfully deleted.');
    })
    .catch((err) => {
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}
