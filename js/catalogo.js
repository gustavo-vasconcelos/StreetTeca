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

    //barra de pesquisa
    let opcaoPesquisar = document.getElementById("opcaoPesquisar")
    let opcaoSelecionada = "opcaoLivro"
    let inputPesquisar = document.getElementById("inputPesquisar")
    let str = ""
    opcaoPesquisar.addEventListener("change", function () {
        opcaoSelecionada = opcaoPesquisar.value
        switch (opcaoSelecionada) {
            case "opcaoLivro":
                inputPesquisar.innerHTML = `<input list="sugerirLivros" id="inputPesquisarInput" class="form-control border-teca3" placeholder="Título do livro" style="border-radius: 0; box-shadow: inset 0px 0px 3px 1px rgba(0,0,0,0.59);">
                                            <datalist id="sugerirLivros"></datalist>`
                listenerInput()
                break
            case "opcaoTag":
                inputPesquisar.innerHTML = '<select id="inputPesquisarInput" class="form-control border-teca3" style="border-radius: 0; box-shadow: inset 0px 0px 3px 1px rgba(0,0,0,0.59);" required></select>'
                let tagsEmUso = Tag.getIdsTagsEmUso()
                str = '<option value="" selected hidden>Selecione uma</option>'
                for (let i in tagsEmUso) {
                    str += `<option value="${tagsEmUso[i]}">${Tag.getNomeById(tagsEmUso[i])}</option>`
                }
                document.getElementById("inputPesquisarInput").innerHTML = str
                break
            case "opcaoAutor":
                inputPesquisar.innerHTML = '<select id="inputPesquisarInput" class="form-control border-teca3" style="border-radius: 0; box-shadow: inset 0px 0px 3px 1px rgba(0,0,0,0.59);" required></select>'
                let autoresEmUso = Autor.getIdsAutoresEmUso()
                str = '<option value="" selected hidden>Selecione um</option>'
                for (let i in autoresEmUso) {
                    for (let j in autores) {
                        if (autores[j].id === autoresEmUso[i]) {
                            str += `<option value="${autoresEmUso[i]}">${autores[j].nome}</option>`
                        }
                    }
                }
                document.getElementById("inputPesquisarInput").innerHTML = str
                break
            case "opcaoBiblioteca":
                inputPesquisar.innerHTML = '<select id="inputPesquisarInput" class="form-control border-teca3" style="border-radius: 0; box-shadow: inset 0px 0px 3px 1px rgba(0,0,0,0.59);" required></select>'
                let bibliotecasEmUso = Biblioteca.getIdsBibliotecasEmUso()
                str = '<option value="" selected hidden>Selecione uma</option>'
                for (let i in bibliotecasEmUso) {
                    for (let j in bibliotecas) {
                        if (bibliotecas[j].id === bibliotecasEmUso[i]) {
                            str += `<option value="${bibliotecasEmUso[i]}">Biblioteca de ${Freguesia.getFreguesiaById(bibliotecas[j].idFreguesia)}, ${Concelho.getConcelhoById(bibliotecas[j].idConcelho)}</option>`
                        }
                    }
                }
                document.getElementById("inputPesquisarInput").innerHTML = str
                break
        }
    })

    //sugerir livros de acordo com a pesquisa (autocompletar com uma datalist)
    listenerInput()

    let formPesquisar = document.getElementById("formPesquisar")
    formPesquisar.addEventListener("submit", function (event) {
        event.preventDefault()
        let livrosEncontrados
        switch (opcaoSelecionada) {
            case "opcaoLivro":
                livrosEncontrados = Livro.getIdsByPesquisa(inputPesquisarInput.value)
                if (livrosEncontrados.length === 0) {
                    swal("Nenhum livro encontrado!", "", "error")
                } else if (livrosEncontrados.length === 1) {
                    localStorage.setItem("idLivroClicado", parseInt(document.querySelector("#sugerirLivros option").dataset.value))
                    window.location.href = "livro.html"
                } else {
                    localStorage.setItem("pesquisa", JSON.stringify(livrosEncontrados))
                    window.location.href = "pesquisa.html"
                }
                break
            case "opcaoTag":
                livrosEncontrados = Livro.getIdsByIdTag(parseInt(inputPesquisarInput.value))
                if (livrosEncontrados.length === 1) {
                    localStorage.setItem("idLivroClicado", livrosEncontrados[0])
                    window.location.href = "livro.html"
                } else {
                    localStorage.setItem("pesquisa", JSON.stringify(livrosEncontrados))
                    window.location.href = "pesquisa.html"
                }
                break
            case "opcaoAutor":
                localStorage.setItem("idAutorClicado", parseInt(inputPesquisarInput.value))
                window.location.href = "autor.html"
                break
            case "opcaoBiblioteca":
                livrosEncontrados = Livro.getIdsByIdBiblioteca(parseInt(inputPesquisarInput.value))
                if (livrosEncontrados.length === 1) {
                    localStorage.setItem("idLivroClicado", livrosEncontrados[0])
                    window.location.href = "livro.html"
                } else {
                    localStorage.setItem("pesquisa", JSON.stringify(livrosEncontrados))
                    window.location.href = "pesquisa.html"
                }
                break
        }
    })

    gerarSections()
    generoClicado()
    livroClicado()
    autorClicado()

    //swiper
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            530: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            991: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            1199: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });

} //fim onload

