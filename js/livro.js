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

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    idLivroClicado = parseInt(localStorage.getItem("idLivroClicado"))

    //aparência
    navbar()
    smoothScroll()
    btnMenu()
    //fim aparência

    if (idUtilizadorLogado !== -1) {
        for (let i in livros) {
            if (livros[i].id === idLivroClicado) {
                //título
                document.title = "StreetTeca - " + livros[i].titulo

                gerarCabecalho(livros[i].id)

                //descrição
                let descricaoLivro = document.getElementById("descricaoLivro")
                descricaoLivro.innerHTML = `<h4 class="text-teca4">Descrição</h4>
                                            ${livros[i].descricao}`

                //comentários
                gerarComentarios(livros[i].id)

                //info
                let infoLivro = document.getElementById("infoLivro")
                let str = '<h4 class="text-teca4">Informações</h4>'
                str += `<div>
                            <span style="font-weight: 600;">Ano:</span> ${livros[i].ano}.
                            <br>
                            <span style="font-weight: 600;">Editora:</span> ${livros[i].editora}.
                            <br>
                            <span style="font-weight: 600;">Páginas:</span> ${livros[i].paginas}.
                            <br>
                            <span style="font-weight: 600;">Estado:</span> ${livros[i].estadoToString()}.
                            <br>
                            <span style="font-weight: 600;">Data de doação:</span> ${livros[i].dataDoacao}.`
                if (livros[i].idDoador !== -1) {
                    str += `<br>
                    <span style="font-weight: 600;">Doador:</span> ${Utilizador.getNomeById(livros[i].idDoador)}.`
                }
                str += "</div>"
                infoLivro.innerHTML = str

                //mapa
                gerarMapaLivro(livros[i].id)

                //do mesmo género
                gerarLivrosGenero(livros[i].idGenero, livros[i].id)
            }
        }

        livroClicado()

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

} //fim onload

