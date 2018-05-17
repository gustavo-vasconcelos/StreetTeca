window.onload = function () {
    //importar variáveis do sessionStorage
    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)
    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //atualiza as percentagens de utilizadores
    atualizarPercentagens()

    //modal
    let modalTitulo = document.getElementById("modalTitulo")
    let modalBody = document.getElementById("modalTitulo")
    let modalFooter = document.getElementById("modalTitulo")

    //form adicionar utilizador
    let frmAdmUtilizador = document.getElementById("frmAdmUtilizador")
    let inputAdmUtilizadorNome = document.getElementById("inputAdmUtilizadorNome")
    let inputAdmUtilizadorEmail = document.getElementById("inputAdmUtilizadorEmail")
    let inputAdmUtilizadorPassword = document.getElementById("inputAdmUtilizadorPassword")
    let inputAdmUtilizadorFoto = document.getElementById("inputAdmUtilizadorFoto")

    frmAdmUtilizador.addEventListener("submit", function (event) {
        //caso nenhum utilizador esteja registado com o mesmo email
        if (Utilizador.getIdByEmail(inputAdmUtilizadorEmail.value) === -1) {
            let inputAdmUtilizadorTipoAcesso = document.getElementsByClassName("radio-inline-input")
            let tipoAcesso
            for (let i in inputAdmUtilizadorTipoAcesso) {
                if (inputAdmUtilizadorTipoAcesso[i].checked) {
                    tipoAcesso = parseInt(inputAdmUtilizadorTipoAcesso[i].value)
                }
            }

            utilizadores.push(new Utilizador(inputAdmUtilizadorNome.value, inputAdmUtilizadorEmail.value, inputAdmUtilizadorPassword.value, inputAdmUtilizadorFoto.value, tipoAcesso))

            localStorage.setItem("utilizadores", JSON.stringify(utilizadores))

            swal("Utilizador adicionado!", `O utilizador com o id ${Utilizador.getUltimoId()} dado pelo nome de ${inputAdmUtilizadorNome.value} foi adicionado com sucesso.`, "success");
            atualizarPercentagens()
            gerarTabelaUtilizadores()
            frmAdmUtilizador.reset()
        } else { //caso haja um utilizador com o mesmo email
            swal("Erro!", "Já existe um utilizador registado com o mesmo email.", "error")
        }


        event.preventDefault()
    })

    let btnResetUtilizadores = document.getElementById("btnResetUtilizadores")
    btnResetUtilizadores.addEventListener("click", function () {
        inputAdmUtilizadorNome.focus()
    })

    //gerar tabela
    gerarTabelaUtilizadores()
} //fim window.onload

function atualizarPercentagens() {
    //total utilizadores
    let totalUtilizadores = document.getElementById("totalUtilizadores")
    totalUtilizadores.innerHTML = "Total de utilizadores - " + utilizadores.length

    //percentagem de utilizadores por tipo de acesso
    let utilizadoresPercentagem = document.getElementById("utilizadoresPercentagem")
    let utilizadoresBarraPercentagem = document.getElementById("utilizadoresBarraPercentagem")

    utilizadoresPercentagem.innerHTML = Utilizador.getPercUtilizadoresPorTipoAcesso(2) + "%"
    utilizadoresBarraPercentagem.style.width = Utilizador.getPercUtilizadoresPorTipoAcesso(2) + "%"

    let operadoresPercentagem = document.getElementById("operadoresPercentagem")
    let operadoresBarraPercentagem = document.getElementById("operadoresBarraPercentagem")

    operadoresPercentagem.innerHTML = Utilizador.getPercUtilizadoresPorTipoAcesso(1) + "%"
    operadoresBarraPercentagem.style.width = Utilizador.getPercUtilizadoresPorTipoAcesso(1) + "%"

    let administradoresPercentagem = document.getElementById("administradoresPercentagem")
    let administradoresBarraPercentagem = document.getElementById("administradoresBarraPercentagem")

    administradoresPercentagem.innerHTML = Utilizador.getPercUtilizadoresPorTipoAcesso(0) + "%"
    administradoresBarraPercentagem.style.width = Utilizador.getPercUtilizadoresPorTipoAcesso(0) + "%"
}

function gerarTabelaUtilizadores() {
    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th><i class="fa fa-id-card"></i> Nome</th>
                        <th><i class="fa fa-at"></i> Email</th>
                        <th><i class="fa fa-key"></i> Password</th>
                        <th><i class="fa fa-euro"></i> Valor multa</th>                        
                        <th><i class="fa fa-lock"></i> Tipo acesso</th>
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in utilizadores) {

        let password = function() {
            let resultado = ""
            for(let j in utilizadores[i].password) {
                resultado += "•"
            }
            return resultado
        }

        let tipoAcesso = Utilizador.tipoAcessoToString(utilizadores[i].tipoAcesso)
        str += `<tr id="${utilizadores[i].id}">
                    <td>${count}</td>
                    <td>${utilizadores[i].nome}</td>
                    <td>${utilizadores[i].email}</td>
                    <td>${password()}</td>
                    <td>${utilizadores[i].multa}</td>                    
                    <td>${tipoAcesso}</td>
                    <td>
                        <button type="button" class="btn btn-primary infoUtilizador" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaUtilizadores").innerHTML = str

    //btn info utilizador
    let btnInfoUtilizador = document.getElementsByClassName("infoUtilizador")
    for (let i = 0; i < btnInfoUtilizador.length; i++) {
        btnInfoUtilizador[i].addEventListener("click", function () {
            let idUtilizador = parseInt(btnInfoUtilizador[i].parentNode.parentNode.id)
            for (let j in utilizadores) {
                if (utilizadores[j].id === idUtilizador) {
                    modalTitulo.innerHTML = "Informações sobre o utilizador"

                    let foto = (utilizadores[j].urlFoto === "img/perfil.png") ? "../img/perfil.png" : utilizadores[j].urlFoto

                    modalBody.innerHTML = `<div class="container-fluid">
                                                <div class="text-center">
                                                    <img src="${foto}" title="${utilizadores[j].nome}" class="img-fluid img-thumbnail" style="width: 150px; height: 150px; border-radius: 50%;">                            
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

                                let foto = (utilizadores[k].urlFoto === "img/perfil.png") ? "../img/perfil.png" : utilizadores[k].urlFoto

                                modalBody.innerHTML = `<div class="container-fluid">
                                                            <div class="text-center">
                                                                <img src="${foto}" alt="${utilizadores[k].nome}" class="img-fluid img-thumbnail" style="width: 150px; height: 150px; border-radius: 50%;">                            
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