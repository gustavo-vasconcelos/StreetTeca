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
            if(inputLivroAutor.value.indexOf(",") !== -1) {
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

            //data atual
            let dataAtual = new Date()
            var dd = dataAtual.getDate()
            var mm = dataAtual.getMonth() + 1
            var yyyy = dataAtual.getFullYear()

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            dataAtual = yyyy + "-" + mm + '-' + dd

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
            swal("Livro adicionado!", `O livro cujo título é ${inputLivroTitulo.value} foi adicionado com sucesso.`, "success");
            formLivro.reset()
        }

        event.preventDefault()
    })

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

function gerarComboboxGeneros() {
    let inputLivroGenero = document.getElementById("inputLivroGenero")
    let str = '<option value="" hidden selected>Selecione um</option>'
    for (let i in generos) {
        str += `<option value="${generos[i].nome}">${generos[i].nome}</option>`
    }
    inputLivroGenero.innerHTML = str
}

function gerarCheckboxesTags() {
    let inputLivroTags = document.getElementById("inputLivroTags")
    let str = ""
    for (let i in tags) {
        str += `<div class="checkbox">
                    <label><input type="checkbox" value="${tags[i].nome}" class="inputLivroTagsCheckbox">${tags[i].nome}</label>
                </div>`
    }
    inputLivroTags.innerHTML = str
}

function gerarComboboxBibliotecas() {
    let inputLivroBiblioteca = document.getElementById("inputLivroBiblioteca")
    let str = '<option value="" hidden selected>Selecione uma</option>'
    for (let i in bibliotecas) {
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
    }
    inputLivroBiblioteca.innerHTML = str
}

function gerarComboboxUtilizadores() {
    let inputLivroDoador = document.getElementById("inputLivroDoador")
    let str = '<option value="-1" selected>Anónimo</option>'
    for (let i in utilizadores) {
        str += `<option value="${utilizadores[i].id}">Nome: ${utilizadores[i].nome} / Email: ${utilizadores[i].email}</option>`
    }
    inputLivroDoador.innerHTML = str
}

function gerarTabelaLivros() {
    let str = ` <thead class="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>ID biblioteca</th>
                        <th>Estado</th>
                        <th>Data de doação</th>                        
                        <th></th>
                    </tr>
                </thead>`

    let count = 1

    for (let i in livros) {
        str += `<tr id="${livros[i].id}">
                    <td>${count}</td>
                    <td>${livros[i].titulo}</td>
                    <td>${livros[i].idBiblioteca}</td>
                    <td>${livros[i].estadoToString()}</td>
                    <td>${livros[i].dataDoacao}</td>                    
                    <td>
                        <button type="button" class="btn btn-primary infoLivro" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
                    </td>
                </tr>`
        count++
    }

    document.getElementById("tabelaLivros").innerHTML = str

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
                                                <p><b>Autor:</b> ${livros[j].autor.join(", ")}</p>
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

            /*
            //btn editar livro
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
            }*/
        })
    }
}