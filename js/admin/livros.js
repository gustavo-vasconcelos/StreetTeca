window.onload = function () {
    //importar variáveis do sessionStorage
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
    gerarMenu(Utilizador.getTipoAcessoById(idUtilizadorLogado), "livrosMenu")

    //atualiza as percentagens
    atualizarPercentagens()

    //form adicionar livro
    let formLivro = document.getElementById("formLivro")
    let inputLivroUrlCapa = document.getElementById("inputLivroUrlCapa")
    let inputLivroTitulo = document.getElementById("inputLivroTitulo")
    let inputLivroAutor = document.getElementById("inputLivroAutor")
    let inputLivroDescricao = document.getElementById("inputLivroDescricao")
    let inputLivroAno = document.getElementById("inputLivroAno")
    let inputLivroGenero = document.getElementById("inputLivroGenero")
    let inputLivroTagsCheckbox = document.getElementsByClassName("inputLivroTagsCheckbox")
    let inputLivroEditora = document.getElementById("inputLivroEditora")
    let inputLivroPaginas = document.getElementById("inputLivroPaginas")
    let inputLivroEstadoRadio = document.getElementsByClassName("inputLivroEstadoRadio")
    let inputLivroBiblioteca = document.getElementById("inputLivroBiblioteca")
    let inputLivroDoador = document.getElementById("inputLivroDoador")
    let btnResetLivro = document.getElementById("btnResetLivro")

    btnResetLivro.addEventListener("click", function () {
        inputLivroTitulo.focus()
    })

    //limitar máximo valor para o ano
    inputLivroAno.max = new Date().getFullYear()

    //gerar combobox autores
    gerarComboboxAutores()

    //gerar combobox generos
    gerarComboboxGeneros()

    //gerar checkboxes tags
    gerarCheckboxesTags()

    //gerar combobox bibliotecas
    gerarComboboxBibliotecas()

    //gerar combobox de utilizadores
    gerarComboboxUtilizadores()

    //gerar tabela
    gerarTabelaLivros()

    formLivro.addEventListener("submit", function (event) {
        //validações
        let err = false
        let errStr = ""

        let tagsEscolhidas = []

        for (let i = 0; i < inputLivroTagsCheckbox.length; i++) {
            if (inputLivroTagsCheckbox[i].checked) {
                tagsEscolhidas.push(inputLivroTagsCheckbox[i].value)
            }
        }

        if (tagsEscolhidas.length === 0) {
            err = true
            errStr = "Selecione pelo menos uma tag."
        }

        let estadoLivro = ""
        for (let i = 0; i < inputLivroEstadoRadio.length; i++) {
            if (inputLivroEstadoRadio[i].checked) {
                estadoLivro = inputLivroEstadoRadio[i].value
            }
        }

        if (!estadoLivro) {
            err = true
            errStr = (errStr) ? (errStr + "\n") : errStr
            errStr += "Selecione o estado de conservação do livro."
        }
        //fim validações

        if (err) {
            swal("Erro!", errStr, "error");
        } else {
            //obter autores
            let autores = []
            if (inputLivroAutor.value.indexOf(",") !== -1) {
                autores = inputLivroAutor.value.split(",")
            } else {
                autores.push(inputLivroAutor.value)
            }
            //remove espaço inicial (caso haja)
            for (let i in autores) {
                if (autores[i].indexOf(" ") === 0) {
                    autores[i].slice(1, autores.length)
                }
            }

            let dataAtual = getDataAtual()

            livros.push(new Livro(
                inputLivroUrlCapa.value,
                inputLivroTitulo.value,
                autores,
                inputLivroDescricao.value,
                parseInt(inputLivroAno.value),
                Genero.getIdByNome(inputLivroGenero.value),
                Tag.getIdsByNomes(tagsEscolhidas),
                inputLivroEditora.value,
                parseInt(inputLivroPaginas.value),
                parseInt(estadoLivro),
                dataAtual,
                parseInt(inputLivroBiblioteca.value),
                parseInt(inputLivroDoador.value)
            ))

            localStorage.setItem("livros", JSON.stringify(livros))


            atualizarPercentagens()
            gerarTabelaLivros()
            swal("Livro adicionado!", `O livro ${inputLivroTitulo.value} foi adicionado com sucesso.`, "success");
            formLivro.reset()
        }

        event.preventDefault()
    })

}

