window.onload = function () {
    //importar variáveis do sessionStorage
    autores = JSON.parse(localStorage.getItem("autores"))
    transformarEmInstanciaAutor(autores)

    livros = JSON.parse(localStorage.getItem("livros"))
    transformarEmInstanciaLivro(livros)

    requisicoes = JSON.parse(localStorage.getItem("requisicoes"))
    transformarEmInstanciaRequisicao(requisicoes)

    generos = JSON.parse(localStorage.getItem("generos"))
    transformarEmInstanciaGenero(generos)

    tags = JSON.parse(localStorage.getItem("tags"))
    transformarEmInstanciaTag(tags)

    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
    transformarEmInstanciaBiblioteca(bibliotecas)

    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //menu
    gerarMenu(Utilizador.getTipoAcessoById(idUtilizadorLogado), "requisicoesMenu")
} //fim onload