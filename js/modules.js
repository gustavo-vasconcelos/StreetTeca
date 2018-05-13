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
    constructor(urlCapa, titulo, autor, descricao, ano, idGenero, idTags, editora, paginas, estado, dataDoacao, idBiblioteca, idDoador = -1) {
        this._id = Livro.getUltimoId() + 1
        this.urlCapa = urlCapa
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
        this.idBiblioteca = idBiblioteca
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

    get urlCapa() {
        return this._urlCapa
    }
    set urlCapa(valor) {
        valor = (valor === "") ? "../img/capaLivro.jpg" : valor
        this._urlCapa = valor
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

    get idBiblioteca() {
        return this._idBiblioteca
    }
    set idBiblioteca(valor) {
        this._idBiblioteca = valor
    }

    get idDoador() {
        return this._idDoador
    }
    set idDoador(valor) {
        this._idDoador = valor
    }

    estadoToString() {
        switch (this.estado) {
            case 0:
                return "Fraco"
                break;
            case 1:
                return "Aceitável"
                break;
            case 2:
                return "Bom"
                break;
        }
    }

    getPontuacaoTotal() {
        return Comentario.getPontuacaoByIdLivro(this.id)
    }

    getPontuacaoMedia() {
        return (Comentario.getQuantidadePontuacoesByIdLivro(this.id) !== 0) ?
        (Comentario.getPontuacaoByIdLivro(this.id) / Comentario.getQuantidadePontuacoesByIdLivro(this.id)).toFixed(1) : 0
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

    static getPercLivrosPorGenero(idGenero) {
        let quantidade = 0
        if (livros.length > 0) {
            for (let i in livros) {
                if (livros[i].idGenero === idGenero) {
                    quantidade++
                }
            }
            return Math.floor((quantidade * 100) / livros.length)
        } else {
            return 0
        }
    }

    static getTituloById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].titulo
            }
        }
    }

    static removerLivroById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                livros.splice(i, 1)
            }
        }
    }

    static getLivrosRecentes() {
        let livrosRecentes = []
        for (let i = livros.length - 1; i >= livros.length - 11; i--) {
            try {
                if (livros[i].id) {
                    livrosRecentes.push(livros[i])
                }
            } catch (err) {

            }
        }
        return livrosRecentes
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

    getCapacidadeAtual() {
        let livrosNaBiblioteca = 0
        for (let i in livros) {
            if (livros[i].idBiblioteca === this.id) {
                livrosNaBiblioteca++
            }
        }
        return this.capacidade - livrosNaBiblioteca
    }

    static getConcelhoFreguesiaById(id) {
        for (let i in bibliotecas) {
            if (bibliotecas[i].id === id) {
                return [Concelho.getConcelhoById(bibliotecas[i].idConcelho), Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)]
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

    static removerBibliotecaByIdConcelho(idConcelho) {
        if (bibliotecas.length > 0) {
            for (let i = bibliotecas.length - 1; i >= 0; i--) {
                if (bibliotecas[i].idConcelho === idConcelho) {
                    bibliotecas.splice(i, 1)
                }
            }
        }
    }

    static removerBibliotecaByIdFreguesia(idFreguesia) {
        if (bibliotecas.length > 0) {
            for (let i = bibliotecas.length - 1; i >= 0; i--) {
                if (bibliotecas[i].idFreguesia === idFreguesia) {
                    bibliotecas.splice(i, 1)
                }
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

    static getPontuacaoByIdLivro(idLivro) {
        let pontuacao = 0
        for (let i in comentarios) {
            if (comentarios[i].idLivro === idLivro) {
                pontuacao += comentarios[i].pontuacao
            }
        }
        return pontuacao
    }

    static getQuantidadePontuacoesByIdLivro(idLivro) {
        let quantidade = 0
        for (let i in comentarios) {
            if (comentarios[i].idLivro === idLivro) {
                quantidade++
            }
        }
        return quantidade
    }

    static getIdsLivrosMaisPontuados() {
        let ids = []
        let pontuacoes = []
        for (let i in comentarios) {
            if (ids.indexOf(comentarios[i].idLivro) === -1) {
                ids.push(comentarios[i].idLivro)
                pontuacoes.push([Comentario.getPontuacaoByIdLivro(comentarios[i].idLivro), comentarios[i].idLivro])
            }
        }

        function comparar(a, b) {
            if (a[0] > b[0]) {
                return -1;
            }
            if (a[0] < b[0]) {
                return 1;
            }
            return 0;
        }

        pontuacoes.sort(comparar)

        if(pontuacoes.length > 5) {
            pontuacoes.length = 5
        }

        ids = []

        for(let i in pontuacoes) {
            ids.push(pontuacoes[i][1])
        }

        return ids
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

    static getIdsByNomes(nomes) {
        let ids = []
        for (let i in tags) {
            for (let j in nomes) {
                if (tags[i].nome.toLowerCase() === nomes[j]) {
                    ids.push(tags[i].id)
                }
            }
        }
        return ids
    }

    static getNomeById(id) {
        for (let i in tags) {
            if (tags[i].id === id) {
                return tags[i].nome
            }
        }
    }

    static getNomesByIds(ids) {
        let nomes = []
        for (let i in tags) {
            for (let j in ids) {
                if (tags[i].id === ids[j]) {
                    nomes.push(Tag.getNomeById(tags[i].id))
                }
            }
        }
        return nomes
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
    constructor(concelho) {
        this._id = Concelho.getUltimoId() + 1
        this.concelho = concelho
    }

    get concelho() {
        return this._concelho
    }
    set concelho(valor) {
        this._concelho = valor
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
        this._id = Freguesia.getUltimoId() + 1
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

    get id() {
        return this._id
    }

    static getIdByIdConcelhoFreguesia(idConcelho, freguesia) {
        let id = -1
        if (freguesia.length > 0) {
            for (let i in freguesias) {
                if (freguesias[i].idConcelho === idConcelho && freguesias[i].freguesia.toLowerCase() === freguesia.toLowerCase()) {
                    id = freguesias[i].id
                }
            }
        }
        return id
    }

    static getIdByFreguesia(freguesia) {
        let id = -1
        for (let i in freguesias) {
            if (freguesias[i].freguesia.toLowerCase() === freguesia.toLowerCase()) {
                id = freguesias[i].id
            }
        }
        return id
    }

    static getUltimoId() {
        let id = 0
        if (freguesias.length > 0) {
            for (let i in freguesias) {
                id = freguesias[i].id
            }
        }
        return id
    }

    static getQuantidadeFreguesiaByIdConcelho(idConcelho) {
        let quantidade = 0
        for (let i in freguesias) {
            if (freguesias[i].idConcelho === idConcelho) {
                quantidade++
            }
        }
        return quantidade
    }

    static getFreguesiasByIdConcelho(idConcelho) {
        let listaFreguesias = []
        for (let i in freguesias) {
            if (freguesias[i].idConcelho === idConcelho) {
                listaFreguesias.push(freguesias[i].freguesia)
            }
        }
        return listaFreguesias
    }

    static removerFreguesiasByIdConcelho(idConcelho) {
        if (freguesias.length > 0) {
            for (let i = freguesias.length - 1; i >= 0; i--) {
                if (freguesias[i].idConcelho === idConcelho) {
                    freguesias.splice(i, 1)
                }
            }
        }
    }

    static getFreguesiaById(id) {
        for (let i in freguesias) {
            if (freguesias[i].id === id) {
                return freguesias[i].freguesia
            }
        }
    }

    static removerFreguesiaById(id) {
        for (let i in freguesias) {
            if (freguesias[i].id === id) {
                freguesias.splice(i, 1)
            }
        }
    }

    static getIdConcelhoById(id) {
        for (let i in freguesias) {
            if (freguesias[i].id === id) {
                return freguesias[i].idConcelho
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
let concelhos = []
let freguesias = []
let testemunhos = []

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
concelhos.push(new Concelho("Vila do Conde"))
concelhos.push(new Concelho("Póvoa de Varzim"))

if (!localStorage.getItem("concelhos")) {
    localStorage.setItem("concelhos", JSON.stringify(concelhos))
    concelhos = JSON.parse(localStorage.getItem("concelhos"))
}

//freguesias predefinidas
freguesias.push(new Freguesia(1, "Vila do Conde"))
freguesias.push(new Freguesia(1, "Azurara"))
freguesias.push(new Freguesia(2, "Póvoa de Varzim"))

if (!localStorage.getItem("freguesias")) {
    localStorage.setItem("freguesias", JSON.stringify(freguesias))
    freguesias = JSON.parse(localStorage.getItem("freguesias"))
}

//bibliotecas predefinidas
bibliotecas.push(new Biblioteca(2, 3, "R. Dom Sancho I 1, 4490 Argivai, Portugal", 300, "Top", { lat: 41.36615219999999, lng: -8.7394442 }))

if (!localStorage.getItem("bibliotecas")) {
    localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas))
    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
}

//livros predefinidos
livros.push(new Livro("https://img.wook.pt/images/a-guerra-dos-tronos-george-r-r-martin/MXwxOTY1MTF8MjQ3OTIzfDEzODM1MjMyMDAwMDA=/502x", "A Guerra dos Tronos", ["George R.R. Martin"], `Quando Eddard Stark, lorde do castelo de Winterfell, recebe a visita do velho amigo, o rei Robert Baratheon,
está longe de adivinhar que a sua vida,e a da sua família, está prestes a entrar numa espiral de tragédia, conspiração e morte.`, 2008, 2, [3, 4, 5], "Saída de Emergência", 400, 1, "2018-05-02", 1, -1))
livros.push(new Livro("https://img.wook.pt/images/os-100-kass-morgan/MXwxNjU5MTM3MHwxMjIwMTAzNXwxNDk0OTc1NjAwMDAw/502x", "Os 100", ["Kass Morgan"], `Há muito tempo, a superfície da Terra foi arrasada por uma guerra nuclear.
Os poucos sortudos que conseguiram sobreviver refugiaram-se a bordo da Colónia, uma estação espacial que orbita o planeta.`, 2015, 1, [3, 4, 5], "TopSeller", 288, 1, "2018-05-02", 1, -1))
livros.push(new Livro("https://img.wook.pt/images/os-jogos-da-fome-suzanne-collins/MXwyODQzMTU2fDIzOTc5MTJ8MTQ0NzExMzYwMDAwMA==/502x", "Os Jogos da Fome", ["Suzanne Collins"], `Num futuro pós-apocalíptico, surge das cinzas do que foi a América do Norte Panem,
uma nova nação governada por um regime totalitário que a partir da megalópole, Capitol, governa os doze Distritos com mão de ferro.`, 2009, 3, [3, 4, 5], "Editorial Presença", 268, 1, "2018-05-02", 1, -1))
livros.push(new Livro("https://img.wook.pt/images/o-rapaz-do-pijama-as-riscas-john-boyne/MXwyMDAzOTB8MjU4MTk2fDEzODM1MjMyMDAwMDA=/502x", "O Rapaz do Pijama às Riscas", ["John Boyne"], `Ao regressar da escola um dia, Bruno constata que as suas coisas estão a ser empacotadas.
O seu pai tinha sido promovido no trabalho e toda a família tem de deixar a luxuosa casa onde vivia e mudar-se para outra cidade, onde Bruno não encontra ninguém com quem brincar nem nada para fazer.`, 2008, 3, [3, 4, 5], "Edições Asa", 176, 1, "2018-05-02", 1, -1))
livros.push(new Livro("https://img.wook.pt/images/o-marciano-andy-weir/MXwxNTc1ODc5MXwxMTI1Mzg4NXwxNDQxMTQ4NDAwMDAw/502x", "O Marciano", ["Andy Weir"], `Há exatamente seis dias, o astronauta Mark Watney tornou-se uma das primeiras pessoas a caminhar em Marte.
Agora, ele tem a certeza de que vai ser a primeira pessoa a morrer ali.`, 2014, 3, [3, 4, 5], "TopSeller", 384, 1, "2018-05-02", 1, -1))
livros.push(new Livro("https://img.wook.pt/images/o-nome-do-vento-patrick-rothfuss/MXwyMTQ1MjAwfDE4ODMyOTN8MTUxNzc4ODgwMDAwMA==/502x", "O Nome do Vento", ["Patrick Rothfuss"], `Da infância como membro de uma família unida de nómadas Edema Ruh até à provação dos primeiros dias como aluno de magia numa universidade prestigiada,
o humilde estalajadeiro Kvothe relata a história de como um rapaz desfavorecido pelo destino se torna um herói, um bardo, um mago e uma lenda.`, 2009, 3, [3, 4, 5], "Edições Gailivro", 976, 1, "2018-05-02", 1, -1))
livros.push(new Livro("https://img.wook.pt/images/o-tatuador-de-auschwitz-heather-morris/MXwyMTM3MDQwNnwxNzI1MjkwM3wxNTE2NzUyMDAwMDAw/502x", "O Tatuador de Auschwitz", ["Heather Morris"], `Em 1942, Lale Sokolov chega a Auschwitz-Birkenau.
Ali é incumbido da tarefa de tatuar os prisioneiros marcados para sobreviver - gravando uma sequência de números no braço de outras vítimas como ele - com uma tinta indelével.`, 2018, 3, [3, 4, 5], "Editorial Presença", 232, 1, "2018-05-02", 1, -1))


if (!localStorage.getItem("livros")) {
    localStorage.setItem("livros", JSON.stringify(livros))
    livros = JSON.parse(localStorage.getItem("livros"))
}

//comentários predefinidos
comentarios.push(new Comentario(1, 1, "Top.", 5))
comentarios.push(new Comentario(1, 2, "Top.", 5))
comentarios.push(new Comentario(2, 3, "Top.", 2))
comentarios.push(new Comentario(2, 4, "Top.", 3))
comentarios.push(new Comentario(3, 1, "Top.", 5))
comentarios.push(new Comentario(3, 2, "Top.", 2))
comentarios.push(new Comentario(4, 1, "Top.", 4))
comentarios.push(new Comentario(4, 2, "Top.", 3))
comentarios.push(new Comentario(4, 3, "Top.", 3))
comentarios.push(new Comentario(4, 4, "Top.", 4))
comentarios.push(new Comentario(4, 5, "Top.", 5))
comentarios.push(new Comentario(4, 6, "Top.", 4))

if (!localStorage.getItem("comentarios")) {
    localStorage.setItem("comentarios", JSON.stringify(comentarios))
    comentarios = JSON.parse(localStorage.getItem("comentarios"))
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

function transformarEmInstanciaFreguesia(arrayFreguesias) {
    let freguesiasTemporarias = []
    //transformar os objetos em instâncias da classe Freguesia
    for (let i in arrayFreguesias) {
        freguesiasTemporarias.push(Object.assign(new Freguesia(), arrayFreguesias[i]))
    }
    freguesias = freguesiasTemporarias
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
    //transformar os objetos em instâncias da classe Livro
    for (let i in arrayLivros) {
        livrosTemporarios.push(Object.assign(new Livro(), arrayLivros[i]))
    }
    livros = livrosTemporarios
}

function transformarEmInstanciaComentario(arrayComentarios) {
    let comentariosTemporarios = []
    //transformar os objetos em instâncias da classe Comentario
    for (let i in arrayComentarios) {
        comentariosTemporarios.push(Object.assign(new Comentario(), arrayComentarios[i]))
    }
    comentarios = comentariosTemporarios
}

function transformarEmInstanciaTestemunho(arrayTestemunhos) {
    let testemunhosTemporarios = []
    //transformar os objetos em instâncias da classe Testemunho
    for (let i in arrayTestemunhos) {
        testemunhosTemporarios.push(Object.assign(new Testemunho(), arrayTestemunhos[i]))
    }
    testemunhos = testemunhosTemporarios
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