function gerarCabecalho(idLivro) {
    let str = ""
    for (let i in livros) {
        if (livros[i].id === idLivro) {
            let quantidadeRequisicoes = Requisicao.getQuantidadeRequisicoesByIdLivro(livros[i].id)
            let palavraRequisicao = (quantidadeRequisicoes === 1) ? " requisição" : " requisições"
            str += `<div class="col-xl-4 col-lg-5 col-md-8 col-sm-20 col-20 mt-5 text-center">
                        <img class="img-fluid img-thumbnail" src="${livros[i].urlCapa}">
                    </div>
                    <div class="col-lg-15 col-md-12 col-sm-20 col-20 mt-5 text-white">
                        <h4 class="font-weight-bold">${livros[i].titulo}</h4>
                        <small class="text-white" style="font-size: .9em;">de ${livros[i].autorToString()}</small>
                        <hr class="bg-teca4">
                        <div class="row">
                            <div class="col-xl-6 col-lg-10 col-sm-12 col-20" id="pontuacaoMediaEstrelas"></div>
                            <div class="col-xl-12 col-lg-10 col-sm-8 col-20">
                                <i class="fa fa-archive text-teca4"></i> ${Requisicao.getQuantidadeRequisicoesByIdLivro(livros[i].id) + palavraRequisicao}
                            </div>
                        </div>
                        <hr class="bg-teca4">
                        <div class="row">
                            <button type="button" class="col-lg-6 col-md-9 col-sm-20 btn btn-teca3 mt-2 mx-2" id="disponibilidade" style="border-radius: 2em;"></button>
                            <button type="button" class="col-lg-6 col-md-9 col-sm-20 btn btn-teca3 mt-2 mx-2" style="border-radius: 2em;">
                                <i class="fa fa-heart text-danger"></i> Lista de desejos
                            </button>
                            <button type="button" class="col-lg-6 col-md-19 col-sm-20 btn btn-teca3 mt-2 mx-2" style="border-radius: 2em;" onclick="window.location.href='#infoLivro'">
                                <i class="fa fa-info-circle"></i> Mais informações
                            </button>
                        </div>
                        <hr class="bg-teca4">
                        <div class="row">
                            <div class="col-lg-10 col-md-20 col-sm-10 col-20">
                                <span class="text-teca4" style="font-size: 1.5em; font-weight: 500">Género:</span> ${Genero.getNomeById(livros[i].idGenero)}
                            </div>
                            <div class="col-lg-10 col-md-20 col-sm-10 col-20">
                                <span class="text-teca4" style="font-size: 1.5em; font-weight: 500">Tags:</span> ${Tag.getNomesByIds(livros[i].idTags).join(", ")}
                            </div>
                        </div>
                        <hr class="bg-teca4">
                    </div>`
        }
    }

    document.getElementById("cabecalho").innerHTML = str

    let disponibilidade = document.getElementById("disponibilidade")
    if (Livro.getIdBibliotecaById(idLivro) !== -1) {
        disponibilidade.innerHTML = '<i class="fa fa-archive text-teca4"></i> Requisitar'
    } else {
        if (Requisicao.verificarRequisicaoAtivaByIdUtilizadorIdLivro(idUtilizadorLogado, idLivroClicado)) {
            disponibilidade.innerHTML = '<i class="fa fa-archive text-teca4"></i> Entregar livro'
        } else {
            disponibilidade.innerHTML = '<i class="fa fa-times text-teca4"></i> Livro indisponível'
        }
    }

    disponibilidade.addEventListener("click", function () {
        if (Utilizador.getTipoAcessoById(idUtilizadorLogado) === 2) {
            if (Livro.getIdBibliotecaById(idLivro) !== -1) {
                if (Requisicao.getQuantidadeRequisicoesAtivasByIdUtilizador(idUtilizadorLogado) === 2) {
                    swal("Impossível requisitar", `Já tem 2 requisições ativas (${Requisicao.getListaRequisicoesAtivasByIdUtilizador(idUtilizadorLogado).join(" e ")}), entregue pelo menos um destes livros para continuar.`, "error")
                } else {
                    swal({
                        title: "Confirmar requisição?",
                        text: `Está prestes a requisitar o livro ${Livro.getTituloById(idLivroClicado)}.\nTenha em conta que tem um prazo de ${configuracoes.diasRequisicao} dias para entregar o livro, sob pena de multa que aumentará €${configuracoes.valorMultaDiaria} diariamente caso ultrapasse a data limite.\nUma vez que a multa tenha excedido os €${configuracoes.valorMultaLimite}, a sua conta será bloqueada.\nPretende continuar?`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: false,
                    }).then((willDelete) => {
                        if (willDelete) {
                            swal("Livro requisitado!", `O seu livro está disponível para levantamento na biblioteca de ${Biblioteca.getConcelhoFreguesiaById(Livro.getIdBibliotecaById(idLivroClicado)).join(", ")}. Boa leitura!`, "success")
                            requisicoes.push(new Requisicao(idUtilizadorLogado, idLivroClicado, obterData(new Date())))
                            //atualiza key
                            localStorage.setItem("requisicoes", JSON.stringify(requisicoes))
                            //remove biblioteca ativa do livro requisitado
                            for (let i in livros) {
                                if (livros[i].id === idLivroClicado) {
                                    livros[i].idBiblioteca = -1
                                    localStorage.setItem("livros", JSON.stringify(livros))
                                }
                            }
                            gerarCabecalho(idLivroClicado)
                        }
                    });
                }
            } else {
                if (Requisicao.verificarRequisicaoAtivaByIdUtilizadorIdLivro(idUtilizadorLogado, idLivroClicado)) {
                    window.location.href = "perfil.html"
                } else {
                    swal("Livro indisponível", "Este livro está temporariamente indisponível. Caso queira ser notificado quando estiver novamente disponível, adicione à sua lista de desejos.", "error")
                }
            }
        } else {
            swal("Impossível requisitar", "Apenas utilizadores podem requisitar livros.", "error")
        }
    })

    //pontuação    
    for (let i in livros) {
        if (livros[i].id === idLivroClicado) {
            gerarPontuacaoEstrelas(livros[i].getPontuacaoMedia(), livros[i].id)
        }
    }
}

