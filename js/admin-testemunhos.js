window.onload = function () {
    //importar variáveis do sessionStorage
    testemunhos = JSON.parse(localStorage.getItem("testemunhos"))
    transformarEmInstanciaBiblioteca(testemunhos)

    testemunhos = parseInt(localStorage.getItem("testemunhos"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()
} //fim onload

function gerarPendentes() {

}