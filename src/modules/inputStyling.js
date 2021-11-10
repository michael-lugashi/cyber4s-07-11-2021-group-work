'use strict';

export function inputStyling() {
  if (userAction.value === 'addContact') {
    withPhoneNumberInput();
  } else {
    withoutPhoneNumberInput();
  }
}

function withPhoneNumberInput() {
  inputName.style['width'] = '25vw';
  inputPhoneNumber.hidden = false;
}

function withoutPhoneNumberInput() {
  inputName.style['width'] = '50vw';
  inputPhoneNumber.hidden = true;
}
