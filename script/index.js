const body = document.querySelector('body');
const divEvents = document.querySelector('#events');
const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.my-modal');
const subtitle = document.querySelector('#subtitle');
const send = document.querySelector('#send');
const close = document.querySelector('#close');
const formNewBooking = document.querySelector('form');
const nameUser = document.querySelector('#name');
const emailUser = document.querySelector('#email');
const ticketsUser = document.querySelector('#tickets');
const loading = document.querySelector('#loading');

const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

loading.style.display = "block";

body.onload = getEvents(3, 0); //services.js

close.addEventListener('click', () => {
    modalContainer.classList.remove('show');
});

document.addEventListener('keydown', event => {
    const key = event.key;

    if (key === 'Escape') {
        modalContainer.classList.remove('show');
    }
});

formNewBooking.onsubmit = async event => {
    event.preventDefault();

    sendNewBooking();
};