window.onload = function () {
    //importar variáveis do sessionStorage
    comentarios = JSON.parse(localStorage.getItem("comentarios"))
    transformarEmInstanciaComentario(comentarios)

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
    gerarRequisicoesEntregues()

} //fim onload

let modalTitulo = document.getElementById("modalTitulo")
let modalBody = document.getElementById("modalBody")
let modalFooter = document.getElementById("modalFooter")

function gerarInfo() {
    let str = `<h4 class="text-teca4 text-center">O MEU PERFIL</h4>
               <div class="row">`
    for (let i in utilizadores) {
        if (utilizadores[i].id === idUtilizadorLogado) {
            let urlFoto = (utilizadores[i].urlFoto === "img/perfil.png") ? "../img/perfil.png" : utilizadores[i].urlFoto
            str += `<div class="col-lg-5 col-md-8 col-sm-20 col-20 mt-2 text-center">
                        <div class="foto-testemunho text-center">
                            <img class="img-thumbnail" src="${urlFoto}">
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

    document.getElementById("btnEditarPerfil").addEventListener("click", function () {
        modalTitulo.innerHTML = "A editar perfil"
        for (let i in utilizadores) {
            if (utilizadores[i].id === idUtilizadorLogado) {
                let urlFoto = (utilizadores[i].urlFoto === "img/perfil.png") ? "../img/perfil.png" : utilizadores[i].urlFoto
                let foto = (utilizadores[i].urlFoto === "img/perfil.png") ? "" : utilizadores[i].urlFoto
                modalBody.innerHTML = ` <div class="container-fluid">
                                            <div class="text-center">
                                                <img src="${urlFoto}" class="img-fluid img-thumbnail" id="fotoEditar" style="width: 150px; height: 150px; border-radius: 50%;">                            
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
                                                        <input type="text" class="form-control" id="inputEditarUrlFoto" value="${foto}">
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

                    if (Utilizador.getIdByEmail(inputEditarEmail.value) === -1) {
                        utilizadores[i].nome = inputEditarNome.value
                        utilizadores[i].email = inputEditarEmail.value
                        utilizadores[i].urlFoto = inputEditarUrlFoto.value
                        utilizadores[i].biografia = inputEditarBiografia.value

                        //atualizar key
                        localStorage.setItem("utilizadores", JSON.stringify(utilizadores))

                        $("#modal").modal("hide")
                        swal("Perfil editado.", "", "success")
                        gerarInfo()
                    } else {
                        swal("Erro!", "Já existe um utilizador registado com o mesmo email.", "error")
                    }


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

let idLivro

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
                                        <div class="col-xl-16 col-lg-15 col-md-14 col-sm-13 col-20 text-white text-left" id="livro${livros[k].id}">
                                            <a href="livro.html" class="livro${livros[k].id} clicarLivro">
                                                <h4 class="livro-titulo">${livros[k].titulo}</h4>
                                            </a>
                                            <p style="font-size: .9em;">de ${livros[k].autorToString()}</p>
                                            <div>
                                                <span style="font-weight: 600;">Data de requisição:</span> ${dataToString(requisicoes[j].dataRequisicao)}.
                                                <br>
                                                <span style="font-weight: 600;">Data limite de entrega:</span> ${dataToString(obterData(requisicoes[j].calcularDataLimiteEntrega()))}
                                            </div>
                                            <button type="button" id="btnEntregarLivro" data-toggle="modal" data-target="#modal" class="col-xl-8 col-lg-10 col-md-13 col-sm-20 col-15 btn btn-teca3 mt-2" style="border-radius: 2em;">
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
        str += '<br>Não possui nenhum livro requisitado de momento, caso queira visite o nosso <a href="catalogo.html" class="text-teca4">catálogo</a>, que é constantemente atualizado com os últimos lançamentos.'
    }
    document.getElementById("requisicoesAtivas").innerHTML = str
    //remove o último <hr>
    try {
        document.querySelectorAll("#requisicoesAtivas hr.bg-teca4")[document.querySelectorAll("#requisicoesAtivas hr.bg-teca4").length - 1].remove()
    } catch (err) {

    }
    livroClicado()
    autorClicado()

    let btnEntregarLivro = document.getElementById("btnEntregarLivro")
    try {
        btnEntregarLivro.addEventListener("click", function () {
            idLivro = parseInt(btnEntregarLivro.parentNode.id.replace(/livro/g, ""))
            modalTitulo.innerHTML = "A entregar " + Livro.getTituloById(idLivro)
            modalBody.innerHTML = `Escolha uma biblioteca para entregar o livro:
                                   <div id="mapa"></div>`
            gerarMapaBibliotecas()
        })
    } catch (err) {

    }

}

function gerarMapaBibliotecas() {
    let map
    let mapaBibliotecas = document.getElementById("mapa")
    mapaBibliotecas.style.height = "650px"

    let mapProp = {
        center: new google.maps.LatLng(41.366174, -8.7396931),
        zoom: 10,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8ec3b9"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1a3646"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#64779e"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#334e87"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6f9ba5"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3C7680"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#304a7d"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2c6675"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#255763"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#b0d5ce"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3a4762"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0e1626"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#4e6d70"
                    }
                ]
            }
        ]
    }
    map = new google.maps.Map(mapaBibliotecas, mapProp)

    if (bibliotecas.length > 0) {
        let bibliotecasMarker = []
        let bibliotecasInfoWindow = []
        for (let i in bibliotecas) {
            if (bibliotecas[i].getCapacidadeAtual() >= 1) {
                bibliotecasMarker.push(new google.maps.Marker({
                    position: new google.maps.LatLng(bibliotecas[i].coordenadas.lat, bibliotecas[i].coordenadas.lng),
                    label: bibliotecas[i].id + "",
                    title: "Biblioteca " + bibliotecas[i].id,
                    animation: google.maps.Animation.DROP
                }))

                bibliotecasInfoWindow.push(new google.maps.InfoWindow({
                    content: `<div class="container text-dark info" style="font-size:1.1em; width:100px;">
                                <h4>Biblioteca de ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)}, ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)}</h4>
                                <hr>
                                <p>${bibliotecas[i].descricao}</p>
                                <hr>
                                <p><b>Capacidade:</b> ${bibliotecas[i].capacidade}</p>                                    
                                <p><b>Morada:</b> ${bibliotecas[i].morada}</p>                                    
                                <p><b>Coordenadas:</b></p>
                                <p>Latitude: ${bibliotecas[i].coordenadas.lat} / Longitude: ${bibliotecas[i].coordenadas.lng}</p>
                                <hr>
                                <div class="text-center">
                                    <button type="button" class="btn btn-teca3 mt-1 btnConfirmarEntrega">Entregar livro</button>
                                </div>
                            </div>`
                }))

                for (let j in bibliotecasMarker) {
                    bibliotecasMarker[j].setMap(map)
                    bibliotecasMarker[j].addListener("click", function () {
                        bibliotecasInfoWindow[j].open(map, bibliotecasMarker[j])
                        let info = document.getElementsByClassName("info")
                        for (let k = 0; k < info.length; k++) {
                            if ($(window).width() <= 750) {
                                info[k].style.width = $(window).width() / 2 + "px"
                            } else {
                                info[k].style.width = 750 / 2 + "px"
                            }

                            window.addEventListener("resize", function () {
                                if ($(window).width() <= 750) {
                                    info[k].style.width = $(window).width() / 2 + "px"
                                } else {
                                    info[k].style.width = 750 / 2 + "px"
                                }
                            })
                        }

                        let btnConfirmarEntrega = document.getElementsByClassName("btnConfirmarEntrega")
                        for (let k = 0; k < btnConfirmarEntrega.length; k++) {
                            btnConfirmarEntrega[k].addEventListener("click", function () {
                                let idBiblioteca = parseInt(bibliotecasMarker[j].label)
                                $("#modal").modal("hide")
                                if (Utilizador.getMultaById(idUtilizadorLogado)) {
                                    swal("Multa em dívida.", `Tem uma multa de €${Utilizador.getMultaById(idUtilizadorLogado)}. Dirija-se à biblioteca de ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)}, ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} para entregar o livro.`, "warning")
                                } else {
                                    console.log("freguesia", bibliotecas[i].idFreguesia)
                                    console.log("concelho", bibliotecas[i].idConcelho)
                                    swal("Entregue o livro.", `Dirija-se à biblioteca de ${Biblioteca.getConcelhoFreguesiaById(idBiblioteca)[1]}, ${Biblioteca.getConcelhoFreguesiaById(idBiblioteca)[0]} para entregar o livro.`, "warning")
                                }
                                Requisicao.entregarLivroByIdUtilizadorIdLivro(idUtilizadorLogado, idLivro)
                                for (let l in livros) {
                                    if (livros[l].id === idLivro) {
                                        livros[l].idBiblioteca = idBiblioteca
                                        //atualiza a key
                                        localStorage.setItem("livros", JSON.stringify(livros))
                                    }
                                }
                                gerarRequisicoesAtivas()
                                gerarRequisicoesEntregues()
                            })
                        }
                    })
                }
            }
        }
    }
}

