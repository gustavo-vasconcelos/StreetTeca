class Utilizador {
    constructor(nome, email, password, urlFoto, tipoAcesso = 2) {
        this._id = Utilizador.getUltimoId() + 1
        this.nome = nome
        this.email = email
        this.password = password
        this.urlFoto = urlFoto
        this.tipoAcesso = tipoAcesso
        this.multa = 0
    }

    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (utilizadores.length > 0) {
            for (let i in utilizadores) {
                id = utilizadores[i].id
            }
        }
        return id
    }

    get nome() {
        return this._nome
    }
    set nome(valor) {
        this._nome = valor
    }

    get email() {
        return this._email
    }
    set email(valor) {
        this._email = valor
    }

    get password() {
        return this._password
    }
    set password(valor) {
        this._password = valor
    }

    get urlFoto() {
        return this._urlFoto
    }
    set urlFoto(valor) {
        valor = (valor === "") ? "../img/perfil.png" : valor
        this._urlFoto = valor
    }

    get tipoAcesso() {
        return this._tipoAcesso
    }
    set tipoAcesso(valor) {
        this._tipoAcesso = valor
    }

    get multa() {
        return this._multa
    }
    set multa(valor) {
        this._multa = valor
    }

    static tipoAcessoToString(tipoAcesso) {
        switch (tipoAcesso) {
            case 0:
                return "Admin"
                break;
            case 1:
                return "Operador"
                break;
            case 2:
                return "Utilizador"
                break;
        }
    }

    static getTipoAcessoById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                return utilizadores[i].tipoAcesso
            }
        }
    }

    static getIdByEmail(email) {
        let id = -1
        for (let i in utilizadores) {
            if (utilizadores[i].email.toLowerCase() === email.toLowerCase()) {
                id = utilizadores[i].id
            }
        }
        return id
    }

    static getNomeById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                return utilizadores[i].nome
            }
        }
    }

    static getPrimeiroNomeById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                let nome = utilizadores[i].nome
                if (nome.indexOf(" ") !== -1) {
                    return nome.substr(0, nome.indexOf(" "))
                } else {
                    return nome
                }
            }
        }
    }

    static getPrimeiroUltimoNomeById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                let nome = utilizadores[i].nome
                let primeiro = ""
                let ultimo = ""
                if (nome.indexOf(" ") !== -1) {
                    primeiro = nome.substr(0, nome.indexOf(" "))
                    ultimo = nome.substr(nome.lastIndexOf(" ") + 1, 1) + "."
                    return primeiro + " " + ultimo
                } else {
                    return nome
                }
            }
        }
    }

    static getPasswordById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                return utilizadores[i].password
            }
        }
    }

    static removerUtilizadorById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                utilizadores.splice(i, 1)
            }
        }
    }

    static getTipoAcessoById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                return utilizadores[i].tipoAcesso
            }
        }
    }

    static getUrlFotoById(id) {
        for (let i in utilizadores) {
            if (utilizadores[i].id === id) {
                return utilizadores[i].urlFoto
            }
        }
    }
}

class Livro {
    constructor(titulo, autor, ano, idGenero, tags, editora, paginas, estado, dataDoacao, codigoBiblioteca, idDoador = -1) {
        this._id = Livro.getUltimoId() + 1
        this.titulo = titulo
        this.autor = autor
        this.ano = ano
        this.idGenero = idGenero
        this.tags = tags
        this.editora = editora
        this.paginas = paginas
        this.estado = estado
        this.dataDoacao = dataDoacao
        this.codigoBiblioteca = codigoBiblioteca
        this.idDoador = idDoador
    }

    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (livros.length > 0) {
            for (let i in livros) {
                id = livros[i].id
            }
        }
        return id
    }

    get titulo() {
        return this._titulo
    }
    set titulo(valor) {
        this._titulo = valor
    }

    get autor() {
        return this._autor
    }
    set autor(valor) {
        this._autor = valor
    }

    get ano() {
        return this._ano
    }
    set ano(valor) {
        this._ano = valor
    }

    get idGenero() {
        return this._idGenero
    }
    set idGenero(valor) {
        this._idGenero = valor
    }

    get tags() {
        return this._tags
    }
    set tags(valor) {
        this._tags = valor
    }

    get editora() {
        return this._editora
    }
    set editora(valor) {
        this._editora = valor
    }

    get paginas() {
        return this._paginas
    }
    set paginas(valor) {
        this._paginas = valor
    }

    get estado() {
        return this._estado
    }
    set estado(valor) {
        this._estado = valor
    }

    get dataDoacao() {
        return this._dataDoacao
    }
    set dataDoacao(valor) {
        this._dataDoacao = valor
    }

    get codigoBiblioteca() {
        return this._codigoBiblioteca
    }
    set codigoBiblioteca(valor) {
        this._codigoBiblioteca = valor
    }

    get idDoador() {
        return this._idDoador
    }
    set idDoador(valor) {
        this._idDoador = valor
    }

    static idLivroToTitulo(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].titulo
            }
        }
    }

}

