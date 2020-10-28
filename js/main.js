const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", function() {
    toggleModal(modal);
});

close.addEventListener("click", function() {
    toggleModal(modal);
});

function toggleModal(elem) {
    elem.classList.toggle("is-open");
}


// Авторизация

const btn_auth = document.querySelector('.button-auth');
const btn_out = document.querySelector('.button-out');
const btn_cart = document.querySelector('.button-cart');
const user_name = document.querySelector('.user-name');
const modal_auth = document.querySelector(".modal-auth");
const btn_close_auth = document.querySelector(".close-auth");



btn_auth.addEventListener("click", function() {
    toggleModal(modal_auth);
});

btn_close_auth.addEventListener("click", function() {
    toggleModal(modal_auth);
});


if (localStorage.getItem('gloDelivery')) {
    user_name.style.display = 'block';
    user_name.textContent = localStorage.getItem('gloDelivery');
}





// Валидация формы авторизации


const form_sign_in = document.querySelector('#logInForm');
const login = document.querySelector('#login');
const password = document.querySelector('#password');

form_sign_in.addEventListener('submit', signIn);

login.addEventListener('input', function() {
    isValidate(this, validateEmail, 'login');

});

password.addEventListener('input', function() {
    isValidate(this, validatePassword, 'пароль');

});


function signIn(e) {
    e.preventDefault();

    const form = e.target;
    const login = form.querySelector('#login');
    const password = form.querySelector('#password');

    validate(login, password);
}


function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length > 0 ? true : false;
}

function isValidate(input, valide, name) {
    let input_value = input.value.trim();
    let div_error = input.nextElementSibling;
    if (valide(input_value)) {
        input.style.border = '1px solid green';
        input.style.background = "#e2fdc2";
        div_error.textContent = "";
        return true;
    } else {
        input.style.border = '1px solid #b93b3b';
        input.style.background = "#ffcac7";
        div_error.textContent = `Неправельный введенный ${name == 'login' ? name + " на пример: 'example@gmail.com'" : name}`;
        return false;
    }
}

function validate(login, password) {
    let errors = [];
    let login_value = login.value.trim();

    if (!isValidate(login, validateEmail, "login")) {
        errors.push("Неправельный введенный email");
    }

    if (!isValidate(password, validatePassword, 'пароль')) {
        errors.push("Неправельный введенный пароль");
    }


    if (errors.length == 0) {
        btn_auth.style.display = 'none';
        user_name.style.display = 'block';
        user_name.textContent = login_value;
        localStorage.setItem('gloDelivery', login_value);
        btn_out.style.display = 'block';
        toggleModal(modal_auth);
        form_sign_in.reset();
    }
}