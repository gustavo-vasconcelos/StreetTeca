window.onload = function () {
    //importar variáveis do sessionStorage
    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
    transformarEmInstanciaBiblioteca(bibliotecas)

    livros = JSON.parse(localStorage.getItem("livros"))
    transformarEmInstanciaLivro(livros)

    generos = JSON.parse(localStorage.getItem("generos"))
    transformarEmInstanciaGenero(generos)

    tags = JSON.parse(localStorage.getItem("tags"))
    transformarEmInstanciaTag(tags)

    comentarios = JSON.parse(localStorage.getItem("comentarios"))
    transformarEmInstanciaComentario(comentarios)

    testemunhos = JSON.parse(localStorage.getItem("testemunhos"))
    transformarEmInstanciaTestemunho(testemunhos)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))


    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //menu
    gerarMenu(Utilizador.getTipoAcessoById(idUtilizadorLogado), "inicioMenu")

    //atualizar os valores
    let quantidadeUtilizadores = document.getElementById("quantidadeUtilizadores")
    let quantidadeBibliotecas = document.getElementById("quantidadeBibliotecas")
    let quantidadeLivros = document.getElementById("quantidadeLivros")
    let quantidadeGeneros = document.getElementById("quantidadeGeneros")
    let quantidadeTags = document.getElementById("quantidadeTags")
    let quantidadeComentarios = document.getElementById("quantidadeComentarios")
    let quantidadeTestemunhos = document.getElementById("quantidadeTestemunhos")
    let quantidadeRequisicoes = document.getElementById("quantidadeRequisicoes")    


    quantidadeUtilizadores.innerHTML = utilizadores.length
    quantidadeBibliotecas.innerHTML = bibliotecas.length
    quantidadeLivros.innerHTML = livros.length
    quantidadeGeneros.innerHTML = generos.length
    quantidadeTags.innerHTML = tags.length
    quantidadeComentarios.innerHTML = comentarios.length
    quantidadeTestemunhos.innerHTML = testemunhos.length
}
