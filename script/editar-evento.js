const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events';

const findID = () => {
    // pega url da página
    const url = new URL(window.location.href);
    //separando parametro id
    const id = url.searchParams.get('id');
    // retorna somente o id
    return id;
}

const exibirDetalhesEvento = async () => {
    const dadosEvento =
        await fetch(SOUND_URL + "/" + findID(), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json());

    console.log(dadosEvento);

    const inputNome = document.getElementById("nome");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao = document.getElementById("lotacao");
    const inputBanner = document.getElementById("banner");

    inputNome.value = dadosEvento.name;
    inputAtracoes.value = dadosEvento.attractions.join(', ');
    inputBanner.value = dadosEvento.poster;
    inputDescricao.value = dadosEvento.description;
    inputData.value = dadosEvento.scheduled;
    inputLotacao.value = dadosEvento.number_tickets;
}

exibirDetalhesEvento();

//selecionando formulario
const formEditarEvento = document.querySelector("#editar-evento");


// capturando evento de envio do formulário
formEditarEvento.addEventListener("submit", async (event) => {
    //evitar que a página seja recarregada
    event.preventDefault();

    const inputNome = document.getElementById("nome");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao = document.getElementById("lotacao");
    const inputBanner = document.getElementById("banner");

    // conversão de data para padrão do banco de dados
    const fullDateTime = new Date(inputData.value);

    // criando objeto com os dados do evento
    const eventoAtualizadoObj = {
        "name": inputNome.value,
        "poster": inputBanner.value,
        "attractions": inputAtracoes.value.split(","),
        "description": inputDescricao.value,
        "scheduled": fullDateTime.toISOString(),
        "number_tickets": inputLotacao.value
    };

    // convertendo Obj para JSON
    const eventoAtualizadoJSON = JSON.stringify(eventoAtualizadoObj);

    // conexão com API para cadastrar novo evento
    // salvando resposta na const
    const resposta = await fetch(SOUND_URL + "/" + findID(), {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: eventoAtualizadoJSON
    }).then((response) => {
        return response.json();
    }).then((responseOBJ) => {
        // console.log(responseOBJ);

        // redireciona para lista de eventos
        window.location.replace('admin.html?acao=edit');
    });

});