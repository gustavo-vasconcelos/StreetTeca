window.onload = function () {
    //importar variáveis do sessionStorage
    generos = JSON.parse(localStorage.getItem("generos"))
    transformarEmInstanciaGenero(generos)

    livros = JSON.parse(localStorage.getItem("livros"))
    transformarEmInstanciaLivro(livros)

    tags = JSON.parse(localStorage.getItem("tags"))
    transformarEmInstanciaTag(tags)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))


    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //gerar tabelas
    gerarTabelaGeneros()
    gerarTabelaTags()

    //form adicionar género
    let formGenero = document.getElementById("formGenero")
    let inputGeneroNome = document.getElementById("inputGeneroNome")
    let btnResetGeneros = document.getElementById("btnResetGeneros")

    formGenero.addEventListener("submit", function (event) {
        if (Genero.getIdByNome(inputGeneroNome.value) !== -1) {
            swal("Erro!", `Já existe um género com o mesmo nome.`, "error");
        } else {
            generos.push(new Genero(inputGeneroNome.value))
            localStorage.setItem("generos", JSON.stringify(generos))
            swal("Género adicionado!", `Foi adicionado o género ${inputGeneroNome.value} com o id ${Genero.getUltimoId()}.`, "success");
            formGenero.reset()
            gerarTabelaGeneros()
        }

        event.preventDefault()
    })

    btnResetGeneros.addEventListener("click", function () {
        inputGeneroNome.focus()
    })


    //form adicionar tag
    let formTag = document.getElementById("formTag")
    let inputTagNome = document.getElementById("inputTagNome")
    let btnResetTags = document.getElementById("btnResetTags")

    formTag.addEventListener("submit", function (event) {
        if(inputTagNome.value.indexOf(" ") !== -1) {
            swal("Erro!", "Uma tag deve ser constituída por apenas uma palavra.", "error")
        } else {
            if (Tag.getIdByNome(inputTagNome.value) !== -1) {
                swal("Erro!", `Já existe uma tag com o mesmo nome.`, "error");
            } else {
                tags.push(new Tag(inputTagNome.value))
                localStorage.setItem("tags", JSON.stringify(tags))
                swal("Tag adicionada!", `Foi adicionada a tag ${inputTagNome.value.toLowerCase()} com o id ${Tag.getUltimoId()}.`, "success");
                formTag.reset()
                gerarTabelaTags()
            }
        }
            
        event.preventDefault()
    })

    btnResetTags.addEventListener("click", function () {
        inputTagNome.focus()
    })
}


function gerarTabelaGeneros() {
    //atualizar total
    let totalGeneros = document.getElementById("totalGeneros")
    totalGeneros.innerHTML = "Lista de géneros - " + generos.length

    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th><i class="fa fa-barcode"></i> ID</th>
                        <th><i class="fa fa-list-alt"></i> Nome</th>
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in generos) {
        str += `<tr id="${generos[i].id}">
                    <td>${count}</td>
                    <td>${generos[i].id}</td>
                    <td>${generos[i].nome}</td>                    
                    <td align="right">
                        <button type="button" class="btn btn-warning editarGenero" data-toggle="modal" data-target="#modal"><i class="fa fa-edit"></i></button>                    
                        <button type="button" class="btn btn-danger removerGenero"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaGeneros").innerHTML = str

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
                    formGeneroEditar.addEventListener("submit", function(event) {
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
        btnRemoverGenero[i].addEventListener("click", function() {
            let idGenero = parseInt(btnRemoverGenero[i].parentNode.parentNode.id)
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
        })
    }
}

function gerarTabelaTags() {
    //atualizar total
    let totalTags = document.getElementById("totalTags")
    totalTags.innerHTML = "Lista de tags - " + tags.length

    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th><i class="fa fa-barcode"></i> ID</th>
                        <th><i class="fa fa-list-alt"></i> Nome</th>
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in tags) {
        str += `<tr id="${tags[i].id}">
                    <td>${count}</td>
                    <td>${tags[i].id}</td>
                    <td>${tags[i].nome}</td>                    
                    <td align="right">
                        <button type="button" class="btn btn-warning editarTag" data-toggle="modal" data-target="#modal"><i class="fa fa-edit"></i></button>                    
                        <button type="button" class="btn btn-danger removerTag"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaTags").innerHTML = str

    //btn editar género
    let btnEditarTag = document.getElementsByClassName("editarTag")
    for (let i = 0; i < btnEditarTag.length; i++) {
        btnEditarTag[i].addEventListener("click", function () {
            let idTag = parseInt(btnEditarTag[i].parentNode.parentNode.id)
            for (let j in tags) {
                if (tags[j].id === idTag) {
                    modalTitulo.innerHTML = "Editar tag"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <form class="form-horizontal" id="formTagEditar">
                                                    <div class="form-group">
                                                        <label class="col-sm-3 control-label" for="inputTagEditarId">ID</label>
                                                        <div class="col-sm-9">
                                                            <input id="inputTagEditarId" type="text" class="form-control" required readonly value="${tags[j].id}">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-sm-3 control-label" for="inputTagEditarNome">Nome</label>
                                                        <div class="col-sm-9">
                                                            <input id="inputTagEditarNome" type="text" class="form-control" required value="${tags[j].nome}">
                                                        </div>
                                                    </div>
                                                    <input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
                                                    <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
                                                </form>                                  
                                            </div>`
                    modalFooter.innerHTML = ""

                    //form editar
                    let formTagEditar = document.getElementById("formTagEditar")
                    let inputTagEditarNome = document.getElementById("inputTagEditarNome")                    
                    formTagEditar.addEventListener("submit", function(event) {
                        if (Tag.getIdByNome(inputTagEditarNome.value) === -1 || (Tag.getIdByNome(inputTagEditarNome.value) === tags[j].id && Tag.getIdByNome(inputTagEditarNome.value) !== -1)) { //caso não exista nenhuma tag com o nome indicado
                            tags[j].nome = inputTagEditarNome.value

                            //atualizar a key do localStorage
                            localStorage.setItem("tags", JSON.stringify(tags))

                            swal("Tag editada!", `A tag com o id ${tags[j].id} foi editada com sucesso.`, "success");
                            gerarTabelaTags()
                            $("#modal").modal("hide")
                        } else { //caso exista um género com o mesmo email indicado
                            swal("Erro!", `A tag ${inputTagEditarNome.value} já está em uso.`, "error");
                        }

                        event.preventDefault()
                    })
                }
            }
        })
    }

    //btn remover tag
    let btnRemoverTag = document.getElementsByClassName("removerTag")
    for (let i = 0; i < btnRemoverTag.length; i++) {
        btnRemoverTag[i].addEventListener("click", function() {
            let idTag = parseInt(btnRemoverTag[i].parentNode.parentNode.id)
            swal({
                title: "Deseja mesmo remover?",
                text: `A tag ${Tag.getNomeById(idTag)} será removida para sempre!`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    swal(`A tag ${Tag.getNomeById(idTag)} foi removida com sucesso.`, {
                        icon: "success",
                    });
                    $("#modal").modal('hide')
                    Tag.removerTagById(idTag)
                    //atualiza localstorage
                    localStorage.setItem("tags", JSON.stringify(tags))

                    gerarTabelaTags()
                }
            });
        })
    }
}