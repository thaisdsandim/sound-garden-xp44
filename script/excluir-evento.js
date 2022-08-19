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

const ExcluirEvento = document.querySelector("#excluir-evento");

ExcluirEvento.addEventListener("submit", async (event) => {
    event.preventDefault();

    const resposta = await fetch(SOUND_URL + "/" + findID(), {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response ) 
    .then(result => { window.location.href = 'admin.html'})
    .catch(error => alert (`O evento não pode ser excluído`))
    
    alert("Evento foi excluído com sucesso!")

});