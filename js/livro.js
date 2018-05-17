window.onload = function () {
    //importar variáveis do sessionStorage
    livros = JSON.parse(localStorage.getItem("livros"))
    transformarEmInstanciaLivro(livros)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    idLivroClicado = parseInt(localStorage.getItem("idLivroClicado"))

    //aparência
    navbar()
    smoothScroll()
    btnMenu()
    //fim aparência

    for (let i in livros) {
        if (livros[i].id === idLivroClicado) {
            //imagem do livro
            let capaLivro = document.getElementById("capaLivro")
            capaLivro.src = livros[i].urlCapa

            //título
            let tituloLivro = document.getElementById("tituloLivro")
            tituloLivro.innerHTML = livros[i].titulo

            //autor
            let autorLivro = document.getElementById("autorLivro")
            autorLivro.innerHTML = "de " + livros[i].autor.join(", ")

            //pontuação
            gerarPontuacaoEstrelas(livros[i].getPontuacaoMedia(), livros[i].id)

            //género
            let generoLivro = document.getElementById("generoLivro")
            generoLivro.innerHTML = "&nbsp;" + Genero.getNomeById(livros[i].idGenero)

            //tags
            let tagsLivro = document.getElementById("tagsLivro")
            tagsLivro.innerHTML = "&nbsp;" + Tag.getNomesByIds(livros[i].idTags).join(", ")

            //descrição
            let descricaoLivro = document.getElementById("descricaoLivro")
            descricaoLivro.innerHTML = livros[i].descricao

            //comentários
            gerarComentarios(livros[i].id)
        }
    }


    //comentários

}


function gerarPontuacaoEstrelas(pontuacaoMedia, idLivro) {
    pontuacaoMedia = Math.round(pontuacaoMedia)

    let str = ""

    for (let i = 0; i <= 4; i++) {
        if(pontuacaoMedia > i) {
            str += '<span class="fa fa-star estrela"></span>&nbsp;'
        } else {
            str += '<span class="fa fa-star"></span>&nbsp;'
        }
    }

    str += `&nbsp;(${Comentario.getQuantidadePontuacoesByIdLivro(idLivro)} avaliações)`

    let pontuacaoMediaEstrelas = document.getElementById("pontuacaoMediaEstrelas")
    pontuacaoMediaEstrelas.innerHTML = str
}

function gerarComentarios(idLivro) {
    let totalComentarios = document.getElementById("totalComentarios")
    totalComentarios.innerHTML = `Comentários (${Comentario.getQuantidadePontuacoesByIdLivro(idLivro)})`

    let str = ""
    for(let i in comentarios) {
        if(comentarios[i].idLivro === idLivro) {
            str += `<div class="mt-3 col-xl-5 col-md-6 col-sm-10 col-20">
                        <div class="foto-comentario pull-left">
                            <img src="${Utilizador.getUrlFotoById(comentarios[i].idUtilizador)}" width="50px" height="50px">
                        </div>
                        <div>&nbsp;${Utilizador.getNomeById(comentarios[i].idUtilizador)}</div>
                        <div>&nbsp;
                            <span class="fa fa-star estrela"></span>
                            <span class="fa fa-star estrela"></span>
                            <span class="fa fa-star estrela"></span>
                            <span class="fa fa-star estrela"></span>
                            <span class="fa fa-star estrela"></span>
                        </div>
                        <p class="" style="font-size: .9em;">&nbsp;${comentarios[i].comentario}</p>
                    </div>`
        }
    }
    let comentariosLivro = document.getElementById("comentariosLivro")
    comentariosLivro.innerHTML = str
}