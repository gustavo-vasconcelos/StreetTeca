class Utilizador {
    constructor(nome, email, password, urlFoto, dataInscricao, tipoAcesso = 2) {
        this._id = Utilizador.getUltimoId() + 1
        this.nome = nome
        this.email = email
        this.password = password
        this.urlFoto = urlFoto
        this.dataInscricao = dataInscricao        
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
        valor = (valor === "") ? "img/perfil.png" : valor
        this._urlFoto = valor
    }

    get tipoAcesso() {
        return this._tipoAcesso
    }
    set tipoAcesso(valor) {
        this._tipoAcesso = valor
    }

    get dataInscricao() {
        return this._dataInscricao
    }
    set dataInscricao(valor) {
        this._dataInscricao = valor
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
        if (id !== -1) {
            for (let i in utilizadores) {
                if (utilizadores[i].id === id) {
                    return utilizadores[i].tipoAcesso
                }
            }
        }
        if (id === -1) {
            return 2
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
                    ultimo = nome.substr(nome.lastIndexOf(" ") + 1, nome.length)
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

    dataToString() {
        return this.dataInscricao.substr(0, this.dataInscricao.indexOf("T")) + ", " + this.dataInscricao.substr(this.dataInscricao.indexOf("T") + 1, this.dataInscricao.length)
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
        valor = (valor === "") ? "img/capaLivro.jpg" : valor
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

    autorToString(dir = "") {
        let autorString = []
        for (let i in this.autor) {
            autorString.push(`<a href="${dir}autor.html" class="autor${this.autor[i]} clicarAutor livro-autor">${Autor.getNomeById(this.autor[i])}</a>`)
        }

        return (autorString.length <= 2) ? autorString.join(" & ") : autorString.join(", ")
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
            parseFloat((Comentario.getPontuacaoByIdLivro(this.id) / Comentario.getQuantidadePontuacoesByIdLivro(this.id)).toFixed(1)) : 0
    }

    getQuantidadeRequisicoes() {
        return Requisicao.getQuantidadeRequisicoesByIdLivro(this.id)
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

    static getIdsByIdGenero(idGenero) {
        let ids = []
        for (let i in livros) {
            if (livros[i].idGenero === idGenero) {
                ids.push(livros[i].id)
            }
        }
        return ids
    }

    static getIdsByIdTag(idTag) {
        let ids = []
        for (let i in livros) {
            for (let j in livros[i].idTags) {
                if (livros[i].idTags[j] === idTag) {
                    ids.push(livros[i].id)
                }
            }
        }
        return ids
    }

    static getIdsByIdBiblioteca(idBiblioteca) {
        let ids = []
        for (let i in livros) {
            if (livros[i].idBiblioteca === idBiblioteca) {
                ids.push(livros[i].id)
            }
        }
        return ids
    }

    static getAutorById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].autor
            }
        }
    }

    static getIdGeneroById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].idGenero
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

    static removerLivrosByIdGenero(idGenero) {
        for (let i = livros.length - 1; i <= 0; i--) {
            if (livros[i].idGenero === idGenero) {
                livros.splice(i, 1)
            }
        }
    }

    static getUrlCapaById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].urlCapa
            }
        }
    }

    static getIdTagsById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].idTags
            }
        }
    }

    static getIdsAleatoriosByIdGeneroIdTags(idGenero, idTags) {
        let ids = []
        for (let i in livros) {
            for (let j in idTags) {
                for (let k in livros[i].idTags) {
                    if (livros[i].idGenero === idGenero || livros[i].idTags[k] === idTags[j]) {
                        if (ids.indexOf(livros[i].id) === -1) {
                            ids.push(livros[i].id)
                        }
                    }
                }
            }
        }

        shuffle(ids)

        return ids
    }

    static getIdsAleatoriosByIdGenero(idGenero) {
        let ids = []
        for (let i in livros) {
            if (livros[i].idGenero === idGenero) {
                if (ids.indexOf(livros[i].id) === -1) {
                    ids.push(livros[i].id)
                }
            }
        }

        shuffle(ids)

        return ids
    }

    static getIdBibliotecaById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].idBiblioteca
            }
        }
    }

    static getTitulosByIdGenero(idGenero) {
        let titulos = []
        for (let i in livros) {
            if (livros[i].idGenero === idGenero) {
                titulos.push(livros[i].titulo)
            }
        }
        return titulos
    }

    static getTitulosByIdTag(idTag) {
        let titulos = []
        for (let i in livros) {
            for (let j in livros[i].idTags) {
                if (livros[i].idTags[j] === idTag) {
                    titulos.push(livros[i].titulo)
                }
            }
        }
        return titulos
    }

    static getTitulosByIdAutor(idAutor) {
        let titulos = []
        for (let i in livros) {
            for (let j in livros[i].autor) {
                if (livros[i].autor[j] === idAutor) {
                    titulos.push(livros[i].titulo)
                }
            }
        }
        return titulos
    }

    static ordenarMaisRequisitados(a, b) {
        if (a.getQuantidadeRequisicoes() > b.getQuantidadeRequisicoes()) {
            return 1
        } else if (a.getQuantidadeRequisicoes() < b.getQuantidadeRequisicoes()) {
            return -1
        } else {
            return 0
        }
    }

    static ordenarAZ(a, b) {
        if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
            return 1
        } else if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
            return -1
        } else {
            return 0
        }
    }

    static ordenarZA(a, b) {
        if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
            return 1
        } else if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
            return -1
        } else {
            return 0
        }
    }

    static ordenarMaiorPontuacao(a, b) {
        if (a.getPontuacaoTotal() < b.getPontuacaoTotal()) {
            return 1
        } else if (a.getPontuacaoTotal() > b.getPontuacaoTotal()) {
            return -1
        } else {
            return 0
        }
    }

    static ordenarMenorPontuacao(a, b) {
        if (a.getPontuacaoTotal() > b.getPontuacaoTotal()) {
            return 1
        } else if (a.getPontuacaoTotal() < b.getPontuacaoTotal()) {
            return -1
        } else {
            return 0
        }
    }

    static ordenarMaiorDataDoacao(a, b) {
        if (a.dataDoacao < b.dataDoacao) {
            return 1
        } else if (a.dataDoacao > b.dataDoacao) {
            return -1
        } else {
            return 0
        }
    }

    static ordenarMenorDataDoacao(a, b) {
        if (a.dataDoacao > b.dataDoacao) {
            return 1
        } else if (a.dataDoacao < b.dataDoacao) {
            return -1
        } else {
            return 0
        }
    }

    static getIdsByPalavra(palavra) {
        let ids = []
        palavra = palavra.split(" ")
        for (let i in palavra) {
            for (let j in livros) {
                let titulo = livros[j].titulo.split(" ")
                for (let k in titulo) {
                    if (palavra[i].toLowerCase() === titulo[k].toLowerCase() && ids.indexOf(livros[j].id) === -1) {
                        ids.push(livros[j].id)
                    }
                }
            }
        }
        return ids
    }

    static getIdsByPesquisa(pesquisa) {
        let ids = []
        for (let i in livros) {
            if (livros[i].titulo.toLowerCase().includes(pesquisa.toLowerCase()) && ids.indexOf(livros[i].id) === -1) {
                ids.push(livros[i].id)
            }
        }
        return ids
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

    static getCoordenadasById(id) {
        for (let i in bibliotecas) {
            if (bibliotecas[i].id === id) {
                return bibliotecas[i].coordenadas
            }
        }
    }

    static getIdsBibliotecasEmUso() {
        let ids = []
        for (let i in livros) {
            if (ids.indexOf(livros[i].idBiblioteca) === -1) {
                ids.push(livros[i].idBiblioteca)
            }
        }
        ids.sort(sortNumero)
        return ids
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

    static getQuantidadeRequisicoesByIdLivro(idLivro) {
        let quantidade = 0
        for (let i in requisicoes) {
            if (requisicoes[i].idLivro === idLivro) {
                quantidade++
            }
        }
        return quantidade
    }

    static quantidadeRequisicoesByIdUtilizador(id) {
        /*
        let quantidade = 0
        for (let i in requisicoes) {
            if (requisicoes[i].idUtilizador === id) {
                quantidade++
            }
        }
        return quantidade*/
        return Requisicao.livrosRequisitadosByIdUtilizador(id).length
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

        if (pontuacoes.length > 5) {
            pontuacoes.length = 5
        }

        ids = []

        for (let i in pontuacoes) {
            ids.push(pontuacoes[i][1])
        }

        return ids
    }

    static removerComentarioById(id) {
        for (let i in comentarios) {
            if (comentarios[i].id === id) {
                comentarios.splice(i, 1)
            }
        }
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

    static getIdsTagsEmUso() {
        let ids = []
        for (let i in livros) {
            for (let j in livros[i].idTags) {
                if (ids.indexOf(livros[i].idTags[j]) === -1) {
                    ids.push(livros[i].idTags[j])
                }
            }
        }
        ids.sort(sortNumero)
        return ids
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

class Testemunho {
    constructor(testemunho, idUtilizador, estado) {
        this._id = Testemunho.getUltimoId() + 1
        this.testemunho = testemunho
        this.idUtilizador = idUtilizador
        this.estado = estado
    }

    get id() {
        return this._id
    }

    get testemunho() {
        return this._testemunho
    }
    set testemunho(valor) {
        this._testemunho = valor
    }

    get idUtilizador() {
        return this._idUtilizador
    }
    set idUtilizador(valor) {
        this._idUtilizador = valor
    }

    get estado() {
        return this._estado
    }
    set estado(valor) {
        this._estado = valor
    }

    static getUltimoId() {
        let id = 0
        if (testemunhos.length > 0) {
            for (let i in testemunhos) {
                id = testemunhos[i].id
            }
        }
        return id
    }

    static getIdsByEstado(estado) {
        let ids = []
        for (let i in testemunhos) {
            if (testemunhos[i].estado === estado) {
                ids.push(testemunhos[i].id)
            }
        }
        return ids
    }

    static getIdUtilizadorById(id) {
        for (let i in testemunhos) {
            if (testemunhos[i].id === id) {
                return testemunhos[i].idUtilizador
            }
        }
    }

    static removerTestemunhoById(id) {
        for (let i in testemunhos) {
            if (testemunhos[i].id === id) {
                testemunhos.splice(i, 1)
            }
        }
    }

    static getIdTestemunhosAleatorios(quantidade) {
        let ids = []
        if (Testemunho.getIdsByEstado(1).length >= quantidade) {
            let count = 0
            do {
                let id = Math.floor(Math.random() * Testemunho.getIdsByEstado(1).length) + 1
                if (ids.indexOf(id) === -1) {
                    ids.push(id)
                    count++
                }
            } while (count < quantidade)
        }
        return ids
    }
}

class Autor {
    constructor(nome, descricao, urlFoto) {
        this._id = Autor.getUltimoId() + 1
        this.nome = nome
        this.descricao = descricao
        this.urlFoto = urlFoto
    }

    get id() {
        return this._id
    }

    get nome() {
        return this._nome
    }
    set nome(valor) {
        this._nome = valor
    }

    get descricao() {
        return this._descricao
    }
    set descricao(valor) {
        this._descricao = valor
    }

    get urlFoto() {
        return this._urlFoto
    }
    set urlFoto(valor) {
        valor = (valor === "") ? "img/perfil.png" : valor
        this._urlFoto = valor
    }

    getLivrosPublicados() {
        let livrosPublicados = []
        for (let i in livros) {
            for (let j in livros[i].autor) {
                if (livrosPublicados.indexOf(livros[i].titulo) === -1 && livros[i].autor[j] === this.id) {
                    livrosPublicados.push(livros[i].titulo)
                }
            }
        }
        return livrosPublicados
    }

    static getNomeById(id) {
        for (let i in autores) {
            if (autores[i].id === id) {
                return autores[i].nome
            }
        }
    }

    static getIdByNome(nome) {
        for (let i in autores) {
            if (autores[i].nome === nome) {
                return autores[i].id
            }
        }
    }

    static getUltimoId() {
        let id = 0
        if (autores.length > 0) {
            for (let i in autores) {
                id = autores[i].id
            }
        }
        return id
    }

    static removerAutorById(id) {
        for (let i in autores) {
            if (autores[i].id === id) {
                autores.splice(i, 1)
            }
        }
    }

    static getIdsAutoresEmUso() {
        let ids = []
        for (let i in livros) {
            for (let j in livros[i].autor) {
                if (ids.indexOf(livros[i].autor[j]) === -1) {
                    ids.push(livros[i].autor[j])
                }
            }
        }
        ids.sort(sortNumero)
        return ids
    }
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function sortNumero(a, b) {
    return a - b;
}

function obterData(data) {
    let ano = data.getFullYear()
    let mes = ((data.getMonth() + 1) <= 9) ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1)
    let dia = (data.getDate() <= 9) ? "0" + data.getDate() : data.getDate()
    let hora = (data.getHours() <= 9) ? "0" + data.getHours() : data.getHours()
    let minutos = (data.getMinutes() <= 9) ? "0" + data.getMinutes() : data.getMinutes()
    let segundos = (data.getSeconds() <= 9) ? "0" + data.getSeconds() : data.getSeconds()
    return ano + "-" + mes + "-" + dia + "T" + hora + ":" + minutos + ":" + segundos
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
let autores = []
let configuracoes = {
    id: 1,
    diasRequisicao: 0,
    valorMultaDiaria: 0,
    valorMultaLimite: 1
}

let idLivroClicado = -1
if (!localStorage.getItem("idLivroClicado")) {
    localStorage.setItem("idLivroClicado", idLivroClicado)
}

function livroClicado() {
    let clicarLivro = document.getElementsByClassName("clicarLivro")
    for (let i = 0; i < clicarLivro.length; i++) {
        clicarLivro[i].addEventListener("click", function () {
            idLivroClicado = parseInt(clicarLivro[i].classList[0].replace(/livro/g, ""))
            localStorage.setItem("idLivroClicado", parseInt(idLivroClicado))
        })
    }
}

let idGeneroClicado = -1
if (!localStorage.getItem("idGeneroClicado")) {
    localStorage.setItem("idGeneroClicado", idGeneroClicado)
}

let idAutorClicado = -1
if (!localStorage.getItem("idAutorClicado")) {
    localStorage.setItem("idAutorClicado", idAutorClicado)
}

function autorClicado() {
    let clicarAutor = document.getElementsByClassName("clicarAutor")
    for (let i = 0; i < clicarAutor.length; i++) {
        clicarAutor[i].addEventListener("click", function () {
            idAutorClicado = parseInt(clicarAutor[i].classList[0].replace(/autor/g, ""))
            localStorage.setItem("idAutorClicado", parseInt(idAutorClicado))
        })
    }
}

if (!localStorage.getItem("configuracoes")) {
    localStorage.setItem("configuracoes", JSON.stringify(configuracoes))
    configuracoes = JSON.parse(localStorage.getItem("configuracoes"))
}


//utilizadores predefinidos
utilizadores.push(new Utilizador("Teste", "teste@teste.pt", "123", "", "2018-05-10T02:00:00", 0))
utilizadores.push(new Utilizador("Gustavo Henrique", "teste2@teste.pt", "123", "", "2018-05-10T02:00:00", 2))
utilizadores.push(new Utilizador("João Paixão Amorim", "teste3@teste.pt", "123", "", "2018-05-10T02:00:00", 1))
utilizadores.push(new Utilizador("Guilherme Leonardo Costa", "teste4@teste.pt", "123", "", "2018-05-10T02:00:00", 1))

if (!localStorage.getItem("utilizadores")) {
    localStorage.setItem("utilizadores", JSON.stringify(utilizadores))
    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
}

//géneros predefinidos
generos.push(new Genero("Fantasia")) //1
generos.push(new Genero("Ficção científica")) //2
generos.push(new Genero("Romance")) //3
generos.push(new Genero("Aventura")) //4
generos.push(new Genero("Literatura juvenil")) //5
generos.push(new Genero("Autoajuda")) //6

if (!localStorage.getItem("generos")) {
    localStorage.setItem("generos", JSON.stringify(generos))
    generos = JSON.parse(localStorage.getItem("generos"))
}


//tags predefinidas
tags.push(new Tag("guerra")) //1
tags.push(new Tag("medieval")) //2
tags.push(new Tag("armas")) //3
tags.push(new Tag("dragões")) //4
tags.push(new Tag("zombies")) //5
tags.push(new Tag("holocausto")) //6
tags.push(new Tag("espaço")) //7
tags.push(new Tag("pós-apocalíptico")) //8
tags.push(new Tag("distopia")) //9
tags.push(new Tag("histórico")) //10
tags.push(new Tag("sobrevivência")) //11
tags.push(new Tag("épico")) //12
tags.push(new Tag("magia")) //13
tags.push(new Tag("história-pessoal")) //14
tags.push(new Tag("epidemia")) //15
tags.push(new Tag("amor")) //16
tags.push(new Tag("reflexão")) //17
tags.push(new Tag("futurista")) //18
tags.push(new Tag("cultura-pop")) //19

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
freguesias.push(new Freguesia(1, "União de Freguesias de Retorta e Tougues"))
freguesias.push(new Freguesia(1, "Árvore"))
freguesias.push(new Freguesia(1, "Macieira da Maia"))
freguesias.push(new Freguesia(1, "Mindelo"))
freguesias.push(new Freguesia(1, "União de Freguesias de Fornelo e Vairão"))
freguesias.push(new Freguesia(1, "Fajozes"))
freguesias.push(new Freguesia(1, "Vila Chã"))
freguesias.push(new Freguesia(1, "Gião"))
freguesias.push(new Freguesia(1, "Modivas"))
freguesias.push(new Freguesia(1, "Guilhabreu"))
freguesias.push(new Freguesia(1, "União de Freguesias de Malta e Canidelo"))
freguesias.push(new Freguesia(1, "Aveleda"))
freguesias.push(new Freguesia(1, "Labruge"))
freguesias.push(new Freguesia(1, "União de Freguesias de Vilar e Mosteiró"))
freguesias.push(new Freguesia(1, "Junqueira"))
freguesias.push(new Freguesia(1, "União de Freguesias de Touginha e Touguinhó"))
freguesias.push(new Freguesia(1, "União de Freguesias de Rio Mau e Arcos"))
freguesias.push(new Freguesia(1, "União de Freguesias de Bagunte, Ferreiró, Outeiro Maior e Parada"))
freguesias.push(new Freguesia(2, "Argivai"))
freguesias.push(new Freguesia(2, "Beiriz"))
freguesias.push(new Freguesia(2, "Amorim"))
freguesias.push(new Freguesia(2, "A ver-o-Mar"))
freguesias.push(new Freguesia(2, "Aguçadoura"))
freguesias.push(new Freguesia(2, "Navais"))
freguesias.push(new Freguesia(2, "Terroso"))
freguesias.push(new Freguesia(2, "Estela"))
freguesias.push(new Freguesia(2, "Laundos"))
freguesias.push(new Freguesia(2, "Rates"))
freguesias.push(new Freguesia(2, "Balazar"))

if (!localStorage.getItem("freguesias")) {
    localStorage.setItem("freguesias", JSON.stringify(freguesias))
    freguesias = JSON.parse(localStorage.getItem("freguesias"))
}

//bibliotecas predefinidas
bibliotecas.push(new Biblioteca(1, 1, "R. Dom Sancho I 1, 4490 Argivai, Portugal", 300, "Top", { lat: 41.36615219999999, lng: -8.7394442 }))
bibliotecas.push(new Biblioteca(1, 7, "Praça de Mindelo, 4485-487 Mindelo, Portugal", 300, "Top", { lat: 41.3132966, lng: -8.7202863 }))

if (!localStorage.getItem("bibliotecas")) {
    localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas))
    bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
}

//autores predefinidos
autores.push(new Autor(
    "George R. R. Martin",
    "George R. R. Martin trabalhou dez anos em Hollywood como escritor e produtor de diversas séries e filmes de grande sucesso. Autor de muitos bestsellers, foi em meados dos anos 90 que começou a sua mais famosa obra: A Guerra dos Tronos. É a saga de fantasia mais vendida dos últimos anos e os direitos de televisão acabaram de ser vendidos à HBO - a produtora de Sopranos e Sete Palmos Abaixo de Terra.",
    "https://www.biography.com/.image/t_share/MTQ4NDc2MTkxNTY3NzgzMTE1/george_rr_martin_photo_mark_davis_wireimage_via_getty_images_164117282_resized.jpg"
)) //1
autores.push(new Autor(
    "Kass Morgan",
    "Kass Morgan é licenciada pela Universidade de Brown, nos Estados Unidos, e tem um mestrado pela Universidade de Oxford. Trabalha como editora e vive em Nova Iorque. O seu bestseller Os 100 foi adaptado a série de televisão.",
    "https://pbs.twimg.com/profile_images/603201094064345089/8IMC-1L0.jpg"
)) //2
autores.push(new Autor(
    "Suzanne Collins",
    "Suzanne Collins é autora de literatura infantojuvenil e argumentista de programas televisivos infantis. Em conjunto, os seus livros já venderam mais de 87 milhões de exemplares, sendo a sua obra mais conhecida a trilogia Os Jogos da Fome, com a qual conquistou os leitores dos mais de 50 países onde se encontra publicada, tornando-se bestseller à escala mundial e contando com uma magnífica adaptação ao cinema. A série de cinco volumes com Gregor como protagonista, publicada pela Presença, encontra-se traduzida em 20 países.",
    "http://www.panempropaganda.com/storage/suzanne-collins/SuzanneCollins.jpg?__SQUARESPACE_CACHEVERSION=1396807490040"
)) //3
autores.push(new Autor(
    "John Boyne",
    "John Boyne nasceu em Dublin, em 1971. Estudou no Trinity College, em Dublin, e na Universidade de East Anglia, em Norwich. Foi escritor-residente da Universidade de East Anglia para a área da Escrita Criativa e trabalhou durante vários anos como livreiro. Dedica-se actualmente à escrita a tempo inteiro. Publicou já quatro romances para adultos e um para jovens, tendo este último (O Rapaz do Pijama às Riscas) conhecido enorme sucesso em todo o mundo. Vive em Dublin.",
    "https://images.wook.pt/getresourcesservlet/GetResource?LxCPf1EJx8XGYsGgn2bmEwL931+3nazoq+5rRXa0NOk="
)) //4
autores.push(new Autor(
    "Andy Weir",
    "Andy Weir foi contratado aos quinze anos como programador por um laboratório americano e, desde então, tem vindo a trabalhar com engenheiro de software. Foi toda a vida um perito em questões espaciais, e um apaixonado por temas como Física Relativista, Mecânica Celeste e a história dos voos espaciais tripulados.",
    "https://hips.hearstapps.com/pop.h-cdn.co/assets/17/03/640x959/gallery-1484754547-gettyimages-488198406.jpg?resize=480:*"
)) //5
autores.push(new Autor(
    "Patrick Rothfuss",
    "Patrick Rothfuss vive no Wisconsin Central com a sua família. No seu tempo livre Pat escreve uma coluna satírica, pratica a desobediência civil e faz experiências com alquimia. Adora palavras, ri com frequência e recusa-se a dançar.O Nome do Vento e O Medo do Homem Sábio são os seus dois primeiros livros. Haverá mais.",
    "https://assets.wired.com/photos/w_660/wp-content/uploads/2014/10/rothfuss-inline.jpg"
)) //6
autores.push(new Autor(
    "Heather Morris",
    "Heather Morris nasceu na Nova Zelândia e reside atualmente na Austrália. Durante vários anos, enquanto trabalhava num hospital público em Melbourne, estudou e escreveu argumentos para cinema. Em 2003, Heather foi apresentada a um homem idoso que «tinha uma história que valia a pena contar». O dia em que conheceu Lale Sokolov mudou a vida de ambos, e à medida que a amizade entre os dois crescia, Lale embarcou numa viagem ao seu passado, confiando a Heather os detalhes mais íntimos da sua vida durante o Holocausto. Heather escreveu a primeira versão da história de Lale na forma de um argumento para filme, antes de o transformar no seu romance de estreia, O Tatuador de Auschwitz. Os direitos de publicação deste livro inspirador estão vendidos para mais de 20 países.",
    "https://static.wixstatic.com/media/f2af96_ce255ee74b114caea50260e5baba34eb~mv2_d_3840_5760_s_4_2.jpg/v1/fill/w_378,h_567,al_c,q_80,usm_0.66_1.00_0.01/f2af96_ce255ee74b114caea50260e5baba34eb~mv2_d_3840_5760_s_4_2.webp"
)) //7
autores.push(new Autor(
    "Mo Gawdat",
    "Mo Gawdat é o Chief Business Officer da Google [X], a ultra secreta divisão da empresa que desenvolve os projectos futuristas, como por exemplo o carro autónomo. Com uma carreira de quase 30 anos, o autor começou a trabalhar na IBM Egipto como Engenheiro de Sistemas, até se mudar para os Emirados Árabes Unidos. Esteve sete anos na Microsoft, onde dirigia as comunicações nos mercados emergentes.",
    "https://www.irishexaminer.com/remote/media.central.ie/media/images/h/HappinessFeature2017pic2_large.jpg?width=648&s=ie-449339"
)) //8
autores.push(new Autor(
    "J. K. Rowling",
    "J.K. Rowling é a autora da multipremiada saga Harry Potter. Idolatrada por leitores de todo o mundo, esta série registou até agora vendas superiores a 450 milhões de exemplares, estando traduzida para 80 línguas, e deu origem a oito grandes produções cinematográficas. J.K. Rowling é também autora de três livros cujas receitas revertem a favor de instituições de solidariedade: O Quidditch Através dos Tempos, Monstros Fantásticos e Onde Encontrá-los (publicados a favor da Comic Relief e da Lumos) e Os Contos de Beedle o Bardo (publicado a favor da Lumos). É ainda autora do argumento do filme inspirado na obra Monstros Fantásticos e Onde Encontrá-los.",
    "https://www.hellomagazine.com/imagenes/film/2017102543486/jk-rowling-heartbreaking-story-professor-sprout/0-221-603/jk-rowling-t.jpg"
)) //9
autores.push(new Autor(
    "J. R. R. Tolkien",
    'John Ronald Reuel Tolkien nasceu na África do Sul, de pais ingleses, em 1892. Tinha 4 anos quando o pai morreu e foi já em Inglaterra que fez os seus estudos, concluídos em 1915 na Universidade de Oxford. Alistado no Exército Inglês, combateu na Primeira Grande Guerra e foi vítima da "febre-das-trincheiras", que o levou a estar hospitalizado durante um ano. A seguir à guerra trabalhou na equipa que organizou o "Dicionário Inglês de Oxford" e começou a leccionar, primeiro na Universidade de Leeds, depois na de Oxford. Tolkien era um especialista do Old English (que vai do séc. VIII a.C. ao séc. XII d.C.) e do Middle English (que vai do séc. XII ao XVI).',
    "https://update.gci.org/wp-content/uploads/2017/12/JRR.png",
)) //10
autores.push(new Autor(
    "José Saramago",
    "Autor de mais de 40 títulos, José Saramago nasceu em 1922, na aldeia de Azinhaga. As noites passadas na biblioteca pública do Palácio Galveias, em Lisboa, foram fundamentais para a sua formação. «E foi aí, sem ajudas nem conselhos, apenas guiado pela curiosidade e pela vontade de aprender, que o meu gosto pela leitura se desenvolveu e apurou.» Em 1947 publicou o seu primeiro livro que intitulou A Viúva, mas que, por razões editoriais, viria a sair com o título de Terra do Pecado. Seis anos depois, em 1953, terminaria o romance Claraboia, publicado apenas após a sua morte.",
    "https://hojemacau.com.mo/wp-content/uploads/2018/05/jose-saramago-810x805.jpg"
)) //11
autores.push(new Autor(
    "Pedro Chagas Freitas",
    "Pedro Chagas Freitas é um gajo que escreve cenas. Está publicado em mais de uma dezena de países e é um dos autores mais vendidos em Portugal, em Itália e no Brasil. Inventou jogos didácticos de escrita criativa. Não aprecia más-pessoas e tende a não conseguir cumprimentá-las. Faz tudo o que pode para fazer o que lhe apetece.",
    "https://beira.pt/wp-content/uploads/2015/11/pedro_chagas_freitas_magmaphoto-712x712.jpg"
)) //12
autores.push(new Autor(
    "Antoine de Saint-Exupéry",
    "Antoine de Saint-Exupéry nasceu a 29 de junho de 1900 em Lyon. Faz o seu batismo de voo aos 12 anos, aos 22 torna-se piloto militar e é como capitão que em 1939 se junta à Força Aérea francesa em luta contra a ocupação nazi. A aviação e a guerra viriam a revelar-se elementos centrais de toda a sua obra literária, onde se destacam títulos como Correio do Sul (1929), o seu primeiro romance, Voo Noturno (1931), que logo se tornou um êxito de vendas internacional, e Piloto de Guerra (1942), retrato da sua participação na Segunda Guerra Mundial. Em 1943 publicaria aquela que é reconhecida como a sua obra-prima, O Principezinho, um dos livros mais traduzidos em todo o mundo. A sua morte, aos 44 anos, num acidente de aviação durante uma missão de reconhecimento no sul de França, permanece ainda hoje um mistério.",
    "https://cdn.pensador.com/img/authors/an/to/antoine-de-saint-exupery-2-l.jpg"
)) //13
autores.push(new Autor(
    "Ernest Cline",
    "Ernest Cline é o conhecido argumentista do filme de culto Loucos e Fãs. É também escritor e geek a tempo inteiro. Vive no Texas com a mulher e a filha. Possui uma vasta coleção de videojogos clássicos. Ready Player One - Jogador 1 é o seu primeiro livro, cujos direitos foram adquiridos por 35 países, tendo sido adaptado ao cinema pela Warner Brothers com uma excelente realização de Steven Spielberg.",
    "http://assets.signature-reads.com/wp-content/uploads/2012/06/cline.png"
)) //14

if (!localStorage.getItem("autores")) {
    localStorage.setItem("autores", JSON.stringify(autores))
    autores = JSON.parse(localStorage.getItem("autores"))
}

//livros predefinidos
livros.push(new Livro(
    "https://img.wook.pt/images/a-guerra-dos-tronos-george-r-r-martin/MXwxOTY1MTF8MjQ3OTIzfDEzODM1MjMyMDAwMDA=/502x",
    "A Guerra dos Tronos",
    [1],
    `Quando Eddard Stark, lorde do castelo de Winterfell, recebe a visita do velho amigo, o rei Robert Baratheon, está longe de adivinhar que a sua vida, e a da sua família, está prestes a entrar numa espiral de tragédia, conspiração e morte. Durante a estadia, o rei convida Eddard a mudar-se para a corte e a assumir a prestigiada posição de Mão do Rei. Este aceita, mas apenas porque desconfia que o anterior detentor desse título foi envenenado pela própria rainha: uma cruel manipuladora do clã Lannister. Assim, perto do rei, Eddard tem esperança de o proteger da rainha. Mas ter os Lannister como inimigos é fatal: a ambição dessa família não tem limites e o rei corre um perigo muito maior do que Eddard temia! Sozinho na corte, Eddard também se apercebe que a sua vida nada vale. E até a sua família, longe no norte, pode estar em perigo. Uma galeria de personagens brilhantes dá vida a esta saga: o anão Tyrion, ovelha negra do clã Lannister; Jon Snow, bastardo de Eddard Stark que decide juntar-se à Patrulha da Noite, e a princesa Daenerys Targaryen, da dinastia que reinou antes de Robert, que pretende ressuscitar os dragões do passado para recuperar o trono, custe o que custar.`,
    2008,
    1,
    [1, 2, 4],
    "Saída de Emergência",
    400,
    2,
    "2018-05-27",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/os-100-kass-morgan/MXwxNjU5MTM3MHwxMjIwMTAzNXwxNDk0OTc1NjAwMDAw/502x",
    "Os 100",
    [2],
    `Há muito tempo, a superfície da Terra foi arrasada por uma guerra nuclear. Os poucos sortudos que conseguiram sobreviver refugiaram-se a bordo da Colónia, uma estação espacial que orbita o planeta. Cem anos após ter sido a salvação da Humanidade, a Colónia está em perigo. Os aparelhos que garantem a renovação do oxigénio na estação espacial estão a falhar, e não há como os substituir. A última esperança da Humanidade reside em 100 jovens selecionados entre criminosos, para regressar à superfície da Terra e descobrir se o planeta pode de novo ser habitado. Depois de tanto tempo, estes serão os primeiros humanos a pisar a Terra. Mas estarão na verdade sozinhos? Terão todos os seres vivos perecido durante o longo inverno nuclear, ou será que algo se esconde nas sombras das grandes florestas que agora cobrem toda a Terra?`,
    2015,
    2,
    [1, 7, 8, 11, 18],
    "TopSeller",
    288,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/os-jogos-da-fome-suzanne-collins/MXwyODQzMTU2fDIzOTc5MTJ8MTQ0NzExMzYwMDAwMA==/502x",
    "Os Jogos da Fome",
    [3],
    `Num futuro pós-apocalíptico, surge das cinzas do que foi a América do Norte Panem, uma nova nação governada por um regime totalitário que a partir da megalópole, Capitol, governa os doze Distritos com mão de ferro. Todos os Distritos estão obrigados a enviar anualmente dois adolescentes para participar nos Jogos da Fome - um espectáculo sangrento de combates mortais cujo lema é «matar ou morrer». No final, apenas um destes jovens escapará com vida… Katniss Everdeen é uma adolescente de dezasseis anos que se oferece para substituir a irmã mais nova nos Jogos, um acto de extrema coragem… Conseguirá Katniss conservar a sua vida e a sua humanidade? Um enredo surpreendente e personagens inesquecíveis elevam este romance de estreia da trilogia Os Jogos da Fome às mais altas esferas da ficção científica.`,
    2009,
    4,
    [1, 8, 9],
    "Editorial Presença",
    268,
    2,
    "2018-05-15",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/em-chamas-suzanne-collins/MXw5NjI1MDQ2fDUyMTMzMjB8MTQ0NzExMzYwMDAwMA==/502x",
    "Os Jogos da Fome - Em Chamas",
    [3],
    `Depois de no primeiro volume Katniss se oferecer para substituir a irmã mais nova nos Jogos da Fome, que têm como lema «matar ou morrer», contra todas as expectativas, não só Katniss Everdeen venceu os Jogos da Fome, como pela primeira vez na história desta competição dois tributos conseguiram sair da arena com vida. Os dois jovens Katniss e Peeta tornaram-se agora os rostos de uma rebelião que nunca esteve nos seus planos. E o Capitólio não olhará a meios para se vingar… Um ritmo constante de adrenalina numa obra que promete tornar-se uma das leituras mais viciantes do ano.`,
    2010,
    4,
    [1, 8, 9],
    "Editorial Presença",
    280,
    2,
    "2018-05-15",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/em-chamas-suzanne-collins/MXw5NjI1MDQ2fDUyMTMzMjB8MTQ0NzExMzYwMDAwMA==/502x",
    "Os Jogos da Fome - A Revolta",
    [3],
    `Katniss Everdeen não devia estar viva. Mas, apesar dos planos do Capitólio, a rapariga em chamas sobreviveu e está agora junto de Gale, da mãe e da irmã no Distrito 13. Recuperando pouco a pouco dos ferimentos que sofreu na arena, Katniss procura adaptar-se à nova realidade: Peeta foi capturado pelo Capitólio, o Distrito 12 já não existe e a revolução está prestes a começar. Agora estão todos a contar com Katniss para continuar a desempenhar o seu papel, assumir a responsabilidade por inúmeras vidas e mudar para sempre o destino de Panem - independentemente de tudo aquilo que terá de sacrificar…`,
    2011,
    4,
    [1, 8, 9],
    "Editorial Presença",
    280,
    2,
    "2018-05-15",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-rapaz-do-pijama-as-riscas-john-boyne/MXwyMDAzOTB8MjU4MTk2fDEzODM1MjMyMDAwMDA=/502x",
    "O Rapaz do Pijama às Riscas",
    [4],
    `Ao regressar da escola um dia, Bruno constata que as suas coisas estão a ser empacotadas. O seu pai tinha sido promovido no trabalho e toda a família tem de deixar a luxuosa casa onde vivia e mudar-se para outra cidade, onde Bruno não encontra ninguém com quem brincar nem nada para fazer. Pior do que isso, a nova casa é delimitada por uma vedação de arame que se estende a perder de vista e que o isola das pessoas que ele consegue ver, através da janela, do outro lado da vedação, as quais, curiosamente, usam todas um pijama às riscas. Como Bruno adora fazer explorações, certo dia, desobedecendo às ordens expressas do pai, resolve investigar até onde vai a vedação. É então que encontra um rapazinho mais ou menos da sua idade, vestido com o pijama às riscas que ele já tinha observado, e que em breve se torna o seu melhor amigo…`,
    2008,
    5,
    [1, 3, 6, 10],
    "Edições Asa",
    176,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-marciano-andy-weir/MXwxNTc1ODc5MXwxMTI1Mzg4NXwxNDQxMTQ4NDAwMDAw/502x",
    "O Marciano",
    [5],
    `Uma Missão a Marte. Um acidente aparatoso. A luta de um homem pela sobrevivência. Há exatamente seis dias, o astronauta Mark Watney tornou-se uma das primeiras pessoas a caminhar em Marte. Agora, ele tem a certeza de que vai ser a primeira pessoa a morrer ali. Depois de uma tempestade de areia ter obrigado a sua tripulação a evacuar o planeta, e de esta o ter deixado para trás por julgá-lo morto, Mark encontra-se preso em Marte, completamente sozinho, sem perspetivas de conseguir comunicar com a Terra para dizer que está vivo. E mesmo que o conseguisse fazer, os seus mantimentos esgotar-se-iam muito antes de uma equipa de salvamento o encontrar. De qualquer modo, Mark não terá tempo para morrer de fome. A maquinaria danificada, o meio ambiente implacável e o simples «erro humano» irão, muito provavelmente, matá-lo primeiro. Apoiando-se nas suas enormes capacidades técnicas, no domínio da engenharia e na determinada recusa em desistir — e num surpreendente sentido de humor a que vai buscar a força para sobreviver —, ele embarca numa missão obstinada para se manter vivo. Será que a sua mestria vai ser suficiente para superar todas as adversidades impossíveis que se erguem contra si? Fundamentado com referências científicas atualizadas e impulsionado por uma trama engenhosa e brilhante que agarra o leitor desde a primeira à última página, O Marciano é um romance verdadeiramente notável, que se lê como uma história de sobrevivência da vida real.`,
    2014,
    2,
    [7, 11],
    "TopSeller",
    384,
    2,
    "2017-12-15",
    1,
    -1
))
livros.push(new Livro(
    "http://t0.gstatic.com/images?q=tbn:ANd9GcT247iH0OUhTOxIx7DQBkTHvX1IWB0uCtnnYB9amhemXntSZv5E",
    "O Nome do Vento",
    [6],
    `Da infância como membro de uma família unida de nómadas Edema Ruh até à provação dos primeiros dias como aluno de magia numa universidade prestigiada, o humilde estalajadeiro Kvothe relata a história de como um rapaz desfavorecido pelo destino se torna um herói, um bardo, um mago e uma lenda. O primeiro romance de Rothfuss lança uma trilogia relatando não apenas a história da Humanidade, mas também a história de um mundo ameaçado por um mal cuja existência nega de forma desesperada. O autor explora o desenvolvimento de uma personalidade enquanto examina a relação entre a lenda e a sua verdade, a verdade que reside no coração das histórias. Contada de forma elegante e enriquecida com vislumbres de histórias futuras, esta "autobiografia" de um herói rica em detalhes é altamente recomendada para bibliotecas de qualquer tamanho.`,
    2009,
    1,
    [2, 12, 13],
    "Edições Gailivro",
    976,
    2,
    "2017-05-18",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-tatuador-de-auschwitz-heather-morris/MXwyMTM3MDQwNnwxNzI1MjkwM3wxNTE2NzUyMDAwMDAw/502x",
    "O Tatuador de Auschwitz",
    [7],
    `Esta é a história assombrosa do tatuador de Auschwitz e da mulher que conquistou o seu coração - um dosepisódios mais extraordinários e inesquecíveis do Holocausto. Em 1942, Lale Sokolov chega a Auschwitz-Birkenau. Ali é incumbido da tarefa de tatuar os prisioneiros marcados para sobreviver - gravando uma sequência de números no braço de outras vítimas como ele - com uma tinta indelével. Era assim o processo de criação daquele que veio a tornar -se um dos símbolos mais poderosos do Holocausto. À espera na fila pela sua vez de ser tatuada, aterrorizada e a tremer, encontra-se Gita. Para Lale, um sedutor, foi amor à primeira vista. Ele está determinado não só a lutar pela sua própria sobrevivência mas também pela desta jovem. Um romance baseado em entrevistas que Heather Morris fez ao longo de diversos anos a Ludwig (Lale) Sokolov, vítima do Holocausto e tatuador em Auschwitz-Birkenau. Uma história de amor e sobrevivência no meio dos horrores de um campo de concentração, que agradará a um vasto universo de leitores, em especial aos que leram A Lista de Schindler e O Rapaz do Pijama às Riscas, e que nos mostra de forma pungente e emocionante como o melhor da natureza humana se revela por vezes nas mais terríveis circunstâncias.`,
    2018,
    3,
    [6, 10, 11],
    "Editorial Presença",
    232,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/a-equacao-da-felicidade-mo-gawdat/MXwyMDI3NzA0M3wxNjEyODMxNXwxNTA3NzYyODAwMDAw/502x",
    "A Equação da Felicidade",
    [8],
    `A mensagem deste livro é simples: os seres humanos foram desenhados para serem felizes. E se a vida nos pregar partidas, basta reinicializar o programa e voltar ao modo de felicidade. Em 2001, Mo Gawdat chegou à conclusão de que era infelicíssimo, apesar de estar casado, ter um super emprego, e não saber o que fazer com tanto dinheiro. Engenheiro por formação, decidiu aplicar os seus talentos ao estudo da felicidade. Leu tudo o que havia para ler. Desenhou um algoritmo que permitisse a todos os seres humanos alcançar a felicidade. E começou a aplicá-lo em si próprio, com resultados espantosos. Até que, 13 anos mas tarde, e já Chief Businness Officer da Google [x], foi brutalmente confrontado com o mais duro teste à felicidade. O seu filho Ali morreu numa operação de rotina à apendicite, devido a um erro médico. O autor não apresentou queixa, não levou o caso a tribunal. Em vez disso, juntamente com a família, decidiu socorrer-se da equação para sobreviver emocionalmente. E assumiu como missão partilhá-la, através deste livro, com o maior número de pessoas. Aqui encontrarão a ciência que o inspirou a escrever a fórmula 6-7-5. São 6 as ilusões que nos levam a viver num estado de confusão permanente; são 7 os ângulos mortos que nos distorcem a visão da realidade; e, finalmente, há 5 verdades fundamentais, que lhe permitirão alcançar a felicidade duradoura.`,
    2018,
    6,
    [14],
    "Lua de Papel",
    352,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/harry-potter-e-a-pedra-filosofal-j-k-rowling/MXw0NjcyNXw3Njc5MnwxNDIwNzYxNjAwMDAw/502x",
    "Harry Potter e a Pedra Filosofal",
    [9],
    `Harry Potter é antes de mais o fenómeno editorial de 1999. É-o porque demove crianças de jogos de computador e de infindáveis horas frente ao televisor. É-o porque está traduzido em cerca de 30 idiomas. É-o porque tem angariado os mais importantes prémios de literatura infanto-juvenil. É-o, por fim e entre outras inúmeras razões, porque ocupa há meses consecutivos os primeiros lugares das mais importantes listas de vendas mundiais. Mas Harry Potter, o personagem dos livros de J. K. Rowling, não é um herói habitual. É apenas um miúdo magricela, míope e desajeitado com uma estranha cicatriz na testa. Estranha, de facto, porque afinal encerra misteriosos poderes que o distinguem do cinzento mundo dos muggles (os complicados humanos) e que irá fazer dele uma criança especialmente dotada para o universo da magia. Admitido na escola Howgarts onde se formam os mais famosos feiticeiros do mundo, Harry Potter irá viver todas as aventuras que a sua imaginação lhe irá propocionar. Um grande sucesso editorial que os mais jovens adoram e que apetece também aos adultos. `,
    2002,
    5,
    [13],
    "Editorial Presença",
    260,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/harry-potter-e-a-camara-dos-segredos-j-k-rowling/MXw0Njc1OHw3NjgyNXwxNDIwNzYxNjAwMDAw/502x",
    "Harry Potter e a Câmara dos Segredos",
    [9],
    `Os dias de Verão com os Dursleys estavam a tornar-se insuportáveis. Harry Potter já não gostava muito de muggles, mas o pior é que tinha de passar os seus dias de férias em casa dos muggles mais muggles de todo o planeta e arredores. Não havia maneira de voltar para a sua querida escola de feitiçaria...  E ultimamente mesmo esse regresso se encontrava ameaçado, pois duende Dobby não cessava de o avisar de que algo terrível o aguardava em Hogwarts... Nada mais nada menos do que a revelação dos misteriosos e ameaçadores poderes da câmara do segredos! O regresso do herói que está a conquistar jovens e adultos de todo o mundo numa aventura que te enfeitiçará até à última página.`,
    2000,
    5,
    [13],
    "Editorial Presença",
    328,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/harry-potter-e-o-prisioneiro-de-azkaban-j-k-rowling/MXw0Njc4N3w3Njg1NHwxNDIwNzYxNjAwMDAw/502x",
    "Harry Potter e o Prisioneiro de Azkaban",
    [9],
    `Daquela vez Harry Potter não conseguira conter-se. Quebrara uma das regras principais de Hogwarts - não exercer técnicas de feitiçaria fora dos muros da escola. Mas aquela detestável Tia Marge merecia permanecer umas boas horas suspensa no tecto da sala dos Dursleys inchada como um balão. Além disso já faltavam poucos dias para recomeçar as aulas. Mas o seu terceiro ano não irá ser fácil. Da prisão de Azkaban fugira o feroz Sirus Black, um dos mais fieis seguidores do assustador Lord Voldemort para o qual Harry Potter continuava a ser o alvo favorito. O pior é que o herói de J. K. Rowling começa a suspeitar da existência de um traidor entre os seus próprios amigos... O regresso da personagem fantástica que está a conquistar leitores em todo o mundo numa aventura que te enfeitiçará até à última página.`,
    2002,
    5,
    [13],
    "Editorial Presença",
    416,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/harry-potter-e-o-calice-de-fogo-j-k-rowling/MXw0Njg2NXw3NjkzMnwxNDIwNzYxNjAwMDAw/502x",
    "Harry Potter e o Cálice de Fogo",
    [9],
    `Harry Potter nem quer acreditar na sua sorte! Afinal não vai ter de aturar os Dursleys até ao início do seu quarto ano em Hogwarts. Graças à taça Mundial de Quidditch vai passar os últimos quinze dias de férias na companhia dos Weasleys e do seu amigo Ron. Mas a verdade é que nem tudo vai correr pelo melhor para o nosso herói. Quando Harry começa a sentir a sua cicatriz a doer terrivelmente, sabe que Lord Voldemort está de novo a rondá-lo e a ganhar poder. A marca da morte, que apareceu no céu, não pode significar outra coisa...Entretanto, este é um ano muito especial para Hogwarts, pois é lá que se irá realizar o célebre Torneio dos Três Feiticeiros, no qual Harry vai desempenhar um papel decisivo e que quase lhe irá custar a vida!! Pela segunda vez, Potter vê-se frente a frente com Voldemort, e ele sabe que o maior desejo do poderoso senhor das trevas é vê-lo morto...`,
    2000,
    5,
    [13],
    "Editorial Presença",
    592,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/harry-potter-e-a-ordem-da-fenix-j-k-rowling/MXw0NTM2Mnw3NTQyOXwxNDE0MzY4MDAwMDAw/502x",
    "Harry Potter e a Ordem da Fénix",
    [9],
    `Harry Potter está prestes a começar o seu quinto ano na Escola de Magia e Feitiçaria de Hogwarts. É, aliás, com ansiedade que aguarda o regresso às aulas para rever os seus amigos Ron e Hermione que, estranhamente, deram muito poucas notícias durante o Verão. Contudo, o que Harry vai descobrir neste novo ano em Hogwarts vai transformar radicalmente todo o seu mundo e a sua vida...Esta é mais uma apaixonante aventura de Harry Potter cheia de suspense, segredos e, claro, muita magia, escrita pela incomparável J. K. Rowling!`,
    2003,
    5,
    [13],
    "Editorial Presença",
    756,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/harry-potter-e-o-principe-misterioso-j-k-rowling/MXwxNzA5NTB8MjE4NDY0fDE0MTQzNjgwMDAwMDA=/502x",
    "Harry Potter e o Príncipe Misterioso",
    [9],
    `Harry Potter está prestes a começar o seu quinto ano na Escola de Magia e Feitiçaria de Hogwarts. É, aliás, com ansiedade que aguarda o regresso às aulas para rever os seus amigos Ron e Hermione que, estranhamente, deram muito poucas notícias durante o Verão. Contudo, o que Harry vai descobrir neste novo ano em Hogwarts vai transformar radicalmente todo o seu mundo e a sua vida...Esta é mais uma apaixonante aventura de Harry Potter cheia de suspense, segredos e, claro, muita magia, escrita pela incomparável J. K. Rowling!`,
    2005,
    5,
    [13],
    "Editorial Presença",
    512,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/harry-potter-e-os-talismas-da-morte-j-k-rowling/MXwxOTcwMjl8MjQ4NjA5fDE0MjA3NjE2MDAwMDA=/502x",
    "Harry Potter e os Talismãs da Morte",
    [9],
    `É neste sétimo volume que Harry Potter irá travar a mais negra e perigosa batalha da sua vida. Dumbledore reservou-lhe uma missão quase impossível - encontrar e destruir os Horcruxes de Voldemort... Nunca, em toda a sua longa série de aventuras, o jovem feiticeiro mais famoso do mundo se sentiu tão só e perante um futuro tão sombrio. Chegou o momento do confronto final - Harry Potter e Lord Voldemort... nenhum pode viver enquanto o outro sobreviver... um dos dois está prestes a acabar para sempre... Os seus destinos estão misteriosamente entrelaçados, mas apenas um sobreviverá... Numa atmosfera apoteótica e vibrante, Rowling desvenda-nos, por fim, os segredos mais bem guardados do universo fantástico de Harry Potter e deixa-nos envoltos, talvez para sempre, na sua poderosa magia. Este sétimo volume tem sido considerado pelo público e pela crítica como o melhor de toda a série de Harry Potter.`,
    2007,
    5,
    [13],
    "Editorial Presença",
    608,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-senhor-dos-aneis-i-j-r-r-tolkien/MXw2NTQ0N3w5NTUxNHwxNDYzNjk4ODAwMDAw/502x",
    "O Senhor dos Anéis I - A Irmandade do Anel",
    [10],
    `Não se enganava o crítico ao indicar assim que estamos perante uma obra de leitura obrigatória, que, sem qualquer sombra de exagero, se insere entre as mais notáveis criações literárias do nosso século. Situando-se na linha de criação fantástica em que a literatura inglesa é fértil (lembramos Jonathan Swift com As Viagens de Gulliver, lembramos Lewis Carrol com a sua Alice nos País das Maravilhas), Tolkien oferece-nos uma obra verdadeiramente monumental, onde todo o mundo é criado de raiz, uma nova cosmogonia arquitectada por inteiro, uma irrupção de maravilhoso que é admirável jogo de criação pura. O sopro genial que perpassa na elaboração deste maravilhoso, traduzido sobretudo no realismo da narração, deixa no leitor o desejo irresistível de conhecer "esse" mundo que, como crianças, chegamos a acreditar que existe. A Irmandade do Anel é o primeiro volume da trilogia O Senhor dos Anéis, em que se integram também As Duas Torres e O Regresso do Rei.`,
    1997,
    1,
    [2, 12, 13],
    "Publicações Europa-América",
    468,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-senhor-dos-aneis-ii-j-r-r-tolkien/MXw2NTQ2NHw5NTUzMXwxNDg0Njk3NjAwMDAw/502x",
    "O Senhor dos Anéis II - As Duas Torres",
    [10],
    `Do anterior volume desta trilogia, A Irmandade do anel, o leitor travou conhecimento com alguns estranhos e simpáticos personagens que povoam o mundo que Tolkien construiu: Frodo, Gandalf, Pippin, Aragorn, Boromir, para citar apenas alguns. Através deles ficou também a conhecer algumas espécies bizarras a viver em terras imaginárias: os hobbits, os orcs, os elfos, os anões. E Acompanhou certamente todas as peripécias que se passaram à volta do misterioso anel que Frodo era possuidor. Os perigos por que passaram para subtrair o anel às mãos cobiçosas dos inimigos, os trabalhos em que se viram envolvidos para conseguir o seu intento culminaram com a fuga e o desaparecimento de Frodo e a dispersão dos seus companheiros. Esta segunda parte, As Duas torres, conta o que aconteceu a cada um dos membros da Irmandade do Anel, depois de o grupo se ter desfeito e até o advento da Grande Escuridão e à eclosão da Guerra do anel, que será contada na terceira e última parte.`,
    1998,
    1,
    [2, 12, 13],
    "Publicações Europa-América",
    388,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-senhor-dos-aneis-iii-j-r-r-tolkien/MXw2NTQ3MHw5NTUzN3wxNDg0NjExMjAwMDAw/502x",
    "O Senhor dos Anéis III - O Regresso do Rei",
    [10],
    `Eis que chegamos à terceira parte de O Senhor dos Anéis. Assistimos, na primeira parte, à descoberta do poder do anel detido por Frodo, o hobbit, como Um Anel que domina todos os Anéis do Poder. Perseguidos pelo Cavaleiro Negro de Mordor, Frodo e os companheiros passam inumeráveis peripécias na tentativa de salvarem, a todo o custo, o anel e até decidirem separar-se. Na segunda parte,As Duas Torres, são-nos descritas as aventuras de cada um dos membros do grupo depois de se terem separado. Surgem os Cavaleiros de Rohan, comandados por Éomer, que cercam os orcs e os destroem. Frodo, que desaparecera, regressa entretanto, mas, depois de grandes aventuras, é picado por Shelob, monstruosa guardiã de um desfiladeiro por onde ele pretendia passar, acompanhado de Samwise. Frodo jaz adormecido e o seu corpo é levado pelos orcs. Esta terceira parte, O Regresso do Rei, trata das tragédias opostas de Gandalf e Sauron, até ao fim da grande escuridão, que concluirá esta fantástica viagem pelo estranho mundo criado pela vivíssima imaginação de Tolkien.`,
    1998,
    1,
    [2, 12, 13],
    "Publicações Europa-América",
    452,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-hobbit-j-r-r-tolkien/MXw2NTUzNXw5NTYwMnwxMzgzNTIzMjAwMDAw/502x",
    "O Hobbit",
    [10],
    `O Hobbit é a história das aventuras de um grupo de anões que vão à procura de um tesouro guardado por um terrível dragão. São relutantemente acompanhados por Bilbo Baggins, um hobbit apreciador do conforto e vida calma. Encontros com elfos, gnomos e aranhas gigantes, conversas com o dragão, Smaug, o Magnífico, e a presença involuntária na Batalha dos Cinco Exércitos são algumas das experiências por que Bilbo passará. O Hobbit é não só uma história maravilhosa como o prelúdio a O Senhor dos Anéis.`,
    2001,
    1,
    [2, 12, 13],
    "Publicações Europa-América",
    264,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/ensaio-sobre-a-cegueira-jose-saramago/MXwxNTgyNTQ4NnwxNTYwNjM1MXwxNTA0NTY2MDAwMDAw/502x",
    "Ensaio Sobre a Cegueira",
    [11],
    `Um homem fica cego, inexplicavelmente, quando se encontra no seu carro no meio do trânsito. A cegueira alastra como «um rastilho de pólvora». Uma cegueira coletiva. Romance contundente. Saramago a ver mais longe. Personagens sem nome. Um mundo com as contradições da espécie humana. Não se situa em nenhum tempo específico. É um tempo que pode ser ontem, hoje ou amanhã. As ideias a virem ao de cima, sempre na escrita de Saramago. A alegoria. O poder da palavra a abrir os olhos, face ao risco de uma situação terminal generalizada. A arte da escrita ao serviço da preocupação cívica. `,
    2017,
    3,
    [15],
    "Porto Editora",
    344,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/prometo-amar-pedro-chagas-freitas/MXwyMTUwNTAxNXwxNzM1MTcyOXwxNTIwODk5MjAwMDAw/502x",
    "Prometo Amar",
    [12],
    `Um homem fica cego, inexplicavelmente, quando se encontra no seu carro no meio do trânsito. A cegueira alastra como «um rastilho de pólvora». Uma cegueira coletiva. Romance contundente. Saramago a ver mais longe. Personagens sem nome. Um mundo com as contradições da espécie humana. Não se situa em nenhum tempo específico. É um tempo que pode ser ontem, hoje ou amanhã. As ideias a virem ao de cima, sempre na escrita de Saramago. A alegoria. O poder da palavra a abrir os olhos, face ao risco de uma situação terminal generalizada. A arte da escrita ao serviço da preocupação cívica.`,
    2018,
    3,
    [16],
    "Desrotina",
    312,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/o-principezinho-antoine-de-saint-exupery/MXw0Njk5M3w3NzA2MHwxMzgzNTIzMjAwMDAw/260x",
    "O Principezinho",
    [13],
    `Antoine de Saint-Exupéry publicou pela primeira vez «O Principezinho» em 1943, quando recuperava de ferimentos de guerra em Nova Iorque, um ano antes do seu avião Lockheed P-38 ter sido dado como desaparecido sobre o Mar Mediterrâneo, durante uma missão de reconhecimento. Mais de meio século depois, a sua fábula sobre o amor e a solidão não perdeu nenhuma da sua força, muito pelo contrário: este livro que se transformou numa das obras mais amadas e admiradas do nosso tempo, é na verdade de alcance intemporal, podendo ser inspirador para leitores de todas as idades e de todas as culturas. O narrador da obra é um piloto com um avião avariado no deserto do Sahara, que, tenta desesperadamente, reparar os danos causados no seu aparelho. Um belo dia os seus esforços são interrompidos devido à aparição de um pequeno príncipe, que lhe pede que desenhe uma ovelha. Perante um domínio tão misterioso, o piloto não se atreveu a desobedecer e, por muito absurdo que pareça - a mais de mil milhas das próximas regiões habitadas e correndo perigo de vida - pegou num pedaço de papel e numa caneta e fez o que o principezinho tinha pedido. E assim tem início um diálogo que expande a imaginação do narrador para todo o género de infantis e surpreendentes direcções. «O Principezinho» conta a sua viagem de planeta em planeta, cada um sendo um pequeno mundo povoado com um único adulto. Esta maravilhosa sequência criativa evoca não apenas os grandes contos de fadas de todos os tempos, como também o extravagante «Cidades Invisíveis» de Ítalo Calvino. Uma história terna que apresenta uma exposição sentida sobre a tristeza e a solidão, dotada de uma filosofia ansiosa e poética, que revela algumas reflexões sobre o que de facto são os valores da vida.`,
    2001,
    5,
    [7, 17],
    "Editorial Presença",
    96,
    2,
    "2018-05-02",
    1,
    -1
))
livros.push(new Livro(
    "https://img.wook.pt/images/ready-player-one-ernest-cline/MXwxNzk1MDYwN3wxMzU5NTIyOHwxNTIwMjA4MDAwMDAw/260x",
    "Ready Player One",
    [14],
    `Em 2044 o mundo tornou-se um lugar triste, devastado por conflitos, escassez de recursos, fome, pobreza e doenças. Wade Watts só se sente feliz na realidade virtual conhecida como OASIS, onde pode viver, jogar e apaixonar-se sem constrangimentos. Quando o criador do OASIS morre, deixa a sua imensa fortuna e o controlo da realidade virtual a quem conseguir resolver os enigmas que aí escondeu. Os utilizadores têm apenas como pistas a cultura pop dos anos 1980. Começa assim uma frenética e perigosa caça ao tesouro. Nos primeiros anos, milhares de jogadores tentam solucionar o enigma inicial sem sucesso. Até que Wade por acaso desvenda a primeira chave. De um momento para o outro, vê-se numa corrida desesperada para vencer o prémio, uma corrida que rapidamente continua no mundo real e que põe em risco a sua vida.`,
    2016,
    1,
    [9, 18, 19],
    "Editorial Presença",
    416,
    2,
    "2018-05-02",
    1,
    -1
))


if (!localStorage.getItem("livros")) {
    localStorage.setItem("livros", JSON.stringify(livros))
    livros = JSON.parse(localStorage.getItem("livros"))
}

//comentários predefinidos
comentarios.push(new Comentario(1, 1, "Top.", 4))
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

//testemunhos predefinidos
testemunhos.push(new Testemunho("Top.", 1, 0))
testemunhos.push(new Testemunho("Top.", 2, 0))
testemunhos.push(new Testemunho("Top.", 3, 0))
testemunhos.push(new Testemunho(`Quando Eddard Stark, lorde do castelo de Winterfell, recebe a visita do velho amigo, o rei Robert Baratheon,
está longe de adivinhar que a sua vida,e a da sua família, está prestes a entrar numa espiral de tragédia, conspiração e morte.`, 4, 1))

if (!localStorage.getItem("testemunhos")) {
    localStorage.setItem("testemunhos", JSON.stringify(testemunhos))
    testemunhos = JSON.parse(localStorage.getItem("testemunhos"))
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

function transformarEmInstanciaAutor(arrayAutores) {
    let autoresTemporarios = []
    //transformar os objetos em instâncias da classe Autor
    for (let i in arrayAutores) {
        autoresTemporarios.push(Object.assign(new Autor(), arrayAutores[i]))
    }
    autores = autoresTemporarios
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
    NAVBAR
*/
function navbar() {
    //variáveis área de utilizador e login
    let areaUtilizador = document.getElementById("areaUtilizador")
    let btnPainelAdmin = document.getElementById("btnPainelAdmin")
    let btnLogin = document.getElementById("btnLogin")

    if (idUtilizadorLogado === -1) {
        //esconde área utilizador
        areaUtilizador.style.display = "none"
        btnPainelAdmin.style.display = "none"
    } else {
        btnLogin.style.display = "none"
    }
}

function clicarCatalogo() {
    let catalogo = document.getElementById("catalogo")
    catalogo.innerHTML = (idUtilizadorLogado === -1) ? '<a class="nav-link js-scroll-trigger menu-icon-trigger" href="" data-toggle="modal" data-target="#modalLogin">Catálogo</a>' : '<a class="nav-link js-scroll-trigger menu-icon-trigger" href="content/catalogo.html">Catálogo</a>'
}

/*
    smooth scroll
*/
function smoothScroll() {
    //bar um scroll mais suave quando clicamos em alguma opção da navbar
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 10
    });
}


/*
    Button menu
*/
function btnMenu() {
    var pathA = document.getElementById('pathA'),
        pathC = document.getElementById('pathC'),
        segmentA = new Segment(pathA, 8, 32),
        segmentC = new Segment(pathC, 8, 32);

    // Linear section, with a callback to the next
    function inAC(s) { s.draw('80% - 24', '80%', 0.3, { delay: 0.1, callback: function () { inAC2(s) } }); }

    // Elastic section, using elastic-out easing function
    function inAC2(s) { s.draw('100% - 54.5', '100% - 30.5', 0.6, { easing: ease.ease('elastic-out', 1, 0.3) }); }

    // Running the animations
    inAC(segmentA); // top bar
    inAC(segmentC); // bottom bar

    // Initialize
    var pathB = document.getElementById('pathB'),
        segmentB = new Segment(pathB, 8, 32);

    // Expand the bar a bit
    function inB(s) { s.draw(8 - 6, 32 + 6, 0.1, { callback: function () { inB2(s) } }); }

    // Reduce with a bounce effect
    function inB2(s) { s.draw(8 + 12, 32 - 12, 0.3, { easing: ease.ease('bounce-out', 1, 0.3) }); }

    // Run the animation
    inB(segmentB);

    function outAC(s) { s.draw('90% - 24', '90%', 0.1, { easing: ease.ease('elastic-in', 1, 0.3), callback: function () { outAC2(s) } }); }
    function outAC2(s) { s.draw('20% - 24', '20%', 0.3, { callback: function () { outAC3(s) } }); }
    function outAC3(s) { s.draw(8, 32, 0.7, { easing: ease.ease('elastic-out', 1, 0.3) }); }

    function outB(s) { s.draw(8, 32, 0.7, { delay: 0.1, easing: ease.ease('elastic-out', 2, 0.4) }); }

    // Run the animations
    outAC(segmentA);
    outB(segmentB);
    outAC(segmentC);


    var trigger = document.getElementsByClassName('menu-icon-trigger'),
        toCloseIcon = true;

    let animar = function () {
        if ($(window).width() < 992) {
            for (let i = 0; i < trigger.length; i++) {
                trigger[i].addEventListener("click", function () {
                    if (toCloseIcon) {
                        inAC(segmentA);
                        inB(segmentB);
                        inAC(segmentC);
                    } else {
                        outAC(segmentA);
                        outB(segmentB);
                        outAC(segmentC);
                    }
                    toCloseIcon = !toCloseIcon;
                });
            }
        } else {
            outAC(segmentA);
            outB(segmentB);
            outAC(segmentC);
        }
    }

    $(window).resize(animar)
    $(document).ready(animar)
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
    fotoUtilizadorLogado.src = "../../" + Utilizador.getUrlFotoById(idUtilizadorLogado)
}

function gerarMenu(tipoAcesso, menuAtivo) {
    let str = ""
    //utilizador
    if (idUtilizadorLogado === -1 || tipoAcesso === 2) {
        document.getElementsByTagName("body")[0].innerHTML = ""
        window.location.href = '../../index.html'
    } else if (tipoAcesso === 1) { //operador
        let url = window.location.href
        if (url.substr(url.length - 10, 11) === "index.html" || url.substr(url.length - 11, 11) === "livros.html") {
            str += `<li id="inicioMenu">
                        <a href="index.html">
                            <em class="fa fa-dashboard">&nbsp;</em> Início</a>
                    </li>
                    <li id="autoresMenu">
                        <a href="autores.html">
                            <em class="fa fa-pencil">&nbsp;</em> Autores</a>
                    </li>
                    <li id="livrosMenu">
                        <a href="livros.html">
                            <em class="fa fa-book">&nbsp;</em> Livros</a>
                    </li>
                    <li id="paginaInicialMenu">
                        <a href="../../index.html">
                            <em class="fa fa-home">&nbsp;</em> Página inicial</a>
                    </li>`
        } else {
            document.getElementsByTagName("body")[0].innerHTML = ""
            window.location.href = 'index.html'
        }
    } else if (tipoAcesso === 0) { //admin
        str += `<li id="inicioMenu">
                    <a href="index.html">
                        <em class="fa fa-dashboard">&nbsp;</em> Início</a>
                </li>
                <li id="utilizadoresMenu">
                    <a href="utilizadores.html">
                        <em class="fa fa-user">&nbsp;</em> Utilizadores</a>
                </li>
                <li id="bibliotecasMenu">
                    <a href="bibliotecas.html">
                        <em class="fa fa-map-marker">&nbsp;</em> Bibliotecas</a>
                </li>
                <li id="generos-tagsMenu">
                    <a href="generos-tags.html">
                        <em class="fa fa-list-alt">&nbsp;</em> Géneros &nbsp; & &nbsp;&nbsp;
                        <em class="fa fa-tags">&nbsp;</em> Tags</a>
                </li>
                <li id="autoresMenu">
                    <a href="autores.html">
                        <em class="fa fa-pencil">&nbsp;</em> Autores</a>
                </li>
                <li id="livrosMenu">
                    <a href="livros.html">
                        <em class="fa fa-book">&nbsp;</em> Livros</a>
                </li>
                <li id="comentariosMenu">
                    <a href="comentarios.html">
                        <em class="fa fa-comments">&nbsp;</em> Comentários</a>
                </li>
                <li id="testemunhosMenu">
                    <a href="testemunhos.html">
                        <em class="fa fa-quote-right">&nbsp;</em> Testemunhos</a>
                </li>
                <li id="configuracoesMenu">
                    <a href="configuracoes.html">
                        <em class="fa fa-cog">&nbsp;</em> Configurações</a>
                </li>
                <li id="paginaInicialMenu">
                    <a href="../../index.html">
                        <em class="fa fa-home">&nbsp;</em> Página inicial</a>
                </li>`
    }

    document.getElementById("menu").innerHTML = str

    if (idUtilizadorLogado !== -1) {
        switch (menuAtivo) {
            case "inicioMenu":
                document.getElementById("inicioMenu").className = "active"
                break;
            case "utilizadoresMenu":
                document.getElementById("utilizadoresMenu").className = "active"
                break;
            case "bibliotecasMenu":
                document.getElementById("bibliotecasMenu").className = "active"
                break;
            case "generos-tagsMenu":
                document.getElementById("generos-tagsMenu").className = "active"
                break;
            case "autoresMenu":
                document.getElementById("autoresMenu").className = "active"
                break;
            case "livrosMenu":
                document.getElementById("livrosMenu").className = "active"
                break;
            case "comentariosMenu":
                document.getElementById("comentariosMenu").className = "active"
                break;
            case "testemunhosMenu":
                document.getElementById("testemunhosMenu").className = "active"
                break;
            case "configuracoesMenu":
                document.getElementById("configuracoesMenu").className = "active"
                break;
            default:
                break;
        }

    }
}

/*
    filtros (catalogo-genero.html e pesquisa.html)
*/
function comboboxFiltros() {
    $('.dropdown-el').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });
    $(document).click(function () {
        $('.dropdown-el').removeClass('expanded');
    });
}