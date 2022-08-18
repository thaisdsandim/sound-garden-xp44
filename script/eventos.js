const getEvents = async (events, index) => {
    try {
        const responseEvents = await fetch(`${BASE_URL}/events`, { method: "GET" });
        const contentResponseEvents = await responseEvents.json();
        loading.style.display = "none";

        for (let i = index; i < events; i++) {
            const finalDate = new Date(contentResponseEvents[i].scheduled);

            divEvents.insertAdjacentHTML("beforeend", `
                <article class="evento card p-5 m-3">
                    <h2 id="nomeData">
                        ${contentResponseEvents[i].name} - ${finalDate.toLocaleDateString('en-GB')}
                    </h2>
                    <h4 id="atracoes">
                        ${contentResponseEvents[i].attractions}
                    </h4>
                    <p id="descricao">
                        ${contentResponseEvents[i].description}
                    </p>
                    <a id="botao" data-id="${contentResponseEvents[i]._id}" class="btn btn-primary open">
                        Book tickets
                    </a>
                </article>
            `);
        };

        const open = document.querySelectorAll('.open');

        open.forEach(element => {
            element.addEventListener('click', async () => {
                const responseEventId = await fetch(`${BASE_URL}/events/${element.getAttribute('data-id')}`, { method: "GET" });
                const contentResponseEventId = await responseEventId.json();
                subtitle.innerHTML = contentResponseEventId.name;

                modalContainer.classList.add('show');
                send.setAttribute('data-id', `${element.getAttribute('data-id')}`);
            });
        });

    } catch (error) {
        console.log(error);
        loading.style.display = "none";
        alert('Error!!!');
    };
};

const sendNewBooking = async () => {
    try {
        const newBooking = {
            owner_name: nameUser.value,
            owner_email: emailUser.value,
            number_tickets: ticketsUser.value,
            event_id: send.getAttribute('data-id'),
        };

        const options = {
            method: "POST",
            body: JSON.stringify(newBooking),
            headers: {
                "Content-Type": "application/json",
            },
        };

        modal.innerHTML = myModal;
        const loadingModal = document.querySelector('#loadingModal');
        loadingModal.style.display = "block";

        const responseBookings = await fetch(`${BASE_URL}/bookings`, options);
        loading.style.display = "none";
        modalContainer.classList.remove('show');

        alert('Success')
        window.location.href="#"

    } catch (error) {
        console.log(error);
        modalContainer.classList.remove('show');
        alert('Error!!!');
    };
};

const getDataEvent = async () => {
    try {
        const responseEvent = await fetch(`${BASE_URL}/events/${ID_ATUAL[1]}`, { method: "GET" });
        const contentResponseEvent = await responseEvent.json();
        loading.style.display = "none";

        const { name, poster, attractions, description, scheduled, number_tickets } = await contentResponseEvent;

        nameEvent.value = name;
        bannerEvent.value = poster;
        artistsEvent.value = attractions;
        descriptionEvent.value = description;
        dateEvent.value = formatDate(scheduled); //helper.js;
        ticketsEvent.value = number_tickets;

    } catch (error) {
        console.log(error);
        loading.style.display = "none";
        alert('Error!!!');
    };
};

const sendDataEvents = async (sendMethod, endPoint) => {
    try {
        const event = {
            name: nameEvent.value,
            poster: bannerEvent.value,
            attractions: artistsEvent.value.split(', '),
            description: descriptionEvent.value,
            scheduled: dateEvent.value,
            number_tickets: ticketsEvent.value,
        };

        const options = {
            method: sendMethod,
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json",
            },
        };

        modal.insertAdjacentHTML("afterbegin", myModal);
        modalContainer.classList.add('show');
        
        const loadingModal = document.querySelector('#loadingModal');
        loadingModal.style.display = "block";

        const responseEvent = await fetch(`${BASE_URL}${endPoint}`, options);
        modalContainer.classList.remove('show');
        
        alert('Success');
        window.location.href="admin.html";

    } catch (error) {
        console.log(error);
        modalContainer.classList.remove('show');
        alert('Error!!!');
    };
};