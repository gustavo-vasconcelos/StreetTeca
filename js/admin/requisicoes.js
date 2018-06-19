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

    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
    transformarEmInstanciaBiblioteca(bibliotecas)

    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //menu
    gerarMenu(Utilizador.getTipoAcessoById(idUtilizadorLogado), "requisicoesMenu")

    //gerar tabelas
    gerarTabelaRequisicoesAtivas()
    gerarTabelaRequisicoesEntregues()
} //fim onload

function gerarTabelaRequisicoesAtivas() {
    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Utilizador</th>
                        <th>Livro</th>
                        <th>Data de requisição</th>
                        <th>Data limite de entrega</th>
                        <th></th>
                    </tr>
                </thead>`

    let count = 0

    for (let i in requisicoes) {
        if (!requisicoes[i].dataEntrega) {
            str += `<tr id="${requisicoes[i].id}">
                        <td>${count + 1}</td>
                        <td>${Utilizador.getNomeById(requisicoes[i].idUtilizador)}</td>
                        <td>${Livro.getTituloById(requisicoes[i].idLivro)}</td>
                        <td>${dataToString(requisicoes[i].dataRequisicao)}</td>
                        <td>${dataToString(obterData(requisicoes[i].calcularDataLimiteEntrega()))}</td>                    
                        <td>
                            <button type="button" class="btn btn-primary infoRequisicaoAtiva" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
                        </td>
                    </tr>`
            count++
        }
    }
    document.getElementById("totalRequisicoesAtivas").innerHTML = "Requisições ativas (" + count + ")"
    document.getElementById("tabelaRequisicoesAtivas").innerHTML = str

    //btn info requisicao ativa
    let btnInfoRequisicaoAtiva = document.getElementsByClassName("infoRequisicaoAtiva")
    for (let i = 0; i < btnInfoRequisicaoAtiva.length; i++) {
        btnInfoRequisicaoAtiva[i].addEventListener("click", function () {
            let idRequisicao = parseInt(btnInfoRequisicaoAtiva[i].parentNode.parentNode.id)
            for (let j in requisicoes) {
                if (!requisicoes[j].dataEntrega && requisicoes[j].id === idRequisicao) {
                    modalTitulo.innerHTML = "Informações sobre a requisição"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <div class="text-center">
                                                    <img src="${Livro.getUrlCapaById(requisicoes[j].idLivro)}" class="img-fluid img-thumbnail" style="height:300px;">                            
                                                </div>
                                                <br>
                                                <p><b>ID:</b> ${requisicoes[j].id}</p>
                                                <p><b>Utilizador (ID):</b> ${Utilizador.getNomeById(requisicoes[j].idUtilizador)} (${requisicoes[j].idUtilizador})</p>
                                                <p><b>Livro (ID):</b> ${Livro.getTituloById(requisicoes[j].idLivro)} (${requisicoes[j].idLivro})</p>
                                                <p><b>Data de requisição:</b> ${dataToString(requisicoes[j].dataRequisicao)}</p>
                                                <p><b>Data limite de entrega:</b> ${dataToString(obterData(requisicoes[j].calcularDataLimiteEntrega()))}</p>
                                            </div>`
                    modalFooter.innerHTML = `<button type="button" class="btn btn-warning entregarManualmente">Entregar manualmente</button>
                                             <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`
                }
            }

            //btn entregar requisição
            let btnEntregarManualmente = document.getElementsByClassName("entregarManualmente")
            for (let j = 0; j < btnEntregarManualmente.length; j++) {
                btnEntregarManualmente[j].addEventListener("click", function () {
                    for (let k in requisicoes) {
                        if (requisicoes[k].id === idRequisicao) {
                            modalTitulo.innerHTML = "A entregar " + Livro.getTituloById(requisicoes[k].idLivro)
                            modalBody.innerHTML = `Escolha uma biblioteca para entregar o livro:
                                                   <div id="mapa"></div>`
                            gerarMapaBibliotecas(requisicoes[k].idUtilizador, requisicoes[k].idLivro)
                            modalFooter.innerHTML = '<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>'
                        }
                    }
                })
            }
        })
    }
}

