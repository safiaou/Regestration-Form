const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phonenumber = document.getElementById('phonenumber');
const terms = document.getElementById('item');
const termsError = document.getElementById('terms-error');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.closest('.input-control');
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.closest('.input-control');
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// رقم جزائري: 05 / 06 / 07 + 8 أرقام (أو +213 / 00213 بدل الصفر)
const isValidphonenumber = phone => {
    phone = phone.replace(/\s/g, '');
    const re = /^(0|\+213|00213)[567][0-9]{8}$/;
    return re.test(phone);
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const phonenumberValue = phonenumber.value.trim();

    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
    } else {
        setSuccess(password2);
    }

    if (phonenumberValue === '') {
        setError(phonenumber, 'Phone number is required');
    } else if (!isValidphonenumber(phonenumberValue)) {
        setError(phonenumber, 'Enter a valid Algerian number, e.g. 0555123456');
    } else {
        setSuccess(phonenumber);
    }

    if (!terms.checked) {
        termsError.innerText = 'You must agree to the terms';
    } else {
        termsError.innerText = '';
    }
};

// زر العين: إظهار / إخفاء كلمة المرور
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        const isHidden = input.type === 'password';

        input.type = isHidden ? 'text' : 'password';
        button.classList.toggle('showing', isHidden);
    });
});