function getDataAtual() {
    //data atual
    let dataAtual = new Date()
    let dd = dataAtual.getDate()
    let mm = dataAtual.getMonth() + 1
    let yyyy = dataAtual.getFullYear()

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    dataAtual = yyyy + "-" + mm + '-' + dd
    return dataAtual
}

function atualizarPercentagens() {
    //total livros
    let totalLivros = document.getElementById("totalLivros")
    totalLivros.innerHTML = "Total de livros - " + livros.length

    //percentagem de livros por género
    let str = ""
    let generosLivros = Livro.getGeneros()

    for (let i in generosLivros) {
        str += `<div class="row progress-labels">
                    <div class="col-sm-6">${generosLivros[i]}</div>
                    <div class="col-sm-6" style="text-align: right;">${Livro.getPercLivrosPorGenero(Genero.getIdByNome(generosLivros[i]))}%</div>
                </div>
                <div class="progress">
                    <div data-percentage="0%" style="width: ${Livro.getPercLivrosPorGenero(Genero.getIdByNome(generosLivros[i]))}%" class="progress-bar progress-bar-blue" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                </div>`
    }

    let percentagemLivrosPorGenero = document.getElementById("percentagemLivrosPorGenero")
    percentagemLivrosPorGenero.innerHTML = str
}

function gerarComboboxAutores(editar = false) {
    let inputAutor = (!editar) ? document.getElementById("inputLivroGenero") : document.getElementById("inputLivroGeneroEditar")
    let str = (!editar) ? '<option value="" hidden selected>Selecione um</option>' : ""
    for (let i in generos) {
        if (!editar) {
            str += `<option value="${generos[i].nome}">${generos[i].nome}</option>`
        } else {
            if (generos[i].nome === editar) {
                str += `<option value="${generos[i].nome}" selected>${generos[i].nome}</option>`
            } else {
                str += `<option value="${generos[i].nome}">${generos[i].nome}</option>`
            }
        }
    }
    inputLivroGenero.innerHTML = str
}

function gerarComboboxGeneros(editar = false) {
    let inputLivroGenero = (!editar) ? document.getElementById("inputLivroGenero") : document.getElementById("inputLivroGeneroEditar")
    let str = (!editar) ? '<option value="" hidden selected>Selecione um</option>' : ""
    for (let i in generos) {
        if (!editar) {
            str += `<option value="${generos[i].nome}">${generos[i].nome}</option>`
        } else {
            if (generos[i].nome === editar) {
                str += `<option value="${generos[i].nome}" selected>${generos[i].nome}</option>`
            } else {
                str += `<option value="${generos[i].nome}">${generos[i].nome}</option>`
            }
        }
    }
    inputLivroGenero.innerHTML = str
}

function gerarCheckboxesTags(editar = false) {
    let inputLivroTags = (!editar) ? document.getElementById("inputLivroTags") : document.getElementById("inputLivroTagsEditar")
    let str = ""
    for (let i in tags) {
        if (!editar) {
            str += `<div class="checkbox">
                        <label><input type="checkbox" value="${tags[i].nome}" class="inputLivroTagsCheckbox">${tags[i].nome}</label>
                    </div>`
        } else {
            str += `<div class="checkbox">
                        <label><input type="checkbox" value="${tags[i].nome}" class="inputLivroTagsCheckboxEditar">${tags[i].nome}</label>
                    </div>`
        }

    }

    inputLivroTags.innerHTML = str

    if (editar) {
        let inputLivroTagsCheckboxEditar = document.getElementsByClassName("inputLivroTagsCheckboxEditar")
        for (let i in inputLivroTagsCheckboxEditar) {
            for (let j in editar) {
                if (inputLivroTagsCheckboxEditar[i].value === editar[j]) {
                    inputLivroTagsCheckboxEditar[i].checked = true
                }
            }
        }
    }
}

