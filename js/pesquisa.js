let resultadosPesquisa = []

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

    let pesquisa = JSON.parse(localStorage.getItem("pesquisa"))
    for (let i in pesquisa) {
        for (let j in livros) {
            if (livros[j].id === pesquisa[i]) {
                resultadosPesquisa.push(livros[j])
            }
        }
    }

    //aparência
    navbar()
    smoothScroll()
    btnMenu()

    //filtros
    comboboxFiltros()
    //fim aparência

    let btnPainelAdmin = document.getElementById("btnPainelAdmin")

    if (idUtilizadorLogado !== -1) {
        if (Utilizador.getTipoAcessoById(idUtilizadorLogado) !== 2) {
            btnPainelAdmin.style.display = "inline"
        } else {
            btnPainelAdmin.style.display = "none"
        }

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

    gerarLivros()

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
} //fim onload

function gerarLivros(filtro = "filtroRelevancia", disposicao = "grelha") {
    switch (filtro) {
        case "filtroRelevancia":
            resultadosPesquisa.sort(Livro.ordenarMaisRequisitados)
            break;
        case "filtroAZ":
            resultadosPesquisa.sort(Livro.ordenarAZ)
            break;
        case "filtroZA":
            resultadosPesquisa.sort(Livro.ordenarZA)
            break;
        case "filtroMaiorPontuacao":
            resultadosPesquisa.sort(Livro.ordenarMaiorPontuacao)
            break;
        case "filtroMenorPontuacao":
            resultadosPesquisa.sort(Livro.ordenarMenorPontuacao)
            break;
        case "filtroMaiorDataDoacao":
            resultadosPesquisa.sort(Livro.ordenarMaiorDataDoacao)
            break;
        case "filtroMenorDataDoacao":
            resultadosPesquisa.sort(Livro.ordenarMenorDataDoacao)
            break;
        default:
            console.log(`Erro: filtro inválido (${filtro})!`)
            break;
    }

    let str = (disposicao === "grelha") ? '<div class="row mt-1 d-flex justify-content-start text-center">' : ""
    for (let i in resultadosPesquisa) {
        if (disposicao === "grelha") {
            str += `<div class="col-xl-4 col-lg-5 col-sm-6 col-10 mt-4 livro-recente">
                        <figure>
                            <div class="livro-card">
                                <a href="livro.html" class="livro${resultadosPesquisa[i].id} clicarLivro"><img class="img-fluid" src="${resultadosPesquisa[i].urlCapa}"></a>
                            </div>
                            <figcaption class="px-2">
                                <div>
                                    <a href="livro.html" class="livro${resultadosPesquisa[i].id} livro-titulo clicarLivro">${resultadosPesquisa[i].titulo}</a>
                                </div>
                                <div class="livro-autor">${resultadosPesquisa[i].autorToString().join(", ")}</div>
                            </figcaption>
                        </figure>
                    </div>`
        }
        if (disposicao === "lista") {
            let descricao = (resultadosPesquisa[i].descricao.length > 200) ? resultadosPesquisa[i].descricao.substr(0, resultadosPesquisa[i].descricao.indexOf(" ", 200)) + "..." : resultadosPesquisa[i].descricao
            str += `<div class="row mt-4">
                        <div class="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-20 pull-left livro-recente text-center">
                            <figure>
                                <div class="livro-card">
                                    <a href="livro.html" class="livro${resultadosPesquisa[i].id} clicarLivro"><img class="img-fluid" src="${resultadosPesquisa[i].urlCapa}"></a>
                                </div>
                            </figure>
                        </div>
                        <div class="col-xl-13 col-lg-15 col-md-14 col-sm-13 col-20 text-white text-left">
                            <a href="livro.html" class="livro${resultadosPesquisa[i].id} clicarLivro"><h4 class="livro-titulo">${resultadosPesquisa[i].titulo}</h4></a>
                            <p style="font-size: .9em;">de ${resultadosPesquisa[i].autorToString().join(", ")}</p>
                            <p>${descricao}</p>
                        </div>
                    </div>
                    <hr class="bg-teca4">`
        }
    }
    str += (disposicao === "grelha") ? "</div>" : ""

    document.getElementById("recentes").innerHTML = str

    if (disposicao === "lista") {
        document.querySelectorAll("hr.bg-teca4")[document.querySelectorAll("hr.bg-teca4").length - 1].remove()
    }
    livroClicado()
}