class Utilizador {
    constructor(nome, email, password, urlFoto) {
        this._id = Utilizador.getUltimoId() + 1
        this.nome = nome
        this.email = email
        this.password = password
        this.urlFoto = urlFoto
        this.requisicoes = 0
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
        this.nome = valor
    }

    get email() {
        return this._email
    }
    set email(valor) {
        this.email = valor
    }

    get password() {
        return this._password
    }
    set password(valor) {
        this.password = valor
    }

    get urlFoto() {
        return this._urlFoto
    }
    set urlFoto(valor) {
        this.urlFoto = valor
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
        this.titulo = valor
    }

    get autor() {
        return this._autor
    }
    set autor(valor) {
        this.autor = valor
    }

    get ano() {
        return this._ano
    }
    set ano(valor) {
        this.ano = valor
    }

    get idGenero() {
        return this._idGenero
    }
    set idGenero(valor) {
        this.idGenero = valor
    }

    get tags() {
        return this._tags
    }
    set tags(valor) {
        this.tags = valor
    }

    get editora() {
        return this._editora
    }
    set editora(valor) {
        this.editora = valor
    }

    get paginas() {
        return this._paginas
    }
    set paginas(valor) {
        this.paginas = valor
    }

    get estado() {
        return this._estado
    }
    set estado(valor) {
        this.estado = valor
    }

    get dataDoacao() {
        return this._dataDoacao
    }
    set dataDoacao(valor) {
        this.dataDoacao = valor
    }

    get codigoBiblioteca() {
        return this._codigoBiblioteca
    }
    set codigoBiblioteca(valor) {
        this.codigoBiblioteca = valor
    }

    get idDoador() {
        return this._idDoador
    }
    set idDoador(valor) {
        this.idDoador = valor
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
        this.freguesia = valor
    }

    get morada() {
        return this._morada
    }
    set morada(valor) {
        this.morada = valor
    }

    get coordenadas() {
        return this._coordenadas
    }
    set coordenadas(valor) {
        this.coordenadas = valor
    }

    get capacidade() {
        return this._capacidade
    }
    set capacidade(valor) {
        this.capacidade = valor
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
        this.idUtilizador = valor
    }

    get idLivro() {
        return this._idLivro
    }
    set idLivro(valor) {
        this.idLivro = valor
    }

    get dataRequisicao() {
        return this._dataRequisicao
    }
    set dataRequisicao(valor) {
        this.dataRequisicao = valor
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
        this.idUtilizador = valor
    }

    get idLivro() {
        return this._idLivro
    }
    set idLivro(valor) {
        this.idLivro = valor
    }

    get comentario() {
        return this._comentario
    }
    set comentario(valor) {
        this.comentario = valor
    }

    get pontuacao() {
        return this._pontuacao
    }
    set pontuacao(valor) {
        this.pontuacao = valor
    }
}

let utilizadores = []

window.onload = function() {
    //form adicionar utilizador
    let frmAdmUtilizador = document.getElementById("frmAdmUtilizador")
    let inputAdmUtilizadorNome = document.getElementById("inputAdmUtilizadorNome")
    let inputAdmUtilizadorEmail = document.getElementById("inputAdmUtilizadorEmail")
    let inputAdmUtilizadorPassword = document.getElementById("inputAdmUtilizadorPassword")
    let inputAdmUtilizadorFoto = document.getElementById("inputAdmUtilizadorFoto")

    frmAdmUtilizador.addEventListener("submit", function(event) {
        


        event.preventDefault()
    })

}

function gerarTabelaUtilizadores() {
    str = ""

    document.getElementById("tabelaUtilizadores").innerHTML = str
}
