window.onload = function () {
    /*
        INÍCIO APARÊNCIA
    */
    (function ($) {
        "use strict"; // Start of use strict

        smoothScroll()

        // Collapse Navbar
        var navbarCollapse = function () {
            if ($("#mainNav").offset().top > 95) {
                $("#mainNav").addClass("navbar-shrink");
            } else {
                $("#mainNav").removeClass("navbar-shrink");
            }
        };


        var marca = function () {
            if ($(window).width() > 992) {
                if ($("#mainNav").offset().top > 846) {
                    $("#marca").addClass("mr-5");
                    $("#marca").attr('src', 'img/marca.png')
                } else {
                    $("#marca").attr("src", "");
                    $("#marca").removeClass("mr-5");
                }
            } else {
                $("#marca").attr('src', 'img/marca.png')
                $("#marca").removeClass("mr-5");
            }

        };

        // Collapse now if page is not at top
        navbarCollapse();

        marca();

        // Collapse the navbar when page is scrolled
        $(window).scroll(navbarCollapse);
        $(window).scroll(marca);
        $(window).resize(marca)



        btnMenu()


        //centrar mais pontuados quando a largura é menor ou igual a 575
        let wrapped = false
        let centrar = function () {
            if ($(window).width() <= 575 && !wrapped) {
                $(".livro-pontuado").wrap("<div class='text-center livro-centrar'></div>");
                wrapped = true
            }
            if ($(window).width() > 575 && wrapped) {
                wrapped = false
                $(".livro-centrar").contents().unwrap();
            }
        }

        $(window).resize(centrar)
        $(document).ready(centrar)

    })(jQuery);
    /*
        FIM APARÊNCIA
    */

    //email
    (function () {
        emailjs.init("user_8qQ3vyvQilyoXugsi3kGL");
    })();

    //importar variáveis do sessionStorage
    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    autores = JSON.parse(localStorage.getItem("autores"))
    transformarEmInstanciaAutor(autores)

    livros = JSON.parse(localStorage.getItem("livros"))
    transformarEmInstanciaLivro(livros)

    requisicoes = JSON.parse(localStorage.getItem("requisicoes"))
    transformarEmInstanciaRequisicao(requisicoes)

    comentarios = JSON.parse(localStorage.getItem("comentarios"))
    transformarEmInstanciaComentario(comentarios)

    testemunhos = JSON.parse(localStorage.getItem("testemunhos"))
    transformarEmInstanciaTestemunho(testemunhos)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    navbar()

    clicarCatalogo()

    atualizarTodasMultas()

    //efetuar registo
    let formRegisto = document.getElementById("formRegisto")
    let registoInputNome = document.getElementById("registoInputNome")
    let registoInputEmail = document.getElementById("registoInputEmail")
    let registoInputPassword = document.getElementById("registoInputPassword")
    let registoInputConfirmarPassword = document.getElementById("registoInputConfirmarPassword")
    let registoInputUrlFoto = document.getElementById("registoInputUrlFoto")

    formRegisto.addEventListener("submit", function (event) {
        let erro = false
        let strErro = ""
        if (Utilizador.getIdByEmail(registoInputEmail.value) !== -1) {
            erro = true
            strErro = "Já existe um utilizador registado com o mesmo email."
        }
        if (registoInputPassword.value !== registoInputConfirmarPassword.value) {
            erro = true
            //para que apenas adicione uma quebra de linha caso a variável strErro não esteja vazia
            strErro = (strErro) ? (strErro + "\n") : strErro
            strErro += "\nAs passwords não coincidem."
        }

        if (erro) {
            swal("Erro!", strErro, "error")
        } else {
            utilizadores.push(new Utilizador(registoInputNome.value, registoInputEmail.value, registoInputPassword.value, registoInputUrlFoto.value, new Date()))
            localStorage.setItem("utilizadores", JSON.stringify(utilizadores))

            //envia email
            /*
            let service_id = "default_service", template_id = "registo";
            let templateParams = {
                email: registoInputEmail.value,
                nome: registoInputNome.value
            }
            emailjs.send(service_id, template_id, templateParams)*/

            $("#modalRegisto").modal("hide")
            swal("Registo efetuado!", "Faça login com as suas credenciais.", "success")
        }

        event.preventDefault()
    })


    //efetuar login
    let formLogin = document.getElementById("formLogin")
    let loginInputEmail = document.getElementById("loginInputEmail")
    let loginInputPassword = document.getElementById("loginInputPassword")
    let btnLogin = document.getElementById("btnLogin")
    let areaUtilizador = document.getElementById("areaUtilizador")
    let btnPainelAdmin = document.getElementById("btnPainelAdmin")

    if (Utilizador.getTipoAcessoById(idUtilizadorLogado) !== 2) {
        btnPainelAdmin.style.display = "inline"
    } else {
        btnPainelAdmin.style.display = "none"
    }

    formLogin.addEventListener("submit", function (event) {
        let idUtilizador = Utilizador.getIdByEmail(loginInputEmail.value)
        let erro = false

        if (idUtilizador !== -1) {
            if (Utilizador.getPasswordById(idUtilizador) === loginInputPassword.value) {
                if (!Utilizador.verificarBloqueioById(idUtilizador)) {
                    idUtilizadorLogado = idUtilizador
                    localStorage.setItem("idUtilizadorLogado", idUtilizadorLogado)

                    //opções utilizador
                    navbar()
                    swal("Bem vindo, " + Utilizador.getPrimeiroUltimoNomeById(idUtilizadorLogado) + "!", {
                        icon: "success",
                        buttons: false,
                        closeOnClickOutside: false,
                        closeOnEsc: false,
                        timer: 1000,
                    });
                    $("#modalLogin").modal("hide")
                    clicarCatalogo()
                    gerarLivrosRecentes()
                    gerarLivrosMaisPontuados()
                } else {
                    swal("Conta bloqueada.", `A sua conta encontra-se bloqueada, uma vez que ultrapassou o valor limite de (€${configuracoes.valorMultaLimite}). Para continuar a utilizar a nossa plataforma, dirija-se ao Centro de Bibliotecas de Rua mais próximo para pagar a multa.`, "error")
                }
            } else {
                erro = true
            }
        } else {
            erro = true
        }

        if (erro) {
            swal("Erro!", "Email ou password inválido(s).", "error");
        }

        event.preventDefault()
    })

    btnLogin.addEventListener("click", function () {
        formLogin.reset()
    })

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

        clicarCatalogo()

        gerarLivrosRecentes()
        gerarLivrosMaisPontuados()
    })


    //livros recentes e pontuados e testemunhos
    gerarLivrosRecentes()
    gerarLivrosMaisPontuados()
    gerarTestemunhos()
} //fim onload