function gerarSections() {
    let str = ""
    for (let i in generos) {
        str += gerarLivrosPorGenero(generos[i].id)
    }
    document.getElementById("recentes").innerHTML = str
}

function gerarLivrosPorGenero(idGenero) {
    let livrosAleatorios = Livro.getIdsAleatoriosByIdGenero(idGenero)
    //apenas mostra 10 livros no máximo

    livrosAleatorios.length = (livrosAleatorios.length > 10) ? 10 : livrosAleatorios.length
    let str = ""
    if (Livro.getIdsByIdGenero(idGenero).length > 0) {
        str += `<div id="catalogo" style="padding-bottom: 50px;">
                    <a href="catalogo-genero.html" class="text-white hoverGenero" id="genero${idGenero}">
                        <span class="text-teca4" style="font-size: 1.5em; font-weight: 500">${Genero.getNomeById(idGenero).toUpperCase()}</span>
                        &nbsp;<span class="verTudo">Ver tudo &nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></span>
                    </a>
                    <br>
                    <br>
                    <div class="swiper-container text-center">
                        <div class="swiper-wrapper">`

        //cria os slides dos livros
        for (let i in livrosAleatorios) {
            for (let j in livros) {
                if (livros[j].id === livrosAleatorios[i])
                    str += `<div class="swiper-slide">
                            <div class="livro-recente">
                                <figure>
                                    <div class="livro-card">
                                        <a href="livro.html" class="livro${livros[j].id} clicarLivro">
                                            <img class="img-fluid" src="${livros[j].urlCapa}">
                                        </a>
                                    </div>
                                    <figcaption class="px-2">
                                        <div>
                                            <a href="livro.html" class="livro${livros[j].id} livro-titulo clicarLivro">${livros[j].titulo}</a>
                                        </div>
                                        <div class="livro-autor">${livros[j].autorToString()}</div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>`
            }
        }
        str += `    </div>
                        <div class="swiper-scrollbar"></div>
                    </div>
                </div>`
    }
    return str
}

function generoClicado() {
    let clicarGenero = document.getElementsByClassName("hoverGenero")
    for (let i = 0; i < clicarGenero.length; i++) {
        clicarGenero[i].addEventListener("click", function () {
            idGeneroClicado = parseInt(clicarGenero[i].id.replace(/genero/g, ""))
            localStorage.setItem("idGeneroClicado", idGeneroClicado)
        })
    }
}

function listenerInput() {
    let elemento = document.querySelectorAll('#inputPesquisar input[list]')[0]
    elemento.oninput = function () {
        if (elemento.value !== "") {
            sugerirLivros(inputPesquisarInput.value)
        } else {
            document.getElementById("sugerirLivros").innerHTML = ""
        }
    }
}

function sugerirLivros(pesquisa) {
    if (pesquisa) {
        let livrosSugeridos = Livro.getIdsByPesquisa(pesquisa)
        let str = ""
        for (let i in livrosSugeridos) {
            for (let j in livros) {
                if (livros[j].id === livrosSugeridos[i]) {
                    str += `<option value="${livros[j].titulo}" data-value="${livros[j].id}">`
                }
            }
        }
        str += "<datalist>"
        document.getElementById("sugerirLivros").innerHTML = str
        listenerInput()
    }
}