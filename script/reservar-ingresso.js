const body = document.querySelector('body');
const eventTitle = document.querySelector("#event-title");
const bookingList = document.querySelector('#tabela-eventos');
const loading = document.querySelector('#loading');

const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const ID_ATUAL = window.location.search.split("=");

loading.style.display = "block"; //Loading Gif

body.onload = async () => {
    try {
        const responseEvents = await fetch(`${BASE_URL}/events/${ID_ATUAL[1]}`, { method: "GET" });
        const contentResponseEvents = await responseEvents.json();
        eventTitle.insertAdjacentHTML("afterbegin", contentResponseEvents.name);
        
        const responseBookings = await fetch(`${BASE_URL}/bookings/event/${ID_ATUAL[1]}`, { method: "GET" });
        const contentResponseBookings = await responseBookings.json();
        loading.style.display = "none";

        contentResponseBookings.forEach((element, index) => {
            bookingList.insertAdjacentHTML("beforeend", `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element.owner_name}</td>
                    <td>${element.owner_email}</td>
                    <td>${element.number_tickets}</td>
                </tr>
            `);
        });

    } catch (error) {
        console.log(error);
        loading.style.display = "none";
        alert('Error!!!');
    };
};