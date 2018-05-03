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