function gerarLivrosRecentes() {
    let recentesDiv = document.getElementById("recentesDiv")
    let str = ""
    let count = 0

    for (let i = livros.length - 1; i >= 0; i--) {
        if (count < 10) {
            if (idUtilizadorLogado !== -1) {
                str += `<div class="col-xl-4 col-lg-5 col-sm-6 col-10 mt-4 livro-recente">
                            <figure>
                                <div class="livro-card">
                                    <a href="content/livro.html" class="livro${livros[i].id} clicarLivro"><img class="img-fluid" src="${livros[i].urlCapa}"></a>
                                </div>
                                <figcaption class="px-2">
                                    <div>
                                        <a href="content/livro.html" class="livro${livros[i].id} livro-titulo clicarLivro">${livros[i].titulo}</a>
                                    </div>
                                    <div class="livro-autor">${livros[i].autorToString("content/")}</div>
                                </figcaption>
                            </figure>
                        </div>`
            } else {
                str += `<div class="col-xl-4 col-lg-5 col-sm-6 col-10 mt-4 livro-recente">
                            <figure>
                                <div class="livro-card">
                                    <a href="" data-toggle="modal" data-target="#modalLogin"><img class="img-fluid" src="${livros[i].urlCapa}"></a>
                                </div>
                                <figcaption class="px-2">
                                    <div>
                                        <a href="" class="livro-titulo" data-toggle="modal" data-target="#modalLogin">${livros[i].titulo}</a>
                                    </div>
                                    <div class="livro-autor">${livros[i].autorToString("content/")}</div>
                                </figcaption>
                            </figure>
                        </div>`
            }
            count++
        }
    }
    recentesDiv.innerHTML = str
    //alterar o id do livro e autor clicado
    livroClicado()
    autorClicado()
}

