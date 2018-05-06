window.onload = function () {
    //importar variáveis do sessionStorage
    generos = JSON.parse(localStorage.getItem("generos"))
    transformarEmInstanciaGenero(generos)
    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    gerarTabelaGeneros()

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

}


function gerarTabelaGeneros() {
    //atualizar total
    let totalGeneros = document.getElementById("totalGeneros")
    totalGeneros.innerHTML = "Lista de géneros - " + generos.length

    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th><i class="fa fa-id-card"></i> ID</th>
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
                    <td class="pull-right">
                        <button type="button" class="btn btn-primary infoGenero" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaGeneros").innerHTML = str

    //btn info utilizador
    let btnInfoUtilizador = document.getElementsByClassName("infoUtilizador")
    for (let i = 0; i < btnInfoUtilizador.length; i++) {
        btnInfoUtilizador[i].addEventListener("click", function () {
            let idUtilizador = parseInt(btnInfoUtilizador[i].parentNode.parentNode.id)
            for (let j in utilizadores) {
                if (utilizadores[j].id === idUtilizador) {
                    modalTitulo.innerHTML = "Informações sobre o utilizador"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <div class="text-center">
                                                    <img src="${utilizadores[j].urlFoto}" alt="${utilizadores[j].nome}" class="img-fluid img-thumbnail" style="width: 150px; height: 150px; border-radius: 50%;">                            
                                                </div>
                                                <br>
                                                <p><b>ID:</b> ${utilizadores[j].id}</p>
                                                <p><b>Nome:</b> ${utilizadores[j].nome}</p>
                                                <p><b>Email:</b> ${utilizadores[j].email}</p>
                                                <p><b>Password:</b> ${utilizadores[j].password}</p> 
                                                <p><b>Valor multa:</b> € ${utilizadores[j].multa}</p>
                                                <p><b>Número de requisições:</b> ${Requisicao.quantidadeRequisicoesByIdUtilizador(utilizadores[j].id)}</p> 
                                                <p><b>Livros requisitados:</b> ${Requisicao.livrosRequisitadosByIdUtilizador(utilizadores[j].id).join(" / ")}</p>
                                                <p><b>Tipo de acesso:</b> ${Utilizador.tipoAcessoToString(utilizadores[j].tipoAcesso)}</p>                      
                                            </div>`
                    modalFooter.innerHTML = `<button type="button" class="btn btn-danger remover">Remover utilizador</button>
                                             <button type="button" class="btn btn-warning editar">Editar perfil</button>
                                             <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`
                }
            }

            //btn remover utilizador
            let btnRemoverUtilizador = document.getElementsByClassName("remover")
            for (let j = 0; j < btnRemoverUtilizador.length; j++) {
                btnRemoverUtilizador[j].addEventListener("click", function () {
                    if (idUtilizador === idUtilizadorLogado) {
                        swal("Erro!", "Impossível remover o próprio perfil.", "error");
                    } else {
                        swal({
                            title: "Deseja mesmo remover?",
                            text: `O utilizador ${Utilizador.getNomeById(idUtilizador)} e todo o seu perfil será removido para sempre!`,
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        }).then((willDelete) => {
                            if (willDelete) {
                                swal(`O utilizador ${Utilizador.getNomeById(idUtilizador)} foi removido com sucesso.`, {
                                    icon: "success",
                                });
                                $("#modal").modal('hide')
                                Utilizador.removerUtilizadorById(idUtilizador)
                                localStorage.setItem("utilizadores", JSON.stringify(utilizadores))

                                atualizarPercentagens()
                                gerarTabelaUtilizadores()
                            }
                        });
                    }
                })
            }

            //btn editar utilizador
            let btnEditarUtilizador = document.getElementsByClassName("editar")
            for (let j = 0; j < btnEditarUtilizador.length; j++) {
                btnEditarUtilizador[j].addEventListener("click", function () {
                    if (idUtilizador === idUtilizadorLogado) {
                        swal("Erro!", "Impossível editar o próprio perfil.", "error");
                    } else {
                        for (let k in utilizadores) {
                            if (utilizadores[k].id === idUtilizador) {
                                modalTitulo.innerHTML = "A editar " + utilizadores[k].nome
                                modalBody.innerHTML = `<div class="container-fluid">
                                                            <div class="text-center">
                                                                <img src="${utilizadores[k].urlFoto}" alt="${utilizadores[k].nome}" class="img-fluid img-thumbnail" style="width: 150px; height: 150px; border-radius: 50%;">                            
                                                            </div>
                                                            <br>
                                                            <form class="form-horizontal" id="formAdmEditarUtilizador">
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarId">ID</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarId" type="text" class="form-control" required readonly value="${utilizadores[k].id}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarNome">Nome *</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarNome" type="text" class="form-control" required value="${utilizadores[k].nome}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarEmail">Email *</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarEmail" type="email" class="form-control" required value="${utilizadores[k].email}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarPassword">Password *</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarPassword" type="text" class="form-control" required value="${utilizadores[k].password}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarFoto">URL foto</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarFoto" type="text" class="form-control" value="${utilizadores[k].urlFoto}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarMulta">Multa *</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarMulta" type="number" min="0" class="form-control" required value="${utilizadores[k].multa}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarNumeroRequisicoes">Número de requisições</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarNumeroRequisicoes" type="number" class="form-control" required readonly value="${Requisicao.quantidadeRequisicoesByIdUtilizador(utilizadores[k].id)}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label" for="inputAdmUtilizadorEditarLivrosRequisitados">Livros requisitados</label>
                                                                    <div class="col-sm-9">
                                                                        <input id="inputAdmUtilizadorEditarLivrosRequisitados" type="text" class="form-control" required readonly value="${Requisicao.livrosRequisitadosByIdUtilizador(utilizadores[k].id).join(" / ")}">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label">Tipo acesso *</label>
                                                                    <label class="radio-inline col-xl-1 col-lg-2 col-12">
                                                                        <input type="radio" class="radio-inline-input-editar" name="editar" value="2">Utilizador
                                                                    </label>
                                                                    <label class="radio-inline col-xl-1 col-lg-2 col-12">
                                                                        <input type="radio" class="radio-inline-input-editar" name="editar" value="1">Operador
                                                                    </label>
                                                                    <label class="radio-inline col-xl-1 col-lg-2 col-12">
                                                                        <input type="radio" class="radio-inline-input-editar" name="editar" value="0">Administrador
                                                                    </label>
                                                                </div>
                                                                <input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
                                                                <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
                                                            </form>                                  
                                                        </div>`
                                let editarTipoAcesso = document.getElementsByClassName("radio-inline-input-editar")
                                for (let l = 0; l < editarTipoAcesso.length; l++) {
                                    if (Utilizador.getTipoAcessoById(idUtilizador) === parseInt(editarTipoAcesso[l].value)) {
                                        editarTipoAcesso[l].checked = true
                                    }
                                }
                                modalFooter.innerHTML = ""

                                //form editar
                                let formAdmEditarUtilizador = document.getElementById("formAdmEditarUtilizador")
                                formAdmEditarUtilizador.addEventListener("submit", function (event) {
                                    let inputAdmUtilizadorEditarEmail = document.getElementById("inputAdmUtilizadorEditarEmail")

                                    if (Utilizador.getIdByEmail(inputAdmUtilizadorEditarEmail.value) === -1 || (Utilizador.getIdByEmail(inputAdmUtilizadorEditarEmail.value) === utilizadores[k].id && Utilizador.getIdByEmail(inputAdmUtilizadorEditarEmail.value) !== -1)) { //caso não exista nenhum utilizador com o email indicado
                                        let inputAdmUtilizadorEditarNome = document.getElementById("inputAdmUtilizadorEditarNome")
                                        let inputAdmUtilizadorEditarPassword = document.getElementById("inputAdmUtilizadorEditarPassword")
                                        let inputAdmUtilizadorEditarFoto = document.getElementById("inputAdmUtilizadorEditarFoto")
                                        let inputAdmUtilizadorEditarMulta = document.getElementById("inputAdmUtilizadorEditarMulta")

                                        utilizadores[k].nome = inputAdmUtilizadorEditarNome.value
                                        utilizadores[k].email = inputAdmUtilizadorEditarEmail.value
                                        utilizadores[k].password = inputAdmUtilizadorEditarPassword.value
                                        utilizadores[k].urlFoto = inputAdmUtilizadorEditarFoto.value
                                        utilizadores[k].multa = parseInt(inputAdmUtilizadorEditarMulta.value)

                                        //radio btns tipo de acesso                           
                                        for (let l = 0; l < editarTipoAcesso.length; l++) {
                                            if (editarTipoAcesso[l].checked) {
                                                utilizadores[k].tipoAcesso = parseInt(editarTipoAcesso[l].value)
                                            }
                                        }

                                        //atualizar a key do localStorage
                                        localStorage.setItem("utilizadores", JSON.stringify(utilizadores))

                                        swal("Utilizador editado!", `O utilizador com o id ${utilizadores[k].id} dado pelo nome de ${utilizadores[k].nome} foi editado com sucesso.`, "success");
                                        gerarTabelaUtilizadores()
                                        $("#modal").modal("hide")
                                    } else { //caso exista um utilizador com o mesmo email indicado
                                        swal("Erro!", `O email ${inputAdmUtilizadorEditarEmail.value} já está em uso.`, "error");
                                    }

                                    event.preventDefault()
                                })
                            }
                        }
                    }
                })
            }
        })
    }
}