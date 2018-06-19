window.onload = function () {
    //importar variáveis do sessionStorage
    autores = JSON.parse(localStorage.getItem("autores"))
    transformarEmInstanciaAutor(autores)

    livros = JSON.parse(localStorage.getItem("livros"))
    transformarEmInstanciaLivro(livros)

    generos = JSON.parse(localStorage.getItem("generos"))
    transformarEmInstanciaGenero(generos)

    tags = JSON.parse(localStorage.getItem("tags"))
    transformarEmInstanciaTag(tags)

    concelhos = JSON.parse(localStorage.getItem("concelhos"))
    transformarEmInstanciaConcelho(concelhos)

    freguesias = JSON.parse(localStorage.getItem("freguesias"))
    transformarEmInstanciaFreguesia(freguesias)

    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
    transformarEmInstanciaBiblioteca(bibliotecas)

    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    idLivroClicado = parseInt(localStorage.getItem("idLivroClicado"))

    idAutorClicado = parseInt(localStorage.getItem("idAutorClicado"))

    //aparência
    navbar()
    smoothScroll()
    btnMenu()
    //fim aparência

    if (idUtilizadorLogado !== -1) {
        //btn logout
        let btnLogout = document.getElementById("btnLogout")
        btnLogout.addEventListener("click", function () {
            swal("Até à próxima, " + Utilizador.getPrimeiroNomeById(idUtilizadorLogado) + "!", {
                icon: "success",
                buttons: false,
                closeOnClickOutside: false,
                closeOnEsc: false,
                timer: 1000,
            });

            idUtilizadorLogado = -1
            localStorage.setItem("idUtilizadorLogado", idUtilizadorLogado)
            btnPainelAdmin.style.display = "none"
            areaUtilizador.style.display = "none"
            btnLogin.style.display = "inline"
            setTimeout(function () {
                window.location.href = '../index.html'
            }, 1000)
        })
    } else {
        document.getElementsByTagName("body")[0].innerHTML = ""
        window.location.href = '../index.html'
    }

    //gerar info autor
    gerarInfo()

    //gerar barra
    gerarBarra()

    let disposicao = "grelha"
    //alterar filtro
    let filtros = document.getElementsByTagName("label")
    let filtroSelecionado = "filtroRelevancia"
    for (let i = 0; i < filtros.length; i++) {
        filtros[i].addEventListener("click", function () {
            let nomeFiltro = filtros[i].getAttribute("for")
            if (filtroSelecionado !== nomeFiltro) {
                gerarLivros(nomeFiltro, disposicao)
                filtroSelecionado = nomeFiltro
            }
        })
    }

    //mudar grelha
    let btnGrelha = document.getElementById("btnGrelha")
    let btnLista = document.getElementById("btnLista")
    btnGrelha.addEventListener("click", function () {
        btnLista.classList.remove("btnAtivo")
        btnGrelha.classList.add("btnAtivo")
        disposicao = "grelha"
        gerarLivros(filtroSelecionado, disposicao)
    })
    btnLista.addEventListener("click", function () {
        btnGrelha.classList.remove("btnAtivo")
        btnLista.classList.add("btnAtivo")
        disposicao = "lista"
        gerarLivros(filtroSelecionado, disposicao)
    })

    gerarLivros()

} //fim onload

function gerarInfo() {
    let str = ""
    for (let i in autores) {
        if (autores[i].id === idAutorClicado) {
            str += `<div class="col-lg-5 col-md-8 col-sm-20 col-20 mt-2 text-center">
                        <div class="foto-testemunho text-center">
                            <img class="img-thumbnail" src="${autores[i].urlFoto}">
                        </div>
                    </div>
                    <div class="col-lg-15 col-md-12 col-sm-20 col-20 mt-2 text-white">
                        <ul class="list-group">
                            <li class="list-group-item bg-teca3">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-20">Nome</div>
                                    <div class="col-lg-17 col-md-16 col-20 font-weight-bold">${autores[i].nome}</div>
                                </div>
                            </li>
                            <li class="list-group-item bg-teca3">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-20">Biografia</div>
                                    <div class="col-lg-17 col-md-16 col-20 font-weight-bold">${autores[i].descricao}</div>
                                </div>
                            </li>
                        </ul>
                    </div>`
        }
    }
    document.getElementById("cabecalho").innerHTML = str
}