function gerarComboboxBibliotecas(editar = false) {
    let inputLivroBiblioteca = (!editar) ? document.getElementById("inputLivroBiblioteca") : document.getElementById("inputLivroBibliotecaEditar")
    let str = (!editar) ? '<option value="-1" selected>Não atribuir</option>' : '<option value="-1" id="semBiblioteca">Não atribuir</option>'
    for (let i in bibliotecas) {
        if (!editar) {
            if (bibliotecas[i].getCapacidadeAtual() <= 0) {
                str += `<option value="${bibliotecas[i].id}" disabled>ID: ${bibliotecas[i].id} / 
                Concelho: ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} / 
                Freguesia: ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)} / 
                Capacidade: ${bibliotecas[i].getCapacidadeAtual()}</option>`
            } else {
                str += `<option value="${bibliotecas[i].id}">ID: ${bibliotecas[i].id} / 
                Concelho: ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} / 
                Freguesia: ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)} / 
                Capacidade: ${bibliotecas[i].getCapacidadeAtual()}</option>`
            }
        } else {
            if (bibliotecas[i].getCapacidadeAtual() <= 0) {
                if (bibliotecas[i].id === Livro.getIdBibliotecaById(editar)) {
                    str += `<option value="${bibliotecas[i].id}" disabled selected>ID: ${bibliotecas[i].id} / 
                    Concelho: ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} / 
                    Freguesia: ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)} / 
                    Capacidade: ${bibliotecas[i].getCapacidadeAtual()}</option>`
                } else {
                    str += `<option value="${bibliotecas[i].id}" disabled>ID: ${bibliotecas[i].id} / 
                    Concelho: ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} / 
                    Freguesia: ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)} / 
                    Capacidade: ${bibliotecas[i].getCapacidadeAtual()}</option>`
                }

            } else {
                if (bibliotecas[i].id === Livro.getIdBibliotecaById(editar)) {
                    str += `<option value="${bibliotecas[i].id}" selected>ID: ${bibliotecas[i].id} / 
                    Concelho: ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} / 
                    Freguesia: ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)} / 
                    Capacidade: ${bibliotecas[i].getCapacidadeAtual()}</option>`
                } else {
                    str += `<option value="${bibliotecas[i].id}">ID: ${bibliotecas[i].id} / 
                    Concelho: ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)} / 
                    Freguesia: ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)} / 
                    Capacidade: ${bibliotecas[i].getCapacidadeAtual()}</option>`
                }

            }
        }
    }
    inputLivroBiblioteca.innerHTML = str
    if(Livro.getIdBibliotecaById(editar) === -1) {
        console.log(true)
        document.getElementById("semBiblioteca").selected = true
    }
}

function gerarComboboxUtilizadores(editar = false) {
    let inputLivroDoador = (!editar) ? document.getElementById("inputLivroDoador") : document.getElementById("inputLivroDoadorEditar")
    let str = (!editar || (editar === -1)) ? '<option value="-1" selected>Anónimo</option>' : '<option value="-1">Anónimo</option>'
    for (let i in utilizadores) {
        if (!editar || (editar === -1)) {
            str += `<option value="${utilizadores[i].id}">Nome: ${utilizadores[i].nome} / Email: ${utilizadores[i].email}</option>`
        } else {
            if (utilizadores[i].id === editar) {
                str += `<option value="${utilizadores[i].id}" selected>Nome: ${utilizadores[i].nome} / Email: ${utilizadores[i].email}</option>`
            } else {
                str += `<option value="${utilizadores[i].id}">Nome: ${utilizadores[i].nome} / Email: ${utilizadores[i].email}</option>`
            }

        }
    }
    inputLivroDoador.innerHTML = str
}

