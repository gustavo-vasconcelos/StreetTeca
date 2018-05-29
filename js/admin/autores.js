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
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in autores) {
        str += `<tr id="${autores[i].id}">
                    <td>${count}</td>
                    <td>${autores[i].nome}</td>
                    <td>${autores[i].getLivrosPublicados().join(", ")}</td>                    
                    <td align="right">
                        <button type="button" class="btn btn-warning editarAutor" data-toggle="modal" data-target="#modal"><i class="fa fa-edit"></i></button>                    
                        <button type="button" class="btn btn-danger removerAutor"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaAutores").innerHTML = str

    //btn editar género
    let btnEditarGenero = document.getElementsByClassName("editarGenero")
    for (let i = 0; i < btnEditarGenero.length; i++) {
        btnEditarGenero[i].addEventListener("click", function () {
            let idGenero = parseInt(btnEditarGenero[i].parentNode.parentNode.id)
            for (let j in generos) {
                if (generos[j].id === idGenero) {
                    modalTitulo.innerHTML = "Editar género"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <form class="form-horizontal" id="formGeneroEditar">
                                                    <div class="form-group">
                                                        <label class="col-sm-3 control-label" for="inputGeneroEditarId">ID</label>
                                                        <div class="col-sm-9">
                                                            <input id="inputGeneroEditarId" type="text" class="form-control" required readonly value="${generos[j].id}">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-sm-3 control-label" for="inputGeneroEditarNome">Nome</label>
                                                        <div class="col-sm-9">
                                                            <input id="inputGeneroEditarNome" type="text" class="form-control" required value="${generos[j].nome}">
                                                        </div>
                                                    </div>
                                                    <input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
                                                    <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
                                                </form>                                  
                                            </div>`
                    modalFooter.innerHTML = ""

                    //form editar
                    let formGeneroEditar = document.getElementById("formGeneroEditar")
                    let inputGeneroEditarNome = document.getElementById("inputGeneroEditarNome")
                    formGeneroEditar.addEventListener("submit", function (event) {
                        if (Genero.getIdByNome(inputGeneroEditarNome.value) === -1 || (Genero.getIdByNome(inputGeneroEditarNome.value) === generos[j].id && Genero.getIdByNome(inputGeneroEditarNome.value) !== -1)) { //caso não exista nenhum género com o nome indicado
                            generos[j].nome = inputGeneroEditarNome.value

                            //atualizar a key do localStorage
                            localStorage.setItem("generos", JSON.stringify(generos))

                            swal("Género editado!", `O género com o id ${generos[j].id} foi editado com sucesso.`, "success");
                            gerarTabelaGeneros()
                            $("#modal").modal("hide")
                        } else { //caso exista um género com o mesmo email indicado
                            swal("Erro!", `O género ${inputGeneroEditarNome.value} já está em uso.`, "error");
                        }

                        event.preventDefault()
                    })
                }
            }
        })
    }

    //btn remover género
    let btnRemoverGenero = document.getElementsByClassName("removerGenero")
    for (let i = 0; i < btnRemoverGenero.length; i++) {
        btnRemoverGenero[i].addEventListener("click", function () {
            let idGenero = parseInt(btnRemoverGenero[i].parentNode.parentNode.id)
            let livrosDependentes = Livro.getTitulosByIdGenero(idGenero)
            if (livrosDependentes.length === 0) {
                swal({
                    title: "Deseja mesmo remover?",
                    text: `O género ${Genero.getNomeById(idGenero)} será removido para sempre!`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal(`O género ${Genero.getNomeById(idGenero)} foi removido com sucesso.`, {
                            icon: "success",
                        });
                        $("#modal").modal('hide')
                        Genero.removerGeneroById(idGenero)
                        Livro.removerLivrosByIdGenero(idGenero)
                        //atualiza localstorage
                        localStorage.setItem("generos", JSON.stringify(generos))
                        localStorage.setItem("livros", JSON.stringify(livros))

                        gerarTabelaGeneros()
                    }
                });
            } else {
                let palavras = (livrosDependentes.length === 1) ? ["Existe ", " livro", "Remova o livro em questão ou altere o género deste."] : ["Existem ", " livros", "Remova os livros em questão ou altere o género destes."]
                swal("Impossível remover!", `${palavras[0] + livrosDependentes.length + palavras[1]} com o género ${Genero.getNomeById(idGenero)}:\n${livrosDependentes.join(", ")}.\n\n${palavras[2]}`, "error")
            }

        })
    }
}