function gerarBarra() {
    document.getElementById("barra").innerHTML = `<div class="bg-teca2 pb-5 text-white" id="subNav" style="z-index: 50; position: sticky !important; top:50px !important;">
                                                        <div class="d-flex justify-content-between flex-wrap">
                                                            <div class="col-lg-12 col-md-20 mt-1" style="font-size: 1.5em; font-weight: 500;">
                                                                <div>
                                                                    <a href="catalogo.html" class="text-teca4 hoverGenero">CATÁLOGO ></a> Livros do autor
                                                                </div>
                                                            </div>
                                                            <span class="col-lg-5 col-md-12 col-sm-15 col-11 dropdown-el mt-1">
                                                                <input type="radio" name="filtro" value="filtroRelevancia" id="filtroRelevancia" checked>
                                                                <label for="filtroRelevancia">Relevância</label>

                                                                <input type="radio" name="filtro" value="filtroAZ" id="filtroAZ">
                                                                <label for="filtroAZ">A-Z</label>

                                                                <input type="radio" name="filtro" value="filtroZA" id="filtroZA">
                                                                <label for="filtroZA">Z-A</label>

                                                                <input type="radio" name="filtro" value="filtroMaiorPontuacao" id="filtroMaiorPontuacao">
                                                                <label for="filtroMaiorPontuacao">&gt; Pontuação</label>

                                                                <input type="radio" name="filtro" value="filtroMenorPontuacao" id="filtroMenorPontuacao">
                                                                <label for="filtroMenorPontuacao">&lt; Pontuação</label>
                                                                <input type="radio" name="filtro" value="filtroMaiorDataDoacao" id="filtroMaiorDataDoacao">
                                                                <label for="filtroMaiorDataDoacao">&gt; Data de doação</label>

                                                                <input type="radio" name="filtro" value="filtroMenorDataDoacao" id="filtroMenorDataDoacao">
                                                                <label for="filtroMenorDataDoacao">&lt; Data de doação</label>
                                                            </span>
                                                            <div class="col-lg-3 col-md-4 col-sm-5 col-9">
                                                                <button type="button" class="btn btn-teca2 btnAtivo border border-teca4" style="color: #92CDCF" id="btnGrelha">
                                                                    <i class="fa fa-th-large" aria-hidden="true"></i>
                                                                </button>
                                                                <button type="button" class="btn btn-teca2 border border-teca4" style="color: #92CDCF" id="btnLista">
                                                                    <i class="fa fa-list" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>`
    //filtros
    comboboxFiltros()
}

function gerarLivros(filtro = "filtroRelevancia", disposicao = "grelha") {
    switch (filtro) {
        case "filtroRelevancia":
            livros.sort(Livro.ordenarMaisRequisitados)
            break;
        case "filtroAZ":
            livros.sort(Livro.ordenarAZ)
            break;
        case "filtroZA":
            livros.sort(Livro.ordenarZA)
            break;
        case "filtroMaiorPontuacao":
            livros.sort(Livro.ordenarMaiorPontuacao)
            break;
        case "filtroMenorPontuacao":
            livros.sort(Livro.ordenarMenorPontuacao)
            break;
        case "filtroMaiorDataDoacao":
            livros.sort(Livro.ordenarMaiorDataDoacao)
            break;
        case "filtroMenorDataDoacao":
            livros.sort(Livro.ordenarMenorDataDoacao)
            break;
        default:
            console.log(`Erro: filtro inválido (${filtro})!`)
            break;
    }

    let str = (disposicao === "grelha") ? '<div class="row mt-1 d-flex justify-content-start text-center" style="z-index:-1;">' : ""
    for (let i in livros) {
        for (let j in livros[i].autor) {
            if (livros[i].autor[j] === idAutorClicado) {
                if (disposicao === "grelha") {
                    str += `<div class="col-xl-4 col-lg-5 col-sm-6 col-10 mt-4 livro-recente">
                                <figure>
                                    <div class="livro-card">
                                        <a href="livro.html" class="livro${livros[i].id} clicarLivro"><img class="img-fluid" src="${livros[i].urlCapa}"></a>
                                    </div>
                                    <figcaption class="px-2">
                                        <div>
                                            <a href="livro.html" class="livro${livros[i].id} livro-titulo clicarLivro">${livros[i].titulo}</a>
                                        </div>
                                        <div class="livro-autor">${livros[i].autorToString()}</div>
                                    </figcaption>
                                </figure>
                            </div>`
                }
                if (disposicao === "lista") {
                    let descricao = (livros[i].descricao.length > 200) ? livros[i].descricao.substr(0, livros[i].descricao.indexOf(" ", 200)) + "..." : livros[i].descricao
                    str += `<div class="row mt-4">
                                <div class="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-20 pull-left livro-recente text-center">
                                    <figure>
                                        <div class="livro-card">
                                            <a href="livro.html" class="livro${livros[i].id} clicarLivro"><img class="img-fluid" src="${livros[i].urlCapa}"></a>
                                        </div>
                                    </figure>
                                </div>
                                <div class="col-xl-16 col-lg-15 col-md-14 col-sm-13 col-20 text-white text-left">
                                    <a href="livro.html" class="livro${livros[i].id} clicarLivro"><h4 class="livro-titulo">${livros[i].titulo}</h4></a>
                                    <p style="font-size: .9em;">de ${livros[i].autorToString()}</p>
                                    <p>${descricao}</p>
                                </div>
                            </div>
                            <hr class="bg-teca4">`
                }
            }
        }
    }
    str += (disposicao === "grelha") ? "</div>" : ""
    document.getElementById("recentes").innerHTML = str
    if (disposicao === "lista") {
        document.querySelectorAll("hr.bg-teca4")[document.querySelectorAll("hr.bg-teca4").length - 1].remove()
    }
    livroClicado()
    autorClicado()
}