window.onload = function () {
    //importar variáveis do sessionStorage
    concelhos = JSON.parse(localStorage.getItem("concelhos"))
    transformarEmInstanciaConcelho(concelhos)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //gerar tabelas
    gerarTabelaConcelhos()

    //form adicionar concelho
    let formConcelho = document.getElementById("formConcelho")
    let inputConcelho = document.getElementById("inputConcelho")
    let inputFreguesias = document.getElementById("inputFreguesias")
    let btnResetConcelhos = document.getElementById("btnResetConcelhos")

    formConcelho.addEventListener("submit", function (event) {
        if (Concelho.getIdByConcelho(inputConcelho.value) !== -1) {
            swal("Erro!", `Já existe um concelho com o mesmo nome.`, "error");
        } else {
            concelhos.push(new Concelho(inputConcelho.value, inputFreguesias.value))
            localStorage.setItem("concelhos", JSON.stringify(concelhos))
            swal("Concelho adicionado!", `Foi adicionado o concelho ${inputConcelho.value} com o id ${Concelho.getUltimoId()}.`, "success");
            formConcelho.reset()
            gerarTabelaConcelhos()
            gerarComboboxConcelhos()
        }
        event.preventDefault()
    })

    btnResetConcelhos.addEventListener("click", function () {
        inputConcelho.focus()
    })


    //form adicionar biblioteca
    let formBiblioteca = document.getElementById("formBiblioteca")
    let inputBibliotecaConcelho = document.getElementById("inputBibliotecaConcelho")
    let inputBibliotecaFreguesia = document.getElementById("inputBibliotecaFreguesia")
    let btnResetBibliotecas = document.getElementById("btnResetConcelhos")

    //gerar combobox concelhos
    gerarComboboxConcelhos()

    inputBibliotecaConcelho.addEventListener("change", function () {
        gerarComboboxFreguesias(inputBibliotecaConcelho.value)
    })

    /*
    formBiblioteca.addEventListener("submit", function (event) {
        if (Concelho.getIdByConcelho(inputConcelho.value) !== -1) {
            swal("Erro!", `Já existe um concelho com o mesmo nome.`, "error");
        } else {
            concelhos.push(new Concelho(inputConcelho.value, inputFreguesias.value))
            localStorage.setItem("concelhos", JSON.stringify(concelhos))
            swal("Concelho adicionado!", `Foi adicionado o concelho ${inputConcelho.value} com o id ${Concelho.getUltimoId()}.`, "success");
            formConcelho.reset()
            gerarTabelaConcelhos()
            gerarComboboxConcelhos()
        }
        event.preventDefault()
    })*/

    btnResetBibliotecas.addEventListener("click", function () {
        inputConcelho.focus()
    })
}