function gerarLivrosMaisPontuados() {
    let maisPontuadosDiv = document.getElementById("maisPontuadosDiv")
    let str = ""
    let livrosMaisPontuados = Comentario.getIdsLivrosMaisPontuados()
    let count = 1

    for (let i in livrosMaisPontuados) {
        for (let j in livros) {
            if (livrosMaisPontuados[i] === livros[j].id) {
                if (idUtilizadorLogado !== -1) {
                    str += `<div class="col-lg-6 col-sm-10 col-20 mt-4 livro-pontuado">
                                <div class="d-flex flex-row">
                                    <div class="bg-teca3 px-3 ranking-div">
                                        <h1 class="text-center text-white">${count}</h1>
                                    </div>
                                    <div>
                                        <a href="content/livro.html" class="livro${livros[j].id} clicarLivro"><img class="img-fluid" src="${livros[j].urlCapa}"></a>
                                    </div>
                                </div>
                                <div class="livro-dados">
                                    <div>
                                        <a href="content/livro.html" class="livro${livros[j].id} livro-titulo clicarLivro">${livros[j].titulo}</a>
                                    </div>
                                    <div class="livro-autor">${livros[j].autorToString("content/")}</div>
                                </div>
                            </div>`
                } else {
                    str += `<div class="col-lg-6 col-sm-10 col-20 mt-4 livro-pontuado">
                                <div class="d-flex flex-row">
                                    <div class="bg-teca3 px-3 ranking-div">
                                        <h1 class="text-center text-white">${count}</h1>
                                    </div>
                                    <div>
                                        <a href="" data-toggle="modal" data-target="#modalLogin"><img class="img-fluid" src="${livros[j].urlCapa}"></a>
                                    </div>
                                </div>
                                <div class="livro-dados">
                                    <div>
                                        <a href="" class="livro-titulo" data-toggle="modal" data-target="#modalLogin">${livros[j].titulo}</a>
                                    </div>
                                    <div class="livro-autor">${livros[j].autorToString("content/")}</div>
                                </div>
                            </div>`
                }
                count++
            }
        }
    }
    maisPontuadosDiv.innerHTML = str
    //alterar o id do livro e autor clicado
    livroClicado()
    autorClicado()
}

function gerarTestemunhos() {
    let testemunhosDiv = document.getElementById("testemunhosDiv")
    let str = ""
    let idsAleatorios = Testemunho.getIdTestemunhosAleatorios(4)
    let count

    if (idsAleatorios.length >= 4) {
        for (let i in idsAleatorios) {
            for (let j in testemunhos) {
                if (testemunhos[j].id === idsAleatorios[i]) {
                    str += `<div class="container px-4 testemunho mt-5 col-xl-5 col-lg-10 col-md-10">
                                <div class="foto-testemunho text-center">
                                    <img class="img-thumbnail" src="${Utilizador.getUrlFotoById(testemunhos[j].idUtilizador)}">
                                </div>
                                <div class="texto-testemunho bg-teca3 py-3 px-5 text-white mt-3">
                                    <div class="texto-corpo">${testemunhos[j].testemunho}</div>
                                    <br>
                                    <div class="text-right">${Utilizador.getNomeById(testemunhos[j].id)}</div>
                                </div>
                            </div>`
                }
            }
        }
    } else {
        count = 0
        for (let i in testemunhos) {
            if (testemunhos[i].estado === 1) {
                str += `<div class="container px-4 testemunho mt-5 col-xl-5 col-lg-10 col-md-10">
                            <div class="foto-testemunho text-center">
                                <img class="img-thumbnail" src="${Utilizador.getUrlFotoById(testemunhos[i].idUtilizador)}">
                            </div>
                            <div class="texto-testemunho bg-teca3 py-3 px-5 text-white mt-3">
                                <div class="texto-corpo">${testemunhos[i].testemunho}</div>
                                <br>
                                <div class="text-right">${Utilizador.getNomeById(testemunhos[i].id)}</div>
                            </div>
                        </div>`
                count++
            }
        }
    }

    function encherString(quantidade) {
        for (let i = 0; i < quantidade; i++) {
            str += `<div class="container px-4 testemunho mt-5 col-xl-5 col-lg-10 col-md-10"></div>`
        }
    }

    switch (count) {
        case 0:
            encherString(4)
            break;
        case 1:
            encherString(3)
            break;
        case 2:
            encherString(2)
            break;
        case 3:
            encherString(1)
            break;
    }

    testemunhosDiv.innerHTML = str
}