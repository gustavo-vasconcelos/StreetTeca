window.onload = function () {
    //importar variáveis do sessionStorage
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

    idGeneroClicado = parseInt(localStorage.getItem("idGeneroClicado"))

    //aparência
    navbar()
    smoothScroll()
    btnMenu()

    //filtros
    $('.dropdown-el').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });
    $(document).click(function () {
        $('.dropdown-el').removeClass('expanded');
    });
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

    gerarLivros(idGeneroClicado)

    //alterar filtro
    let filtros = document.getElementsByTagName("label")
    let filtroSelecionado = "filtroRelevancia"
    for (let i = 0; i < filtros.length; i++) {
        filtros[i].addEventListener("click", function () {
            let nomeFiltro = filtros[i].getAttribute("for")
            if (filtroSelecionado !== nomeFiltro) {
                gerarLivros(idGeneroClicado, nomeFiltro)
                filtroSelecionado = nomeFiltro
            }
        })
    }


} //fim onload

function gerarLivros(idGenero, filtro = "filtroRelevancia") {
    document.getElementById("genero").innerHTML = Genero.getNomeById(idGenero)

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
    
    let str = `<div class="row mt-1 d-flex justify-content-start text-center">`
    for (let i in livros) {
        if (livros[i].idGenero === idGenero) {
            str += `<div class="col-xl-4 col-lg-5 col-sm-6 col-10 mt-4 livro-recente">
                        <figure>
                            <div class="livro-card">
                                <a href="livro.html" class="clicarLivro" id="livro${livros[i].id}"><img class="img-fluid" src="${livros[i].urlCapa}"></a>
                            </div>
                            <figcaption class="px-2">
                                <div>
                                    <a href="livro.html" class="livro-titulo clicarLivro" id="livro${livros[i].id}">${livros[i].titulo}</a>
                                </div>
                                <div class="livro-autor">
                                    ${livros[i].autor.join(", ")}
                                </div>
                            </figcaption>
                        </figure>
                    </div>`
        }
    }
    str += "</div>"
    document.getElementById("recentes").innerHTML = str
    livroClicado()
}