function gerarPontuacaoEstrelas(pontuacaoMedia, idLivro) {
    pontuacaoMedia = Math.round(pontuacaoMedia)

    let str = ""

    for (let i = 0; i <= 4; i++) {
        if (pontuacaoMedia > i) {
            str += '<span class="fa fa-star estrela"></span>&nbsp;'
        } else {
            str += '<span class="fa fa-star"></span>&nbsp;'
        }
    }

    let palavra = (Comentario.getQuantidadePontuacoesByIdLivro(idLivro) === 1) ? " avaliação" : " avaliações"

    str += `&nbsp;(${Comentario.getQuantidadePontuacoesByIdLivro(idLivro) + palavra})`

    let pontuacaoMediaEstrelas = document.getElementById("pontuacaoMediaEstrelas")
    pontuacaoMediaEstrelas.innerHTML = str
}

function gerarMapaLivro(idLivro) {
    if (Livro.getIdBibliotecaById(idLivro) !== -1) {
        document.getElementById("ondeEncontrar").innerHTML = "Onde encontrar este livro"
        let map
        let mapaBibliotecas = document.getElementById("mapaLivro")
        mapaBibliotecas.style.height = "650px"

        let coordenadas = Biblioteca.getCoordenadasById(Livro.getIdBibliotecaById(idLivro))

        let mapProp = {
            center: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
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


        for (let i in livros) {
            if (livros[i].id === idLivro) {
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng),
                    title: "Biblioteca",
                    animation: google.maps.Animation.DROP
                })

                marker.setMap(map)

                let infoWindow

                for (let j in bibliotecas) {
                    if (bibliotecas[j].id === Livro.getIdBibliotecaById(idLivro)) {
                        infoWindow = new google.maps.InfoWindow({
                            content: `<div class="container text-dark" id="info" style="font-size:1.1em;">
                                        <h4>Biblioteca de ${Freguesia.getFreguesiaById(bibliotecas[j].idFreguesia)}, ${Concelho.getConcelhoById(bibliotecas[j].idConcelho)}</h4>
                                        <hr>
                                        <p>${bibliotecas[j].descricao}</p>
                                        <hr>
                                        <p><b>Capacidade:</b> ${bibliotecas[j].capacidade}</p>                                    
                                        <p><b>Morada:</b> ${bibliotecas[j].morada}</p>                                    
                                        <p><b>Coordenadas:</b></p>
                                        <p>Latitude: ${coordenadas.lat}</p>
                                        <p>Longitude: ${coordenadas.lng}</p>
                                        <hr>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-teca3 mt-1" id="percurso">Iniciar percurso</button>
                                        </div>
                                    </div>`
                        })
                    }
                }

                marker.addListener("click", function () {
                    infoWindow.open(map, marker)

                    let info = document.getElementById("info")

                    if ($(window).width() <= 991) {
                        info.style.width = $(window).width() / 2 + "px"
                    } else {
                        info.style.width = 991 / 2 + "px"
                    }

                    window.addEventListener("resize", function () {
                        if ($(window).width() <= 991) {
                            info.style.width = $(window).width() / 2 + "px"
                        } else {
                            info.style.width = 991 / 2 + "px"
                        }
                    })

                    //percurso

                    let deslocacao

                    let percurso = document.getElementById("percurso")
                    percurso.addEventListener("click", function () {
                        swal("Iniciar percurso", "Selecione o meio de deslocação", "info", {
                            buttons: {
                                carro: {
                                    text: "Carro",
                                    value: "carro"
                                },
                                pe: {
                                    text: "A pé",
                                    value: "pe",
                                },
                            },
                        }).then((value) => {
                            let continuar = true
                            switch (value) {
                                case "carro":
                                    deslocacao = google.maps.TravelMode.DRIVING
                                    break;

                                case "pe":
                                    deslocacao = google.maps.TravelMode.WALKING
                                    break;
                                default:
                                    continuar = false
                                    break;
                            }


                            if (continuar) {
                                navigator.geolocation.watchPosition(function (position) {
                                    // Associa as direções ao mapa
                                    let directionsDisplay = new google.maps.DirectionsRenderer({
                                        map: map
                                    })

                                    let origem = { lat: position.coords.latitude, lng: position.coords.longitude }
                                    let destino = { lat: coordenadas.lat, lng: coordenadas.lng }

                                    // Define um objeto Request com origem, destino e modo de viagem
                                    let request = {
                                        destination: destino,
                                        origin: origem,
                                        travelMode: deslocacao
                                    }
                                    // Passa o objeto Request ao serviço Directions
                                    let directionsService = new google.maps.DirectionsService()
                                    directionsService.route(request, function (response, status) {
                                        if (status == google.maps.DirectionsStatus.OK) {
                                            // Exibe a rota no mapa
                                            directionsDisplay.setDirections(response);
                                            percurso.style.display = "none"
                                        }
                                    })
                                }, function (error) {
                                    if (error.code == error.PERMISSION_DENIED)
                                        swal("Habilitar localização!", "Para que possamos calcular o percurso ideal, habilite a localização.\nCaso o problema persista, limpe os dados de navegação do seu navegador.", "error")
                                });
                            }
                        });
                    })
                })
            }
        }
    }
}

