window.onload = function () {
    //importar variáveis do sessionStorage
    livros = JSON.parse(localStorage.getItem("livros"))
    transformarEmInstanciaLivro(livros)

    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
    transformarEmInstanciaBiblioteca(bibliotecas)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()
}

function atualizarPercentagens() {
    //total livros
    let totalLivros = document.getElementById("totalLivros")
    totalLivros.innerHTML = "Total de livros - " + livros.length

    //percentagem de livros por género
    let utilizadoresPercentagem = document.getElementById("utilizadoresPercentagem")
    let utilizadoresBarraPercentagem = document.getElementById("utilizadoresBarraPercentagem")

    utilizadoresPercentagem.innerHTML = Utilizador.getPercUtilizadoresPorTipoAcesso(2) + "%"
    utilizadoresBarraPercentagem.style.width = Utilizador.getPercUtilizadoresPorTipoAcesso(2) + "%"

    let operadoresPercentagem = document.getElementById("operadoresPercentagem")
    let operadoresBarraPercentagem = document.getElementById("operadoresBarraPercentagem")

    operadoresPercentagem.innerHTML = Utilizador.getPercUtilizadoresPorTipoAcesso(1) + "%"
    operadoresBarraPercentagem.style.width = Utilizador.getPercUtilizadoresPorTipoAcesso(1) + "%"

    let administradoresPercentagem = document.getElementById("administradoresPercentagem")
    let administradoresBarraPercentagem = document.getElementById("administradoresBarraPercentagem")

    administradoresPercentagem.innerHTML = Utilizador.getPercUtilizadoresPorTipoAcesso(0) + "%"
    administradoresBarraPercentagem.style.width = Utilizador.getPercUtilizadoresPorTipoAcesso(0) + "%"
}