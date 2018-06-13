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

    concelhos = JSON.parse(localStorage.getItem("concelhos"))
    transformarEmInstanciaConcelho(concelhos)

    freguesias = JSON.parse(localStorage.getItem("freguesias"))
    transformarEmInstanciaFreguesia(freguesias)

    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
    transformarEmInstanciaBiblioteca(bibliotecas)

    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    configuracoes = JSON.parse(localStorage.getItem("configuracoes"))

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    idLivroClicado = parseInt(localStorage.getItem("idLivroClicado"))

    //aparência
    navbar()
    smoothScroll()
    btnMenu()
    //fim aparência
    atualizarTodasMultas()    

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

    //gerar info sobre o utilizador, requisicoes ativas, lista de desejos, requisicoes
    gerarInfo()
    gerarRequisicoesAtivas()

} //fim onload

function gerarInfo() {
    let str = `<h4 class="text-teca4 text-center">O MEU PERFIL</h4>
               <div class="row">`
    for (let i in utilizadores) {
        if (utilizadores[i].id === idUtilizadorLogado) {
            str += `<div class="col-lg-5 col-md-8 col-sm-20 col-20 mt-2 text-center">
                        <div class="foto-testemunho text-center">
                            <img class="img-thumbnail" src="../${utilizadores[i].urlFoto}">
                            <div class="text-center">
                                Multa: €${utilizadores[i].multa}
                            </div>
                            
                            <div class="row px-5">
                                <button type="button" class="col-20 btn btn-teca3 mt-2" style="border-radius: 2em;" id="btnEditarPerfil" data-toggle="modal" data-target="#modal">
                                <i class="fa fa-pencil text-teca4"></i> Editar o perfil
                            </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-15 col-md-12 col-sm-20 col-20 mt-2 text-white">
                        <ul class="list-group">
                            <li class="list-group-item bg-teca3">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-20">Nome</div>
                                    <div class="col-lg-17 col-md-16 col-20 font-weight-bold">${utilizadores[i].nome}</div>
                                </div>
                            </li>
                            <li class="list-group-item bg-teca3">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-20">Email</div>
                                    <div class="col-lg-17 col-md-16 col-20 font-weight-bold">${utilizadores[i].email}</div>
                                </div>
                            </li>
                            <li class="list-group-item bg-teca3">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-20">Data de inscrição</div>
                                    <div class="col-lg-17 col-md-16 col-20 font-weight-bold">${dataToString(utilizadores[i].dataInscricao)}</div>
                                </div>
                            </li>
                            <li class="list-group-item bg-teca3">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-20">Biografia</div>
                                    <div class="col-lg-17 col-md-16 col-20 font-weight-bold">${utilizadores[i].biografia}</div>
                                </div>
                            </li>
                        </ul>
                    </div>`
        }
    }
    str += "</div>"
    document.getElementById("cabecalho").innerHTML = str

    let modalTitulo = document.getElementById("modalTitulo")
    let modalBody = document.getElementById("modalBody")
    let modalFooter = document.getElementById("modalFooter")

    document.getElementById("btnEditarPerfil").addEventListener("click", function () {
        modalTitulo.innerHTML = "A editar perfil"
        for (let i in utilizadores) {
            if (utilizadores[i].id === idUtilizadorLogado) {
                let urlFoto = (utilizadores[i].urlFoto === "img/perfil.png") ? "" : urlFoto
                modalBody.innerHTML = ` <div class="container-fluid">
                                            <div class="text-center">
                                                <img src="../${utilizadores[i].urlFoto}" class="img-fluid img-thumbnail" id="fotoEditar" style="width: 150px; height: 150px; border-radius: 50%;">                            
                                            </div>
                                            <br>
                                            <form class="form-horizontal" id="formEditar">
                                                <div class="form-group">
                                                    <label for="inputEditarNome">Nome *</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fa fa-id-card" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <input required autofocus type="text" class="form-control" id="inputEditarNome" value="${utilizadores[i].nome}">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="inputEditarEmail">Email *</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fa fa-at" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <input required type="text" class="form-control" id="inputEditarEmail" value="${utilizadores[i].email}">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="inputEditarUrlFoto">URL foto</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fa fa-link" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <input type="text" class="form-control" id="inputEditarUrlFoto" value="${urlFoto}">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="inputEditarBiografia">Biografia</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fa fa-info" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <textarea id="inputEditarBiografia" class="form-control" rows="5" style="resize: vertical; min-height: 48px; max-height: 150px;"></textarea>
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <div>
                                                        <button type="button" class="col-sm-10 col-13 btn btn-teca3 mt-2" id="btnAlterarPassword"> Alterar password
                                                    </div>
                                                    <input type="submit" class="col-sm-10 col-13 btn btn-teca3 mt-2" value="Confirmar">                                                
                                                </div>
                                            </form>                                  
                                        </div>`

                let inputBiografia = document.getElementById("inputEditarBiografia")

                if (utilizadores[i].biografia === "Escreva algo sobre si...") {
                    inputBiografia.placeholder = "Escreva algo sobre si..."
                } else {
                    inputBiografia.innerHTML = "Escreva algo sobre si..."
                }

                document.getElementById("formEditar").addEventListener("submit", function (event) {
                    let inputEditarNome = document.getElementById("inputEditarNome")
                    let inputEditarEmail = document.getElementById("inputEditarEmail")
                    let inputEditarUrlFoto = document.getElementById("inputEditarUrlFoto")
                    let inputEditarBiografia = document.getElementById("inputEditarBiografia")
                    utilizadores[i].nome = inputEditarNome.value
                    utilizadores[i].email = inputEditarEmail.value
                    utilizadores[i].urlFoto = inputEditarUrlFoto.value
                    utilizadores[i].biografia = inputEditarBiografia.value

                    //atualizar key
                    localStorage.setItem("utilizadores", JSON.stringify(utilizadores))

                    $("#modal").modal("hide")
                    swal("Perfil editado.", "", "success")
                    gerarInfo()

                    event.preventDefault()
                })

                document.getElementById("btnAlterarPassword").addEventListener("click", function () {
                    modalTitulo.innerHTML = "A alterar password"
                    modalBody.innerHTML = `<form class="form-horizontal" id="formPassword">
                                                <div class="form-group">
                                                    <label for="inputPasswordAtual">Password atual</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fa fa-key" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <input required autofocus type="password" class="form-control" id="inputPasswordAtual">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="inputNovaPassword">Nova password</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fa fa-key" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <input required type="password" class="form-control" id="inputNovaPassword">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="inputNovaPasswordConfirmar">Confirmar nova password</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                                <i class="fa fa-key" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <input required type="password" class="form-control" id="inputNovaPasswordConfirmar">
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <input type="submit" class="col-sm-10 col-13 btn btn-teca3 mt-2" value="Confirmar">                                                
                                                </div>
                                            </form>`

                    document.getElementById("formPassword").addEventListener("submit", function (event) {
                        let inputPasswordAtual = document.getElementById("inputPasswordAtual")
                        let inputNovaPassword = document.getElementById("inputNovaPassword")
                        let inputNovaPasswordConfirmar = document.getElementById("inputNovaPasswordConfirmar")

                        if (inputPasswordAtual.value === utilizadores[i].password) {
                            if (inputNovaPassword.value === inputNovaPasswordConfirmar.value) {
                                utilizadores[i].password = inputNovaPassword.value
                                //atualiza key
                                localStorage.setItem("utilizadores", JSON.stringify(utilizadores))
                                $("#modal").modal("hide")
                                swal("Password alterada.", "", "success")
                            } else {
                                swal("Passwords não coincidem!", "Verifique se as passwords são iguais.", "error")
                            }
                        } else {
                            swal("Password incorreta!", "Verifique se inseriu a sua password corretamente.", "error")
                        }

                        event.preventDefault()
                    })
                })



            }
        }
        modalFooter.innerHTML = ""

        let inputEditarUrlFoto = document.getElementById("inputEditarUrlFoto")
        inputEditarUrlFoto.addEventListener("change", function () {
            document.getElementById("fotoEditar").src = (!inputEditarUrlFoto.value) ? "../img/perfil.png" : inputEditarUrlFoto.value
        })
    })
}