function gerarComentarios(idLivro) {
    let totalComentarios = document.getElementById("totalComentarios")
    totalComentarios.innerHTML = `Comentários (${Comentario.getQuantidadePontuacoesByIdLivro(idLivro)})`

    let str = ""
    for (let i in comentarios) {
        if (comentarios[i].idLivro === idLivro) {
            let foto = (Utilizador.getUrlFotoById(comentarios[i].idUtilizador) === "img/perfil.png") ? "../img/perfil.png" : Utilizador.getUrlFotoById(comentarios[i].idUtilizador)
            str += `<div class="mt-3 col-xl-5 col-md-6 col-sm-10 col-20">
                        <div class="foto-comentario pull-left">
                            <img src="${foto}" width="50px" height="50px">
                        </div>
                        <div>&nbsp;${Utilizador.getPrimeiroUltimoNomeById(comentarios[i].idUtilizador)}</div>
                        <div>&nbsp;`

            for (let j = 0; j <= 4; j++) {
                if (comentarios[i].pontuacao > j) {
                    str += '<span class="fa fa-star estrela"></span>&nbsp;'
                } else {
                    str += '<span class="fa fa-star"></span>&nbsp;'
                }
            }

            str += `    </div>
                        <p class="" style="font-size: .9em;">&nbsp;${comentarios[i].comentario}</p>
                    </div>`
        }
    }
    let comentariosLivro = document.getElementById("comentariosLivro")
    if (str) {
        comentariosLivro.innerHTML = str
    } else {
        comentariosLivro.innerHTML = '<p class="col-20">Ainda sem comentários. Caso queira deixar a sua opinião sobre este livro, requisite-o.</p>'
    }
}

function gerarLivrosGenero(idGenero, idLivro) {
    let existir = false
    let ids = Livro.getIdsAleatoriosByIdGeneroIdTags(idGenero, Livro.getIdTagsById(idLivro))
    //remove o id do livro em questão do array ids, caso este esteja lá
    if (ids.indexOf(idLivro) !== -1) {
        ids.splice(ids.indexOf(idLivro), 1)
    }
    ids.length = 4
    let str = `<h4 class="text-teca4">Poderá também gostar de</h4>
               <div class="row mt-1 d-flex justify-content-start text-center">`
    for (let i in ids) {
        for (let j in livros) {
            if (livros[j].id === ids[i] && livros[j].id !== idLivro) {
                str += `<div class="col-lg-5 col-10 mt-4 livro-recente">
                            <figure>
                                <div class="livro-card">
                                    <a href="livro.html" class="livro${livros[j].id} clicarLivro""><img class="img-fluid" src="${livros[j].urlCapa}"></a>
                                </div>
                                <figcaption class="px-2">
                                    <div>
                                        <a href="livro.html" class="livro${livros[j].id} livro-titulo clicarLivro"">${livros[j].titulo}</a>
                                    </div>
                                    <div class="livro-autor">${livros[j].autorToString()}</div>
                                </figcaption>
                            </figure>
                        </div>`
                existir = true
            }
        }
    }
    str += "</div>"
    //caso hajam livros que estejam relacionados
    if (existir) {
        document.getElementById("relacionados").innerHTML = str
    }
}

function notificar(titulo, corpo, imagem) {
    Notification.requestPermission().then(function (result) {
        let opcoes = {
            body: corpo,
            icon: imagem,
            vibrate: [200, 100, 200]
        }

        let n = new Notification(titulo, opcoes);

        n.onclick = function (event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            localStorage.setItem("idLivroClicado", 1)
            window.open('livro.html', "_self");
            n.close()
        }
    });

}
/*
function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Hi there!");
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}*/