function gerarRequisicoesEntregues() {
    let requisicoesEntregues = Requisicao.getIdsRequisicoesEntreguesByIdUtilizador(idUtilizadorLogado)
    let str = ` <div class="mt-5">
                <span class="text-teca4" style="font-size: 1.5em; font-weight: 500">LIVROS LIDOS (${requisicoesEntregues.length})</span>`
    if (requisicoesEntregues.length > 0) {
        for (let i in requisicoesEntregues) {
            for (let j in requisicoes) {
                if (requisicoes[j].id === requisicoesEntregues[i]) {
                    for (let k in livros) {
                        if (livros[k].id === requisicoes[j].idLivro) {
                            str += `<div class="livro${livros[k].id} row mt-4">
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
                                                <h4 class="livro-titulo">${livros[k].titulo}</h4>
                                            </a>
                                            <p style="font-size: .9em;">de ${livros[k].autorToString()}</p>
                                            <div>
                                                <span style="font-weight: 600;">Data de requisição:</span> ${dataToString(requisicoes[j].dataRequisicao)}
                                                <br>
                                                <span style="font-weight: 600;">Data de entrega:</span> ${dataToString(requisicoes[j].dataEntrega)}
                                            </div>`

                            let idComentario = Comentario.getIdByIdUtilizadorIdLivro(idUtilizadorLogado, livros[k].id)
                            if (idComentario === -1) {
                                str += `    <button type="button" class="col-xl-8 col-lg-10 col-md-13 col-sm-20 col-15 btn btn-teca3 mt-2 btnAvaliarLivro" style="border-radius: 2em;" data-toggle="modal" data-target="#modal">
                                                <i class="fa fa-star text-teca4"></i> Avaliar o livro
                                            </button>`
                            }
                            str +=       `</div>      
                                    </div>
                                    <hr class="bg-teca4">
                                </div>`
                        }
                    }
                }
            }
        }
    } else {
        str += '<br>Não possui nenhum livro lido, caso queira visite o nosso <a href="catalogo.html" class="text-teca4">catálogo</a>, que é constantemente atualizado com os últimos lançamentos.'
    }
    document.getElementById("requisicoesEntregues").innerHTML = str

    //remove o último <hr>
    try {
        document.querySelectorAll("#requisicoesEntregues hr.bg-teca4")[document.querySelectorAll("#requisicoesEntregues hr.bg-teca4").length - 1].remove()
    } catch (err) {

    }
    livroClicado()
    autorClicado()

    let btnEntregarLivro = document.getElementById("btnEntregarLivro")
    try {
        btnEntregarLivro.addEventListener("click", function () {
            idLivro = parseInt(btnEntregarLivro.parentNode.id.replace(/livro/g, ""))
            modalTitulo.innerHTML = "A entregar " + Livro.getTituloById(idLivro)
            modalBody.innerHTML = `Escolha uma biblioteca para entregar o livro:
                                   <div id="mapa"></div>`
            gerarMapaBibliotecas()
        })
    } catch (err) {

    }

    let btnAvaliarLivro = document.getElementsByClassName("btnAvaliarLivro")
    for (let i = 0; i < btnAvaliarLivro.length; i++) {
        btnAvaliarLivro[i].addEventListener("click", () => {
            let idLivro = parseInt(btnAvaliarLivro[i].parentNode.parentNode.classList[0].replace(/livro/g, ""))
            modalTitulo.innerHTML = "A avaliar " + Livro.getTituloById(idLivro)
            modalBody.innerHTML = `<form id="formComentar">
                                        <span class="pull-left">Pontuação:&nbsp;</span>
                                        <div class="rating"></div>                                        
                                        <div class="form-group">
                                            <textarea id="inputComentario" class="form-control" rows="1" placeholder="Escreva aqui o seu comentário..." style="resize: vertical; min-height: 48px; max-height: 150px;" required></textarea>
                                            <input type="submit" id="btnComentar" class="btn btn-teca3 pull-right mt-2" value="Comentar">
                                        </div>
                                    </form>`
            //opções rating https://github.com/auxiliary/rater
            var options = {
                max_value: 5,
                step_size: 1,
                initial_value: 0,
                selected_symbol_type: 'fontawesome_star',
                cursor: "pointer"
            }
            $(".rating").rate(options)

            document.getElementById("formComentar").addEventListener("submit", (event) => {
                if ($(".rating").rate("getValue") === 0) {
                    swal("Pontue o livro", "Escolha uma pontuação de 1 a 5.", "error")
                } else {
                    let inputComentario = document.getElementById("inputComentario")
                    comentarios.push(new Comentario(idUtilizadorLogado, idLivro, inputComentario.value, $(".rating").rate("getValue")))
                    //atualiza key
                    localStorage.setItem("comentarios", JSON.stringify(comentarios))
                    swal("Livro avaliado", "Obrigado por deixar a sua avaliação.", "success")
                    $("#modal").modal("hide")
                    gerarRequisicoesEntregues()
                }
                event.preventDefault()
            })
        })
    }
}