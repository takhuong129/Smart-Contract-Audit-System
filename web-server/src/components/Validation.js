/*
Do Long Duy: 103802474
*/
const validateUser =(username) => {

    const pattern = /^[a-zA-Z0-9]+$/;
    let validated = true;
    let error = '';
    if (username === '') {
        error ='Username cannot be empty';
        validated = false;
    }
    if (!pattern.test(username)) {
        error ='Username must only contain characters and numbers.';
        validated = false;
    } 
    if (localStorage.getItem(username)) {
        error ='This username has been taken, please choose another username';
        validated = false;
    }
    if (validated === true) {
        error ='';
    }
    return error;
  };

const validatePassword = (pass1, pass2) => {
    let validated = true;
    let error = '';

    const pattern = /^[a-zA-Z0-9]+$/;

    if (pass1.length < 3) {
        error = 'Password cannot be less than 3 characters'
        validated = false;
    }
    else if (!pattern.test(pass1)) {
        error ='Password must only contain characters and numbers.';
        validated = false;
    }
    else if (pass1 !== pass2 ) {
        error ='Re-entering the password must be the same ';
        validated = false;
    }
    if (validated === true) {
        error ='';
    }
    return error;
}

const validateEmail = (email) => {
    const pattern = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

    let emailExist = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
  
        // Check if the value matches the email you're searching for
        if (value && JSON.parse(value).email === email) {
            emailExist = true;
            break;
        }
      }

    let validated = true;
    let error = '';

    if (email === '') {
        error ='Email cannot be empty';
        validated = false;
    }
    else if (!pattern.test(email)) {
        error ='Email is not in the right format';
        validated = false;
    } 
    else if (emailExist) {
        error = 'This email had been used, please use another email';
        validated = false;
    }
    if (validated === true) {
        error ='';
    }
    return error;
}

const validatePhone = (phone) => {
    let error = '';
    if (phone.length <3 || phone.length > 15)
        error = 'Phone must be between 3 and 15 digits'
    return error
}

export {validateUser, validatePassword, validateEmail, validatePhone}