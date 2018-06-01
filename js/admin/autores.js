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

    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
    transformarEmInstanciaBiblioteca(bibliotecas)

    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //menu
    gerarMenu(Utilizador.getTipoAcessoById(idUtilizadorLogado), "autoresMenu")

    gerarTabelaAutores()

    //form adicionar género
    let formAutor = document.getElementById("formAutor")
    let inputAdicionarNome = document.getElementById("inputAdicionarNome")
    let inputAdicionarDescricao = document.getElementById("inputAdicionarDescricao")
    let inputAdicionarFoto = document.getElementById("inputAdicionarFoto")
    let btnResetAutor = document.getElementById("btnResetAutor")

    formAutor.addEventListener("submit", function (event) {
        autores.push(new Autor(inputAdicionarNome.value, inputAdicionarDescricao.value, inputAdicionarFoto.value))
        localStorage.setItem("autores", JSON.stringify(autores))
        swal("Autor adicionado!", `Foi adicionado o autor ${inputAdicionarNome.value} com o id ${Autor.getUltimoId()}.`, "success");
        formAutor.reset()
        gerarTabelaAutores()
        event.preventDefault()
    })

    btnResetAutor.addEventListener("click", function () {
        inputAdicionarNome.focus()
    })

} //fim onload

function gerarTabelaAutores() {
    //atualizar total
    let totalAutores = document.getElementById("totalAutores")
    totalAutores.innerHTML = "Lista de autores - " + autores.length

    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Livros publicados</th>
                        <th>Descrição</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in autores) {
        str += `<tr id="${autores[i].id}">
                    <td>${count}</td>
                    <td><a href="../autor.html" class="autor${autores[i].id} clicarAutor">${autores[i].nome}</a></td>
                    <td>${autores[i].getLivrosPublicados().join(", ")}</td>                    
                    <td>${autores[i].descricao}</td>                    
                    <td align="right">
                        <button type="button" class="btn btn-warning editarAutor" data-toggle="modal" data-target="#modal"><i class="fa fa-edit"></i></button>                    
                    </td>
                    <td align="right">
                        <button type="button" class="btn btn-danger removerAutor"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaAutores").innerHTML = str
    autorClicado()
    
    //btn editar autor
    let btnEditarAutor = document.getElementsByClassName("editarAutor")
    for (let i = 0; i < btnEditarAutor.length; i++) {
        btnEditarAutor[i].addEventListener("click", function () {
            let idAutor = parseInt(btnEditarAutor[i].parentNode.parentNode.id)
            for (let j in autores) {
                if (autores[j].id === idAutor) {
                    modalTitulo.innerHTML = "Editar autor"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <div class="text-center">
                                                    <img src="${autores[j].urlFoto}" title="${autores[j].nome}" class="img-fluid img-thumbnail" style="width: 150px; height: 150px; border-radius: 50%;">                            
                                                </div>
                                                <br>
                                                <form class="form-horizontal" id="formEditar">
                                                    <div class="form-group">
                                                        <label class="col-sm-3 control-label" for="inputEditarId">ID</label>
                                                        <div class="col-sm-9">
                                                            <input id="inputEditarId" type="number" class="form-control" required readonly value="${autores[j].id}">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-sm-3 control-label" for="inputEditarNome">Nome *</label>
                                                        <div class="col-sm-9">
                                                            <input id="inputEditarNome" type="text" class="form-control" required value="${autores[j].nome}">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-sm-3 control-label" for="inputEditarDescricao">Descrição *</label>
                                                        <div class="col-sm-9">
                                                            <textarea id="inputEditarDescricao" class="form-control" rows="5" style="resize: vertical; min-height: 48px; max-height: 150px;" required>${autores[j].descricao}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-md-3 control-label" for="inputEditarFoto">URL foto</label>
                                                        <div class="col-md-9">
                                                            <input id="inputEditarFoto" type="text" class="form-control" value="${autores[j].urlFoto}">
                                                        </div>
                                                    </div>
                                                    <input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
                                                    <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
                                                </form>                                  
                                            </div>`
                    modalFooter.innerHTML = ""

                    //form editar
                    let formEditar = document.getElementById("formEditar")
                    let inputEditarNome = document.getElementById("inputEditarNome")
                    let inputEditarDescricao = document.getElementById("inputEditarDescricao")
                    let inputEditarFoto = document.getElementById("inputEditarFoto")

                    inputEditarFoto.addEventListener("change", function () {
                        document.querySelectorAll(`img[title="${autores[j].nome}"]`)[0].src = inputEditarFoto.value
                    })

                    formEditar.addEventListener("submit", function (event) {
                        autores[j].nome = inputEditarNome.value
                        autores[j].descricao = inputEditarDescricao.value
                        autores[j].urlFoto = inputEditarFoto.value

                        //atualizar a key do localStorage
                        localStorage.setItem("autores", JSON.stringify(autores))

                        swal("Autor editado!", `O autor cujo id é ${autores[j].id} foi editado com sucesso.`, "success");
                        gerarTabelaAutores()
                        $("#modal").modal("hide")

                        event.preventDefault()
                    })
                }
            }
        })
    }

    //btn remover autor
    let btnRemoverAutor = document.getElementsByClassName("removerAutor")
    for (let i = 0; i < btnRemoverAutor.length; i++) {
        btnRemoverAutor[i].addEventListener("click", function () {
            let idAutor = parseInt(btnRemoverAutor[i].parentNode.parentNode.id)
            let livrosDependentes = Livro.getTitulosByIdAutor(idAutor)
            if (livrosDependentes.length === 0) {
                swal({
                    title: "Deseja mesmo remover?",
                    text: `O autor ${Autor.getNomeById(idAutor)} será removido para sempre!`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal(`O autor ${Autor.getNomeById(idAutor)} foi removido com sucesso.`, {
                            icon: "success",
                        });
                        $("#modal").modal('hide')
                        Autor.removerAutorById(idAutor)
                        //atualiza localstorage
                        localStorage.setItem("autores", JSON.stringify(autores))

                        gerarTabelaAutores()
                    }
                });
            } else {
                let palavras = (livrosDependentes.length === 1) ? ["Existe ", " livro", "Remova o livro em questão ou altere o(s) autor(es) deste."] : ["Existem ", " livros", "Remova os livros em questão ou altere o(s) autor(es) destes."]
                swal("Impossível remover!", `${palavras[0] + livrosDependentes.length + palavras[1]} cujo autor é ${Autor.getNomeById(idAutor)}:\n${livrosDependentes.join(", ")}.\n\n${palavras[2]}`, "error")
            }

        })
    }
}