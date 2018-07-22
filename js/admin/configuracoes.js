window.onload = function () {
    configuracoes = JSON.parse(localStorage.getItem("configuracoes"))
    
    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //menu
    gerarMenu(Utilizador.getTipoAcessoById(idUtilizadorLogado), "configuracoesMenu")

    atualizarValores()

    let btnEditar = document.getElementById("btnEditar")
    let inputDiasMultaEditar = document.getElementById("inputDiasMultaEditar")
    let inputValorMultaEditar = document.getElementById("inputValorMultaEditar")
    let inputValorLimiteMultaEditar = document.getElementById("inputValorLimiteMultaEditar")
    btnEditar.addEventListener("click", function() {
        inputDiasRequisicaoEditar.value = configuracoes.diasRequisicao
        inputValorMultaEditar.value = configuracoes.valorMultaDiaria
        inputValorLimiteMultaEditar.value = configuracoes.valorMultaLimite
    })

    let formEditar = document.getElementById("formEditar")
    formEditar.addEventListener("submit", function(event) {
        configuracoes.diasRequisicao = parseInt(inputDiasRequisicaoEditar.value)
        configuracoes.valorMultaDiaria = parseInt(inputValorMultaEditar.value)
        configuracoes.valorMultaLimite = parseInt(inputValorLimiteMultaEditar.value)

        localStorage.setItem("configuracoes", JSON.stringify(configuracoes))

        atualizarValores()
        swal("Configurações editadas!", "", "success")
        $("#modal").modal('hide')
        event.preventDefault()
    })

}


function atualizarValores() {
    let inputDiasMulta = document.getElementById("inputDiasMulta")
    let inputValorMulta = document.getElementById("inputValorMulta")
    let inputValorLimiteMulta = document.getElementById("inputValorLimiteMulta")
    
    inputDiasMulta.value = configuracoes.diasRequisicao
    inputValorMulta.value = configuracoes.valorMultaDiaria
    inputValorLimiteMulta.value = configuracoes.valorMultaLimite
}