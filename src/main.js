'use strict'
import style from './styles.css'

const axios = require('axios');

userActionForm.addEventListener('submit', formAction)
userAction.addEventListener('input', inputStyling)

function formAction(event){
    event.preventDefault()
    console.log(event)
    if (userAction.value === 'findContact'){
        console.log('find')
    }
    if (userAction.value === 'deleteContact'){
        console.log('delete')
    }
    if (userAction.value === 'addContact'){
        console.log('add')
    }
}

function inputStyling(){
    if (userAction.value === 'addContact'){
        inputNameOrId.style["width"] = "25vw";
        inputPhoneNumber.hidden = false
    } else {
        inputNameOrId.style["width"] = "50vw";
        inputPhoneNumber.hidden = true
    }
}