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

    static getPercUtilizadoresPorTipoAcesso(tipoAcesso) {
        let quantidade = 0
        if (utilizadores.length > 0) {
            for (let i in utilizadores) {
                if (utilizadores[i].tipoAcesso === tipoAcesso) {
                    quantidade++
                }
            }
            return Math.floor((quantidade * 100) / utilizadores.length)
        } else {
            return 0
        }
    }
}

class Livro {
    constructor(titulo, autor, descricao, ano, idGenero, idTags, editora, paginas, estado, dataDoacao, codigoBiblioteca, idDoador = -1) {
        this._id = Livro.getUltimoId() + 1
        this.titulo = titulo
        this.autor = autor
        this.descricao = descricao
        this.ano = ano
        this.idGenero = idGenero
        this.idTags = idTags
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

    get descricao() {
        return this._descricao
    }
    set descricao(valor) {
        this._descricao = valor
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

    get idTags() {
        return this._idTags
    }
    set idTags(valor) {
        this._idTags = valor
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

    static getGeneros() {
        let generosLivros = []
        for (let i in livros) {
            if (generosLivros.indexOf(Genero.getNomeById(livros[i].idGenero)) === -1) {
                generosLivros.push(Genero.getNomeById(livros[i].idGenero))
            }
        }
        return generosLivros
    }

}

class Biblioteca {
    constructor(idConcelho, idFreguesia, morada, capacidade, descricao, coordenadas) {
        this._id = Biblioteca.getUltimoId() + 1
        this.idConcelho = idConcelho
        this.idFreguesia = idFreguesia
        this.morada = morada
        this.capacidade = capacidade
        this.descricao = descricao
        this.coordenadas = coordenadas
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

    get idConcelho() {
        return this._idConcelho
    }
    set idConcelho(valor) {
        this._idConcelho = valor
    }

    get idFreguesia() {
        return this._idFreguesia
    }
    set idFreguesia(valor) {
        this._idFreguesia = valor
    }

    get morada() {
        return this._morada
    }
    set morada(valor) {
        this._morada = valor
    }

    get descricao() {
        return this._descricao
    }
    set descricao(valor) {
        this._descricao = valor
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

    static getIdByConcelhoFreguesia(concelho, freguesia) {
        let id = -1
        for (let i in bibliotecas) {
            if (bibliotecas[i].idConcelho === concelho && bibliotecas[i].idFreguesia === freguesia) {
                id = bibliotecas[i].id
            }
        }
        return id
    }

    static getConcelhoFreguesiaById(id) {
        for (let i in bibliotecas) {
            if (bibliotecas[i].id === id) {
                return [bibliotecas[i].concelho, bibliotecas[i].freguesia]
            }
        }
    }

    //https://stackoverflow.com/questions/247483/http-get-request-in-javascript
    static getCoordenadasByMorada(morada) {
        let url = `https://maps.google.com/maps/api/geocode/json?address=${morada}&key=AIzaSyBwpPEcOyiz4v8GA9Hwo4W_LYlYQmfArS0`
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", url, false)
        xmlHttp.send(null)
        let resposta = JSON.parse(xmlHttp.responseText)
        //devolve um array com a morada (índice 0) e coordenadas (índice 1)
        return [resposta.results[0].formatted_address, resposta.results[0].geometry.location]
    }

    static removerBibliotecaById(id) {
        for (let i in bibliotecas) {
            if (bibliotecas[i].id === id) {
                bibliotecas.splice(i, 1)
            }
        }
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

class Concelho {
    constructor(concelho, freguesias) {
        this._id = Concelho.getUltimoId() + 1
        this.concelho = concelho
        this.freguesias = freguesias
    }

    get concelho() {
        return this._concelho
    }
    set concelho(valor) {
        this._concelho = valor
    }

    get freguesias() {
        return this._freguesias
    }
    set freguesias(valor) {
        //transforma a string em array
        valor = (valor) ? valor.split(",") : valor
        //remove valores vazios do array
        if (valor && valor.length > 1) {
            for (let i = valor.length; i >= 0; i--) {
                if (!valor[i]) {
                    valor.splice(i, 1)
                } else {
                    if (valor[i].indexOf(" ") === 0) {
                        valor[i] = valor[i].slice(1, valor[i].length)
                    }
                }
            }
        }
        this._freguesias = valor
    }

    get id() {
        return this._id
    }

    static getUltimoId() {
        let id = 0
        if (concelhos.length > 0) {
            for (let i in concelhos) {
                id = concelhos[i].id
            }
        }
        return id
    }

    static getIdByConcelho(concelho) {
        let id = -1
        for (let i in concelhos) {
            if (concelhos[i].concelho.toLowerCase() === concelho.toLowerCase()) {
                id = concelhos[i].id
            }
        }
        return id
    }

    static getConcelhoById(id) {
        for (let i in concelhos) {
            if (concelhos[i].id === id) {
                return concelhos[i].concelho
            }
        }
    }

    static removerConcelhoById(id) {
        for (let i in concelhos) {
            if (concelhos[i].id === id) {
                concelhos.splice(i, 1)
            }
        }
    }
}

class Freguesia {
    constructor(idConcelho, freguesia) {
        this.idConcelho = idConcelho
        this.freguesia = freguesia
    }

    get idConcelho() {
        return this._idConcelho
    }
    set idConcelho(valor) {
        this._idConcelho = valor
    }

    get freguesia() {
        return this._freguesia
    }
    set freguesia(valor) {
        this._freguesia = valor
    }
}


let utilizadores = []
let livros = []
let bibliotecas = []
let requisicoes = []
let comentarios = []
let generos = []
let tags = []
let concelhos = []


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

//concelhos predefinidos
concelhos.push(new Concelho("Vila do Conde", "Vila do Conde"))

if (!localStorage.getItem("concelhos")) {
    localStorage.setItem("concelhos", JSON.stringify(concelhos))
    concelhos = JSON.parse(localStorage.getItem("concelhos"))
}

//bibliotecas predefinidas
bibliotecas.push(new Biblioteca(""))


//livros predefinidos
livros.push(new Livro("A Guerra dos Tronos", "George R.R. Martin", `Quando Eddard Stark, lorde do castelo de Winterfell, recebe a visita do velho amigo, o rei Robert Baratheon,
está longe de adivinhar que a sua vida,e a da sua família, está prestes a entrar numa espiral de tragédia, conspiração e morte. Durante a estadia,
o rei convida Eddard a mudar-se para a corte e a assumir a prestigiada posição de Mão do Rei. Este aceita,
mas apenas porque desconfia que o anterior detentor desse título foi envenenado pela própria rainha: uma cruel manipuladora do clã Lannister.
Assim, perto do rei, Eddard tem esperança de o proteger da rainha.
Mas ter os Lannister como inimigos é fatal: a ambição dessa família não tem limites e o rei corre um perigo muito maior do que Eddard temia! Sozinho na corte,
Eddard também se apercebe que a sua vida nada vale. E até a sua família, longe no norte, pode estar em perigo. Uma galeria de personagens brilhantes dá vida a esta saga: o anão Tyrion,
ovelha negra do clã Lannister; Jon Snow, bastardo de Eddard Stark que decide juntar-se à Patrulha da Noite, e a princesa Daenerys Targaryen,
da dinastia que reinou antes de Robert, que pretende ressuscitar os dragões do passado para recuperar o trono, custe o que custar.`, 2008, 2, [4, 5], "Saída de Emergência", 400, 1, "2018-05-02", 1, -1))

if (!localStorage.getItem("livros")) {
    localStorage.setItem("livros", JSON.stringify(livros))
    livros = JSON.parse(localStorage.getItem("livros"))
}


requisicoes.push(new Requisicao(1, 1, "2018-05-02"))
requisicoes.push(new Requisicao(1, 2, "2018-05-02"))


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

function transformarEmInstanciaConcelho(arrayConcelhos) {
    let concelhosTemporarios = []
    //transformar os objetos em instâncias da classe Concelho
    for (let i in arrayConcelhos) {
        concelhosTemporarios.push(Object.assign(new Concelho(), arrayConcelhos[i]))
    }
    concelhos = concelhosTemporarios
}

function transformarEmInstanciaBiblioteca(arrayBibliotecas) {
    let bibliotecasTemporarias = []
    //transformar os objetos em instâncias da classe Biblioteca
    for (let i in arrayBibliotecas) {
        bibliotecasTemporarias.push(Object.assign(new Biblioteca(), arrayBibliotecas[i]))
    }
    bibliotecas = bibliotecasTemporarias
}

function transformarEmInstanciaLivro(arrayLivros) {
    let livrosTemporarios = []
    //transformar os objetos em instâncias da classe Biblioteca
    for (let i in arrayLivros) {
        livrosTemporarios.push(Object.assign(new Livro(), arrayLivros[i]))
    }
    livros = livrosTemporarios
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