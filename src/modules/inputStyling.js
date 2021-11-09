'use strict';

export function inputStyling() {
  if (userAction.value === 'addContact') {
    withPhoneNumberInput();
  } else {
    withoutPhoneNumberInput();
  }
}

function withPhoneNumberInput() {
  inputNameOrId.style['width'] = '25vw';
  inputLabelName.textContent = 'Name';
  inputNameOrId.placeholder = 'Name';
  inputPhoneNumber.hidden = false;
}

function withoutPhoneNumberInput() {
  inputNameOrId.style['width'] = '50vw';
  inputLabelName.textContent = 'Name or ID';
  inputNameOrId.placeholder = 'Name or ID';
  inputPhoneNumber.hidden = true;
}