function gerarTabelaRequisicoesEntregues() {
    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Utilizador</th>
                        <th>Livro</th>
                        <th>Data de requisição</th>
                        <th>Data de entrega</th>
                        <th></th>
                    </tr>
                </thead>`

    let count = 0

    for (let i in requisicoes) {
        if (requisicoes[i].dataEntrega) {
            str += `<tr id="${requisicoes[i].id}">
                        <td>${count + 1}</td>
                        <td>${Utilizador.getNomeById(requisicoes[i].idUtilizador)}</td>
                        <td>${Livro.getTituloById(requisicoes[i].idLivro)}</td>
                        <td>${dataToString(requisicoes[i].dataRequisicao)}</td>
                        <td>${dataToString(requisicoes[i].dataEntrega)}</td>                    
                        <td>
                            <button type="button" class="btn btn-primary infoRequisicaoEntregue" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
                        </td>
                    </tr>`
            count++
        }
    }
    document.getElementById("totalRequisicoesEntregues").innerHTML = "Requisições entregues (" + count + ")"
    document.getElementById("tabelaRequisicoesEntregues").innerHTML = str

    //btn info requisicao entregue
    let btnInfoRequisicaoEntregue = document.getElementsByClassName("infoRequisicaoEntregue")
    for (let i = 0; i < btnInfoRequisicaoEntregue.length; i++) {
        btnInfoRequisicaoEntregue[i].addEventListener("click", function () {
            let idRequisicao = parseInt(btnInfoRequisicaoEntregue[i].parentNode.parentNode.id)
            for (let j in requisicoes) {
                if (requisicoes[j].dataEntrega && requisicoes[j].id === idRequisicao) {
                    modalTitulo.innerHTML = "Informações sobre a requisição"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <div class="text-center">
                                                    <img src="${Livro.getUrlCapaById(requisicoes[j].idLivro)}" class="img-fluid img-thumbnail" style="height:300px;">                            
                                                </div>
                                                <br>
                                                <p><b>ID:</b> ${requisicoes[j].id}</p>
                                                <p><b>Utilizador (ID):</b> ${Utilizador.getNomeById(requisicoes[j].idUtilizador)} (${requisicoes[j].idUtilizador})</p>
                                                <p><b>Livro (ID):</b> ${Livro.getTituloById(requisicoes[j].idLivro)} (${requisicoes[j].idLivro})</p>
                                                <p><b>Data de requisição:</b> ${dataToString(requisicoes[j].dataRequisicao)}</p>
                                                <p><b>Data limite de entrega:</b> ${dataToString(obterData(requisicoes[j].calcularDataLimiteEntrega()))}</p>
                                                <p><b>Data de entrega:</b> ${dataToString(requisicoes[j].dataEntrega)}</p>
                                            </div>`
                    modalFooter.innerHTML = `<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`
                }
            }
        })
    }
}

function gerarMapaBibliotecas(idUtilizador, idLivro) {
    let map
    let mapaBibliotecas = document.getElementById("mapa")
    mapaBibliotecas.style.height = "650px"

    let mapProp = {
        center: new google.maps.LatLng(41.366174, -8.7396931),
        zoom: 10,
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
                                if (Utilizador.getMultaById(idUtilizador)) {
                                    swal("Multa em dívida.", `Tem uma multa de €${Utilizador.getMultaById(idUtilizador)}. Dirija-se à biblioteca de ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)}, ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} para entregar o livro.`, "warning")
                                } else {
                                    swal("Livro entregue.", `Dirija-se à biblioteca de ${Biblioteca.getConcelhoFreguesiaById(idBiblioteca)[1]}, ${Biblioteca.getConcelhoFreguesiaById(idBiblioteca)[0]} para entregar o livro.`, "warning")
                                }
                                Requisicao.entregarLivroByIdUtilizadorIdLivro(idUtilizador, idLivro)
                                for (let l in livros) {
                                    if (livros[l].id === idLivro) {
                                        livros[l].idBiblioteca = idBiblioteca
                                        //atualiza a key
                                        localStorage.setItem("livros", JSON.stringify(livros))
                                    }
                                }
                                gerarTabelaRequisicoesAtivas()
                                gerarTabelaRequisicoesEntregues()
                            })
                        }
                    })
                }
            }
        }
    }
}