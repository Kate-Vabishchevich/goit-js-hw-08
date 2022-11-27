import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const textareaRef = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = "feedback-form-state";
let formData = {};

formRef.addEventListener('submit', onFormSubmit);
textareaRef.addEventListener('input', throttle(onTextareaInput, 500));

fillingTextarea();

function onFormSubmit(e) {
    e.preventDefault();

    const { email, message } = e.currentTarget;
    const formInput = {
        email: email.value,
        message: message.value
    };
    console.log(formInput);

    e.currentTarget.reset();

    localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
    formData[e.target.name] = e.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
   
}

function fillingTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);

    if (savedMessage) {
        textareaRef.value = savedMessage;
    }
}