class Biblioteca {
    constructor(freguesia, morada, coordenadas, capacidade) {
        this._id = Biblioteca.getUltimoId() + 1
        this.freguesia = freguesia
        this.morada = morada
        this.coordenas = coordenadas
        this.capacidade = capacidade
    }
    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (bibliotecas.length > 0) {
            for (let i in bibliotecas) {
                id = bibliotecas[i].id
            }
        }
        return id
    }

    get freguesia() {
        return this._freguesia
    }
    set freguesia(valor) {
        this._freguesia = valor
    }

    get morada() {
        return this._morada
    }
    set morada(valor) {
        this._morada = valor
    }

    get coordenadas() {
        return this._coordenadas
    }
    set coordenadas(valor) {
        this._coordenadas = valor
    }

    get capacidade() {
        return this._capacidade
    }
    set capacidade(valor) {
        this._capacidade = valor
    }

}

class Requisicao {
    constructor(idUtilizador, idLivro, dataRequisicao) {
        this._id = Requisicao.getUltimoId() + 1
        this.idUtilizador = idUtilizador
        this.idLivro = idLivro
        this.dataRequisicao = dataRequisicao
        this.multa = false
        this.valorMulta = 0
    }

    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (requisicoes.length > 0) {
            for (let i in requisicoes) {
                id = requisicoes[i].id
            }
        }
        return id
    }

    get idUtilizador() {
        return this._idUtilizador
    }
    set idUtilizador(valor) {
        this._idUtilizador = valor
    }

    get idLivro() {
        return this._idLivro
    }
    set idLivro(valor) {
        this._idLivro = valor
    }

    get dataRequisicao() {
        return this._dataRequisicao
    }
    set dataRequisicao(valor) {
        this._dataRequisicao = valor
    }

    static quantidadeRequisicoesByIdUtilizador(id) {
        let quantidade = 0
        for (let i in requisicoes) {
            if (requisicoes[i].idUtilizador === id) {
                quantidade++
            }
        }
        return quantidade
    }

    static livrosRequisitadosByIdUtilizador(id) {
        let listaLivros = []
        for (let i in requisicoes) {
            if (requisicoes[i].idUtilizador === id) {
                listaLivros.push(Livro.idLivroToTitulo(requisicoes[i].idLivro))
            }
        }
        return listaLivros
    }
}

class Comentario {
    constructor(idUtilizador, idLivro, comentario, pontuacao) {
        this._id = Comentario.getUltimoId() + 1
        this.idUtilizador = idUtilizador
        this.idLivro = idLivro
        this.comentario = comentario
        this.pontuacao = pontuacao
    }

    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (comentarios.length > 0) {
            for (let i in comentarios) {
                id = comentarios[i].id
            }
        }
        return id
    }

    get idUtilizador() {
        return this._idUtilizador
    }
    set idUtilizador(valor) {
        this._idUtilizador = valor
    }

    get idLivro() {
        return this._idLivro
    }
    set idLivro(valor) {
        this._idLivro = valor
    }

    get comentario() {
        return this._comentario
    }
    set comentario(valor) {
        this._comentario = valor
    }

    get pontuacao() {
        return this._pontuacao
    }
    set pontuacao(valor) {
        this._pontuacao = valor
    }
}

class Genero {
    constructor(nome) {
        this._id = Genero.getUltimoId() + 1
        this.nome = nome
    }

    get nome() {
        return this._nome
    }
    set nome(valor) {
        this._nome = valor
    }

    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (generos.length > 0) {
            for (let i in generos) {
                id = generos[i].id
            }
        }
        return id
    }

    static getIdByNome(nome) {
        let id = -1
        for (let i in generos) {
            if (generos[i].nome.toLowerCase() === nome.toLowerCase()) {
                id = generos[i].id
            }
        }
        return id
    }

    static getNomeById(id) {
        for (let i in generos) {
            if (generos[i].id === id) {
                return generos[i].nome
            }
        }
    }

    static removerGeneroById(id) {
        for (let i in generos) {
            if (generos[i].id === id) {
                generos.splice(i, 1)
            }
        }
    }
}

class Tag {
    constructor(nome) {
        this._id = Tag.getUltimoId() + 1
        this.nome = nome
    }

