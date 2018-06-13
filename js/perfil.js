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

    //gerar info sobre o utilizador
    gerarInfo()


} //fim onload

function gerarInfo() {
    let str = `<h4 class="text-teca4 text-center">O MEU PERFIL</h4>
               <div class="row">`
    for (let i in utilizadores) {
        if (utilizadores[i].id === idUtilizadorLogado) {
            str += `<div class="col-lg-5 col-md-8 col-sm-20 col-20 mt-2 text-center">
                        <div class="foto-testemunho text-center">
                            <img class="img-thumbnail" src="../${utilizadores[i].urlFoto}">
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
                                    <div class="col-lg-17 col-md-16 col-20 font-weight-bold">${utilizadores[i].dataToString()}</div>
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
                                                        <input required autofocus type="text" class="form-control" id="inputEditarEmail" value="${utilizadores[i].email}">
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
                                                        <input autofocus type="text" class="form-control" id="inputEditarUrlFoto" value="${urlFoto}">
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
                                                        <textarea id="inputEditarBiografia" class="form-control" rows="5" required style="resize: vertical; min-height: 48px; max-height: 150px;"></textarea>
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <input type="submit" class="col-10 btn btn-teca3" value="Confirmar">                                                
                                                </div>
                                            </form>                                  
                                        </div>`

                let inputBiografia = document.getElementById("inputEditarBiografia")

                if (utilizadores[i].biografia === "Escreva algo sobre si...") {
                    inputBiografia.placeholder = "Escreva algo sobre si..."
                } else {
                    inputBiografia.innerHTML = "Escreva algo sobre si..."
                }
            }
        }
        modalFooter.innerHTML = ""

        let inputEditarUrlFoto = document.getElementById("inputEditarUrlFoto")
        inputEditarUrlFoto.addEventListener("change", function () {
            document.getElementById("fotoEditar").src = (!inputEditarUrlFoto.value) ? "../img/perfil.png" : inputEditarUrlFoto.value
        })
    })
}