function gerarTabelaLivros() {
    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>ID biblioteca</th>
                        <th>Género</th>
                        <th>Tags</th>
                        <th>Data de doação</th>                        
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in livros) {
        str += `<tr id="${livros[i].id}">
                    <td>${count}</td>
                    <td><a href="../livro.html" class="livro${livros[i].id} clicarLivro">${livros[i].titulo}</a></td>
                    <td>${livros[i].idBiblioteca}</td>
                    <td>${Genero.getNomeById(livros[i].idGenero)}</td>
                    <td>${Tag.getNomesByIds(livros[i].idTags).join(", ")}</td>
                    <td>${livros[i].dataDoacao}</td>                    
                    <td align="right">
                        <button type="button" class="btn btn-primary infoLivro" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaLivros").innerHTML = str
    livroClicado()
    //btn info livro
    let btnInfoLivro = document.getElementsByClassName("infoLivro")
    for (let i = 0; i < btnInfoLivro.length; i++) {
        btnInfoLivro[i].addEventListener("click", function () {
            let idLivro = parseInt(btnInfoLivro[i].parentNode.parentNode.id)
            for (let j in livros) {
                if (livros[j].id === idLivro) {
                    let doador = (livros[j].idDoador === -1) ? "Anónimo" : Utilizador.getNomeById(livros[j].idDoador)
                    modalTitulo.innerHTML = "Informações sobre o livro"
                    modalBody.innerHTML = `<div class="container-fluid">
                                                <div class="text-center">
                                                    <img src="${livros[j].urlCapa}" title="${livros[j].titulo}" class="img-fluid img-thumbnail" style="height:300px;">                            
                                                </div>
                                                <br>
                                                <p><b>ID:</b> ${livros[j].id}</p>
                                                <p><b>Nome:</b> ${livros[j].titulo}</p>
                                                <p><b>Autor:</b> ${livros[j].autorToString().join(", ")}</p>
                                                <p><b>Descrição:</b> ${livros[j].descricao}</p> 
                                                <p><b>Ano:</b> ${livros[j].ano}</p>
                                                <p><b>Género:</b> ${Genero.getNomeById(livros[j].idGenero)}</p>
                                                <p><b>Tags:</b> ${Tag.getNomesByIds(livros[j].idTags).join(", ")}</p>
                                                <p><b>Editora:</b> ${livros[j].editora}</p>
                                                <p><b>Páginas:</b> ${livros[j].paginas}</p>
                                                <p><b>Estado:</b> ${livros[j].estadoToString()}</p>
                                                <p><b>Data de doação:</b> ${livros[j].dataDoacao}</p>
                                                <p><b>ID biblioteca:</b> ${livros[j].idBiblioteca}</p>
                                                <p><b>Doador:</b> ${doador}</p>
                                                <p><b>Pontuação média:</b> ${livros[j].getPontuacaoMedia()}</p>
                                            </div>`
                    modalFooter.innerHTML = `<button type="button" class="btn btn-danger remover">Remover</button>
                                             <button type="button" class="btn btn-warning editar">Editar</button>
                                             <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`
                }
            }


            //btn remover livro
            let btnRemoverLivro = document.getElementsByClassName("remover")
            for (let j = 0; j < btnRemoverLivro.length; j++) {
                btnRemoverLivro[j].addEventListener("click", function () {
                    swal({
                        title: "Deseja mesmo remover?",
                        text: `O livro ${Livro.getTituloById(idLivro)}, assim como os comentários a este associados serão removidos!`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            swal(`O livro ${Livro.getTituloById(idLivro)} foi removido com sucesso.`, {
                                icon: "success",
                            });
                            $("#modal").modal('hide')
                            Livro.removerLivroById(idLivro)
                            localStorage.setItem("livros", JSON.stringify(livros))

                            atualizarPercentagens()
                            gerarTabelaLivros()
                        }
                    });
                })
            }

            //btn editar livro
            let btnEditarLivro = document.getElementsByClassName("editar")
            for (let j = 0; j < btnEditarLivro.length; j++) {
                btnEditarLivro[j].addEventListener("click", function () {
                    for (let k in livros) {
                        if (livros[k].id === idLivro) {
                            modalTitulo.innerHTML = "A editar " + livros[k].titulo
                            modalBody.innerHTML = `<div class="container-fluid">
                                                        <div class="text-center">
                                                            <img src="${livros[k].urlCapa}" title="${livros[k].titulo}" id="imagemCapaEditar" class="img-fluid img-thumbnail" style="height:300px;">                            
                                                        </div>
                                                        <br>
                                                        <form class="form-horizontal" id="formLivroEditar">
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroUrlCapaEditar">URL capa</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroUrlCapaEditar" type="url" class="form-control" required value="${livros[k].urlCapa}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroTituloEditar">Título</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroTituloEditar" type="text" class="form-control" required value="${livros[k].titulo}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroAutorEditar">Autor</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroAutorEditar" type="text" class="form-control" required value="${livros[k].autor.join(", ")}">
                                                                    <small>Separar por vírgulas caso seja mais que um.</small>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroDescricaoEditar">Descrição</label>
                                                                <div class="col-md-9">
                                                                    <textarea id="inputLivroDescricaoEditar" class="form-control" rows="5" required>${livros[k].descricao}</textarea>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroAnoEditar">Ano</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroAnoEditar" type="number" min="1000" max="${new Date().getFullYear()}" class="form-control" required value="${livros[k].ano}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroGeneroEditar">Género</label>
                                                                <div class="col-md-9">
                                                                    <select id="inputLivroGeneroEditar" class="form-control" required></select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label">Tags</label>
                                                                <div class="col-md-9" id="inputLivroTagsEditar"></div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroEditoraEditar">Editora</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroEditoraEditar" type="text" class="form-control" required value="${livros[k].editora}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroPaginasEditar">Páginas</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroPaginasEditar" type="number" min="1" class="form-control" required value="${livros[k].paginas}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label">Estado *</label>
                                                                <div class="col-md-9" id="inputLivroEstadoRadioEditar">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input type="radio" name="inputLivroEstado" class="inputLivroEstadoRadioEditar" value="2">Bom
                                                                        </label>
                                                                    </div>
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input type="radio" name="inputLivroEstado" class="inputLivroEstadoRadioEditar" value="1">Aceitável
                                                                        </label>
                                                                    </div>
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input type="radio" name="inputLivroEstado" class="inputLivroEstadoRadioEditar" value="0">Fraco
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroDataDoacaoEditar">Data de doação</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroDataDoacaoEditar" type="date" max="${getDataAtual()}" class="form-control" required value="${livros[k].dataDoacao}">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroBibliotecaEditar">ID biblioteca</label>
                                                                <div class="col-md-9">
                                                                    <select name="inputLivroBibliotecaEditar" id="inputLivroBibliotecaEditar" class="form-control"></select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroDoadorEditar">Nome doador</label>
                                                                <div class="col-md-9">
                                                                    <select id="inputLivroDoadorEditar" class="form-control"></select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="inputLivroPontuacaoEditar">Pontuação média</label>
                                                                <div class="col-md-9">
                                                                    <input id="inputLivroPontuacaoEditar" type="number" class="form-control" readonly value="${livros[k].getPontuacaoMedia()}">
                                                                </div>
                                                            </div>
                                                            <input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
                                                            <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
                                                        </form>                                  
                                                    </div>`
                            modalFooter.innerHTML = ""

                            //gerar combobox géneros e selecionar o género
                            gerarComboboxGeneros(Genero.getNomeById(livros[k].idGenero))

                            //gerar tags e selecionar as tags do livro
                            gerarCheckboxesTags(Tag.getNomesByIds(livros[k].idTags))

                            //selecionar o estado do livro
                            let inputLivroEstadoRadioEditar = document.getElementsByClassName("inputLivroEstadoRadioEditar")
                            for (let l in inputLivroEstadoRadioEditar) {
                                if (livros[k].estado === parseInt(inputLivroEstadoRadioEditar[l].value)) {
                                    inputLivroEstadoRadioEditar[l].checked = true
                                }
                            }

                            //gerar combobox bibliotecas e selecionar a biblioteca
                            gerarComboboxBibliotecas(livros[k].id)

                            //gerar combobox doador e selecionar o doador
                            gerarComboboxUtilizadores(livros[k].idDoador)

                            //variáveis
                            let inputLivroUrlCapaEditar = document.getElementById("inputLivroUrlCapaEditar")
                            let inputLivroTituloEditar = document.getElementById("inputLivroTituloEditar")
                            let inputLivroAutorEditar = document.getElementById("inputLivroAutorEditar")
                            let inputLivroDescricaoEditar = document.getElementById("inputLivroDescricaoEditar")
                            let inputLivroAnoEditar = document.getElementById("inputLivroAnoEditar")
                            let inputLivroGeneroEditar = document.getElementById("inputLivroGeneroEditar")
                            let inputLivroTagsCheckboxEditar = document.getElementsByClassName("inputLivroTagsCheckboxEditar")
                            let inputLivroEditoraEditar = document.getElementById("inputLivroEditoraEditar")
                            let inputLivroPaginasEditar = document.getElementById("inputLivroPaginasEditar")
                            let inputLivroDataDoacaoEditar = document.getElementById("inputLivroDataDoacaoEditar")
                            let inputLivroBibliotecaEditar = document.getElementById("inputLivroBibliotecaEditar")
                            let inputLivroDoadorEditar = document.getElementById("inputLivroDoadorEditar")

                            inputLivroUrlCapaEditar.addEventListener("change", function () {
                                let imagemCapaEditar = document.getElementById("imagemCapaEditar")
                                imagemCapaEditar.src = inputLivroUrlCapaEditar.value
                            })

                            //form editar
                            let formLivroEditar = document.getElementById("formLivroEditar")
                            formLivroEditar.addEventListener("submit", function (event) {
                                //validações
                                let err = false
                                let errStr = ""

                                let tagsEscolhidas = []

                                for (let l in inputLivroTagsCheckboxEditar) {
                                    if (inputLivroTagsCheckboxEditar[l].checked) {
                                        tagsEscolhidas.push(inputLivroTagsCheckboxEditar[l].value)
                                    }
                                }

                                if (tagsEscolhidas.length === 0) {
                                    err = true
                                    errStr = "Selecione pelo menos uma tag."
                                }

                                let estadoLivro = ""
                                for (let l in inputLivroEstadoRadioEditar) {
                                    if (inputLivroEstadoRadioEditar[l].checked) {
                                        estadoLivro = inputLivroEstadoRadioEditar[l].value
                                    }
                                }

                                if (!estadoLivro) {
                                    err = true
                                    errStr = (errStr) ? (errStr + "\n") : errStr
                                    errStr += "Selecione o estado de conservação do livro."
                                }
                                //fim validações

                                if (err) {
                                    swal("Erro!", errStr, "error");
                                } else {
                                    //obter autores
                                    let autores = []
                                    if (inputLivroAutorEditar.value.indexOf(",") !== -1) {
                                        autores = inputLivroAutorEditar.value.split(",")
                                    } else {
                                        autores.push(inputLivroAutorEditar.value)
                                    }
                                    //remove espaço inicial (caso haja)
                                    for (let l in autores) {
                                        if (autores[l].indexOf(" ") === 0) {
                                            autores[l].slice(1, autores.length)
                                        }
                                    }

                                    livros[k].urlCapa = inputLivroUrlCapaEditar.value
                                    livros[k].titulo = inputLivroTituloEditar.value
                                    livros[k].autor = autores
                                    livros[k].descricao = inputLivroDescricaoEditar.value
                                    livros[k].ano = parseInt(inputLivroAnoEditar.value)
                                    livros[k].idGenero = Genero.getIdByNome(inputLivroGeneroEditar.value)
                                    livros[k].idTags = Tag.getIdsByNomes(tagsEscolhidas)
                                    livros[k].editora = inputLivroEditoraEditar.value
                                    livros[k].paginas = parseInt(inputLivroPaginasEditar.value)
                                    livros[k].estado = parseInt(estadoLivro)
                                    livros[k].dataDoacao = inputLivroDataDoacaoEditar.value
                                    livros[k].idBiblioteca = parseInt(inputLivroBibliotecaEditar.value)
                                    livros[k].urlCapa = inputLivroUrlCapaEditar.value
                                    livros[k].idDoador = parseInt(inputLivroDoadorEditar.value)

                                    //atualizar a key do localStorage
                                    localStorage.setItem("livros", JSON.stringify(livros))

                                    atualizarPercentagens()
                                    gerarTabelaLivros()

                                    swal("Livro editado!", `O livro ${livros[k].titulo} foi editado com sucesso.`, "success");
                                    $("#modal").modal("hide")
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