function gerarTabelaConcelhos() {
    let totalConcelhos = document.getElementById("totalConcelhos")
    totalConcelhos.innerHTML = "Lista de concelhos - " + concelhos.length

    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Concelho</th>
                        <th>Nº de freguesias</th>
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in concelhos) {
        str += `<tr id="${concelhos[i].id}">
                    <td>${count}</td>
                    <td>${concelhos[i].concelho}</td>
                    <td>${concelhos[i].freguesias.length}</td>
                    <td align="right">
                        <button type="button" class="btn btn-primary infoConcelho" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaConcelhos").innerHTML = str

    //btn info utilizador
    let btnInfoConcelho = document.getElementsByClassName("infoConcelho")
    for (let i = 0; i < btnInfoConcelho.length; i++) {
        btnInfoConcelho[i].addEventListener("click", function () {
            let idConcelho = parseInt(btnInfoConcelho[i].parentNode.parentNode.id)
            for (let j in concelhos) {
                if (concelhos[j].id === idConcelho) {
                    modalTitulo.innerHTML = "Informações sobre o concelho"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <p><b>ID:</b> ${concelhos[j].id}</p>
                                                <p><b>Concelho:</b> ${concelhos[j].concelho}</p>
                                                <p><b>Freguesias:</b> ${concelhos[j].freguesias.join(" / ")}</p>
                                            </div>`
                    modalFooter.innerHTML = `<button type="button" class="btn btn-danger remover">Remover concelho</button>
                                             <button type="button" class="btn btn-warning editar">Editar concelho</button>
                                             <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`
                }
            }

            //btn remover concelho
            let btnRemoverConcelho = document.getElementsByClassName("remover")
            for (let j = 0; j < btnRemoverConcelho.length; j++) {
                btnRemoverConcelho[j].addEventListener("click", function () {
                    swal({
                        title: "Deseja mesmo remover?",
                        text: `O concelho ${Concelho.getConcelhoById(idConcelho)} será removido para sempre!`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            swal(`O concelho ${Concelho.getConcelhoById(idConcelho)} foi removido com sucesso.`, {
                                icon: "success",
                            });
                            $("#modal").modal('hide')

                            Concelho.removerConcelhoById(idConcelho)
                            localStorage.setItem("concelhos", JSON.stringify(concelhos))
                            gerarTabelaConcelhos()
                            gerarComboboxConcelhos()
                            gerarComboboxFreguesias("")
                        }
                    });
                })
            }

            //btn editar concelho
            let btnEditarConcelho = document.getElementsByClassName("editar")
            for (let j = 0; j < btnEditarConcelho.length; j++) {
                btnEditarConcelho[j].addEventListener("click", function () {
                    for (let k in concelhos) {
                        if (concelhos[k].id === idConcelho) {
                            modalTitulo.innerHTML = "A editar " + concelhos[k].nome
                            modalBody.innerHTML = `<div class="container-fluid">
                                                        <form class="form-horizontal" id="formEditarConcelho">
                                                            <div class="form-group">
                                                                <label class="col-sm-3 control-label" for="inputConcelhoEditarId">ID</label>
                                                                <div class="col-sm-9">
                                                                    <input id="inputConcelhoEditarId" type="text" class="form-control" required readonly value="${concelhos[k].id}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-sm-3 control-label" for="inputConcelhoEditarConcelho">Concelho</label>
                                                                <div class="col-sm-9">
                                                                    <input id="inputConcelhoEditarConcelho" type="text" class="form-control" required value="${concelhos[k].concelho}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-sm-3 control-label" for="inputConcelhoEditarFreguesias">Freguesias</label>
                                                                <div class="col-sm-9">
                                                                    <input id="inputConcelhoEditarFreguesias" type="text" class="form-control" required value="${concelhos[j].freguesias.join(", ")}">
                                                                </div>
                                                            </div>
                                                            <input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
                                                            <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
                                                        </form>                                  
                                                    </div>`
                            modalFooter.innerHTML = ""

                            //form editar
                            let formEditarConcelho = document.getElementById("formEditarConcelho")
                            formEditarConcelho.addEventListener("submit", function (event) {
                                let inputConcelhoEditarConcelho = document.getElementById("inputConcelhoEditarConcelho")

                                if (Concelho.getIdByConcelho(inputConcelhoEditarConcelho.value) === -1 || (Concelho.getConcelhoById(inputConcelhoEditarConcelho.value) === concelhos[k].id && Concelho.getConcelhoById(inputConcelhoEditarConcelho.value) !== -1)) { //caso não exista nenhum concelho com o nome indicado
                                    let inputConcelhoEditarFreguesias = document.getElementById("inputConcelhoEditarFreguesias")

                                    concelhos[k].nome = inputConcelhoEditarConcelho.value
                                    concelhos[k].freguesias = inputConcelhoEditarFreguesias.value

                                    //atualizar a key do localStorage
                                    localStorage.setItem("concelhos", JSON.stringify(concelhos))

                                    swal("Concelho editado!", `O concelho com o id ${idConcelho} foi editado com sucesso.`, "success");
                                    gerarTabelaConcelhos()
                                    $("#modal").modal("hide")
                                } else { //caso exista um concelho com o mesmo nome indicado
                                    swal("Erro!", `O concelho ${inputConcelhoEditarConcelho.value} já existe.`, "error");
                                }

                                event.preventDefault()
                            })
                        }
                    }
                })
            }
        })
    }
}

function gerarComboboxConcelhos() {
    let inputBibliotecaConcelho = document.getElementById("inputBibliotecaConcelho")
    let str = ""
    if(concelhos.length > 0) {
        str += '<option value="" selected hidden>Selecione um</option>'
        for (let i in concelhos) {
            str += `<option value="${concelhos[i].concelho}">${concelhos[i].concelho}</option>`
        }
    }
    inputBibliotecaConcelho.innerHTML = str
}

function gerarComboboxFreguesias(concelho) {
    let inputBibliotecaFreguesia = document.getElementById("inputBibliotecaFreguesia")
    let str = ""

    if (concelho !== "") {
        str = '<option value="" selected hidden>Selecione um</option>'
        let id = Concelho.getIdByConcelho(concelho)
        for (let i in concelhos) {
            if (concelhos[i].id === id) {
                for (let j in concelhos[i].freguesias)
                    str += `<option value="${concelhos[i].freguesias[j]}">${concelhos[i].freguesias[j]}</option>`
            }
        }
    }
    inputBibliotecaFreguesia.innerHTML = str
}