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

    requisicoes = JSON.parse(localStorage.getItem("requisicoes"))
    transformarEmInstanciaRequisicao(requisicoes)

    testemunhos = JSON.parse(localStorage.getItem("testemunhos"))
    transformarEmInstanciaTestemunho(testemunhos)

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

    //testemunhos
    gerarTestemunhos()
    
    let formTestemunho = document.getElementById("formTestemunho")
    formTestemunho.addEventListener("submit", function(event) {
        let inputTestemunho = document.getElementById("inputTestemunho")
        testemunhos.push(new Testemunho(inputTestemunho.value, idUtilizadorLogado, 0))
        //atualiza a key
        localStorage.setItem("testemunhos", JSON.stringify(testemunhos))
        swal("Testemunho submetido", "Obrigado por deixar a sua opinião! O seu testemunho passará por aprovação de um administrador.", "success")
        $("#modal").modal("hide")
        gerarTestemunhos()
        event.preventDefault()
    })

    let btnTestemunho = document.getElementById("btnTestemunho")
    btnTestemunho.addEventListener("click", function () {
        if (Utilizador.getTipoAcessoById(idUtilizadorLogado) !== 2) {
            swal("Erro", "Apenas utilizadores podem testemunhar.", "error")
        } else {
            if (!Requisicao.getIdsRequisicoesEntreguesByIdUtilizador(idUtilizadorLogado).length) {
                swal("Erro", "Para testemunhar precisa ter lido pelo menos 1 livro.", "error")
            } else {
                if(Testemunho.getIdByIdUtilizador(idUtilizadorLogado) !== -1) {
                    swal("Erro", "Já deixou o seu testemunho sobre a aplicação.", "error")
                } else {
                    formTestemunho.reset()
                    $("#modal").modal("show")
                }
            }
        }
    })

} //fim onload

function gerarTestemunhos() {
    let str = `<h4 class="text-teca4 text-center mt-5">Testemunhos 
                    <button type="button" title="Deixe o seu testemunho sobre a aplicação." id="btnTestemunho" class="btn btn-teca2 border border-teca4" style="color: #92CDCF">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                </h4>
               <div class="row justify-content-between">`
    let count
    let testemunhosAleatorios = Testemunho.getIdTestemunhosAleatorios()
    for (let i in testemunhosAleatorios) {
        for (let j in testemunhos) {
            if (testemunhos[j].id === testemunhosAleatorios[i]) {
                if (testemunhos[j].estado) {
                    let foto = (Utilizador.getUrlFotoById(testemunhos[j].idUtilizador) === "img/perfil.png") ? "../img/perfil.png" : Utilizador.getUrlFotoById(testemunhos[j].idUtilizador)
                    str += `<div class="container px-4 testemunho mt-5 col-xl-5 col-lg-10 col-md-10">
                                <div class="foto-testemunho text-center">
                                    <img class="img-thumbnail" src="${foto}">
                                </div>
                                <div class="texto-testemunho bg-teca3 py-3 px-5 text-white mt-3">
                                    <div class="texto-corpo">${testemunhos[j].testemunho}</div>
                                    <br>
                                    <div class="text-right">${Utilizador.getNomeById(testemunhos[j].id)}</div>
                                </div>
                            </div>`
                    count++
                }
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

    str += "</div>"
    document.getElementById("testemunhos").innerHTML = str
}