    get nome() {
        return this._nome
    }
    set nome(valor) {
        valor = (valor) ? valor.toLowerCase() : valor
        this._nome = valor
    }

    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (tags.length > 0) {
            for (let i in tags) {
                id = tags[i].id
            }
        }
        return id
    }

    static getIdByNome(nome) {
        let id = -1
        for (let i in tags) {
            if (tags[i].nome.toLowerCase() === nome.toLowerCase()) {
                id = tags[i].id
            }
        }
        return id
    }

    static getNomeById(id) {
        for (let i in tags) {
            if (tags[i].id === id) {
                return tags[i].nome
            }
        }
    }

    static removerTagById(id) {
        for (let i in tags) {
            if (tags[i].id === id) {
                tags.splice(i, 1)
            }
        }
    }
}


let utilizadores = []
let livros = []
let bibliotecas = []
let requisicoes = []
let comentarios = []
let generos = []
let tags = []


//utilizadores predefinidos
utilizadores.push(new Utilizador("Teste", "teste@teste.pt", "123", "", 0))
utilizadores.push(new Utilizador("Gustavo Henrique", "teste2@teste.pt", "123", "", 2))
utilizadores.push(new Utilizador("João", "teste3@teste.pt", "123", "", 1))
utilizadores.push(new Utilizador("Guilherme", "teste4@teste.pt", "123", "", 1))

if (!localStorage.getItem("utilizadores")) {
    localStorage.setItem("utilizadores", JSON.stringify(utilizadores))
    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
}

//géneros predefinidos
generos.push(new Genero("Ficção científica"))
generos.push(new Genero("Fantasia"))
generos.push(new Genero("Humor"))
generos.push(new Genero("Romance"))

if (!localStorage.getItem("generos")) {
    localStorage.setItem("generos", JSON.stringify(generos))
    generos = JSON.parse(localStorage.getItem("generos"))
}

//tags predefinidas
tags.push(new Tag("guerra"))
tags.push(new Tag("armas"))
tags.push(new Tag("televisão"))
tags.push(new Tag("dragões"))
tags.push(new Tag("zombies"))

if (!localStorage.getItem("tags")) {
    localStorage.setItem("tags", JSON.stringify(tags))
    tags = JSON.parse(localStorage.getItem("tags"))
}




requisicoes.push(new Requisicao(1, 1, "2018-05-02"))
requisicoes.push(new Requisicao(1, 2, "2018-05-02"))

livros.push(new Livro("A Guerra dos Tronos", "George R.R. Martin", 2008, 0, "daenerys", "Teca Editora", 503, 1, "2018-05-02", 0, 0))
livros.push(new Livro("Os 100", "Kass Morgan", 2008, 0, "daenerys", "Teca Editora", 503, 1, "2018-05-02", 0, 0))

let idUtilizadorLogado = (localStorage.getItem("idUtilizadorLogado")) ? localStorage.getItem("idUtilizadorLogado") : -1

localStorage.setItem("idUtilizadorLogado", idUtilizadorLogado)

function transformarEmInstanciaUtilizador(arrayUtilizadores) {
    let utilizadoresTemporario = []
    //transformar os objetos em instâncias da classe Utilizador
    for (let i in arrayUtilizadores) {
        utilizadoresTemporario.push(Object.assign(new Utilizador(), arrayUtilizadores[i]))
    }
    utilizadores = utilizadoresTemporario
}

function transformarEmInstanciaGenero(arrayGeneros) {
    let generosTemporarios = []
    //transformar os objetos em instâncias da classe Genero
    for (let i in arrayGeneros) {
        generosTemporarios.push(Object.assign(new Genero(), arrayGeneros[i]))
    }
    generos = generosTemporarios
}

function transformarEmInstanciaTag(arrayTags) {
    let tagsTemporarias = []
    //transformar os objetos em instâncias da classe Tag
    for (let i in arrayTags) {
        tagsTemporarias.push(Object.assign(new Tag(), arrayTags[i]))
    }
    tags = tagsTemporarias
}


/*
    PAINEL ADMIN
*/
function atualizarFotoNome() {
    //nome utilizador logado
    let nomeUtilizadorLogado = document.getElementById("nomeUtilizadorLogado")
    nomeUtilizadorLogado.innerHTML = Utilizador.getPrimeiroUltimoNomeById(idUtilizadorLogado)

    //foto utilizador logado
    let fotoUtilizadorLogado = document.getElementById("fotoUtilizadorLogado")
    fotoUtilizadorLogado.src = Utilizador.getUrlFotoById(idUtilizadorLogado)
}