function gerarRequisicoesAtivas() {
    let requisicoesAtivas = Requisicao.getIdsRequisicoesAtivasByIdUtilizador(idUtilizadorLogado)
    let str = `<span class="text-teca4" style="font-size: 1.5em; font-weight: 500">REQUISIÇÕES ATIVAS (${requisicoesAtivas.length})</span>`
    if (requisicoesAtivas.length > 0) {
        for (let i in requisicoesAtivas) {
            for (let j in requisicoes) {
                if (requisicoes[j].id === requisicoesAtivas[i]) {
                    for (let k in livros) {
                        if (livros[k].id === requisicoes[j].idLivro) {
                            str += `<div class="row mt-4">
                                        <div class="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-20 pull-left livro-recente text-center">
                                            <figure>
                                                <div class="livro-card">
                                                    <a href="livro.html" class="livro${livros[k].id} clicarLivro">
                                                        <img class="img-fluid" src="${livros[k].urlCapa}">
                                                    </a>
                                                </div>
                                            </figure>
                                        </div>
                                        <div class="col-xl-16 col-lg-15 col-md-14 col-sm-13 col-20 text-white text-left">
                                            <a href="livro.html" class="livro${livros[k].id} clicarLivro">
                                                <h4 class="livro-titulo">A Guerra dos Tronos</h4>
                                            </a>
                                            <p style="font-size: .9em;">de ${livros[k].autorToString()}</p>
                                            <div>
                                                <span style="font-weight: 600;">Data de requisição:</span> ${dataToString(requisicoes[j].dataRequisicao)}.
                                                <br>
                                                <span style="font-weight: 600;">Data limite de entrega:</span> ${dataToString(obterData(requisicoes[j].calcularDataLimiteEntrega()))}
                                            </div>
                                            <button type="button" class="col-xl-8 col-lg-10 col-md-13 col-sm-20 col-15 btn btn-teca3 mt-2" style="border-radius: 2em;">
                                                <i class="fa fa-pencil text-teca4"></i> Entregar
                                            </button>
                                        </div>
                                    </div>
                                    <hr class="bg-teca4">`
                        }
                    }
                }
            }
        }
    } else {
        str += '<br>Não possui nenhum livro requisitado de momento, caso queira visite o nosso <a href="catalogo.html" class="text-teca4">catálogo</a>, constantemente atualizado com os últimos lançamentos.'
    }
    document.getElementById("requisicoesAtivas").innerHTML = str
    livroClicado()
    autorClicado()
}