const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/bookings';

const listarReservas = async () => {

    const reservas = await fetch(SOUND_URL, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {

        //retorna lista em array de objetos
        return resposta.json();
    });

    // console.log(reservas);

    const tbody = document.querySelector('.lista-reservas tbody');

    let htmlReservas = "";

    reservas.forEach(reserva => {
        htmlReservas += `
            <tr>
                <th scope="row">#</th>
                <td>${reserva._id}</td>
                <td>${reserva.owner_name}</td>
                <td>${reserva.owner_email}</td>
                <td>${reserva.number_tickets}</td>
              </tr>
        `;
    });

    tbody.innerHTML = htmlReservas;

}

listarReservas();