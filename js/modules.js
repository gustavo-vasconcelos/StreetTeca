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
        valor = (valor === "") ? "img/perfil.png" : valor
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

    static getUrlCapaById(id) {
        for (let i in livros) {
            if (livros[i].id === id) {
                return livros[i].urlCapa
            }
        }
    }

    static getIdsAleatoriosByIdGenero(idGenero) {
        let ids = []
        for (let i in livros) {
            if (livros[i].idGenero === idGenero) {
                ids.push(livros[i].id)
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
            idLivroClicado = parseInt(clicarLivro[i].id.replace(/livro/g, ""))
            console.log(idLivroClicado)
            localStorage.setItem("idLivroClicado", parseInt(clicarLivro[i].id.replace(/livro/g, "")))
        })
    }
}

if (!localStorage.getItem("configuracoes")) {
    localStorage.setItem("configuracoes", JSON.stringify(configuracoes))
    configuracoes = JSON.parse(localStorage.getItem("configuracoes"))
}


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

//livros predefinidos
livros.push(new Livro("https://img.wook.pt/images/a-guerra-dos-tronos-george-r-r-martin/MXwxOTY1MTF8MjQ3OTIzfDEzODM1MjMyMDAwMDA=/502x", "A Guerra dos Tronos", ["George R.R. Martin"], `Quando Eddard Stark, lorde do castelo de Winterfell, recebe a visita do velho amigo, o rei Robert Baratheon,
está longe de adivinhar que a sua vida, e a da sua família, está prestes a entrar numa espiral de
tragédia, conspiração e morte. Durante a estadia, o rei convida Eddard a mudar-se para a corte e
a assumir a prestigiada posição de Mão do Rei. Este aceita, mas apenas porque desconfia que o anterior
detentor desse título foi envenenado pela própria rainha: uma cruel manipuladora do clã Lannister.
Assim, perto do rei, Eddard tem esperança de o proteger da rainha. Mas ter os Lannister como inimigos
é fatal: a ambição dessa família não tem limites e o rei corre um perigo muito maior do que Eddard
temia! Sozinho na corte, Eddard também se apercebe que a sua vida nada vale. E até a sua família,
longe no norte, pode estar em perigo. Uma galeria de personagens brilhantes dá vida a esta saga:
o anão Tyrion, ovelha negra do clã Lannister; Jon Snow, bastardo de Eddard Stark que decide juntar-se
à Patrulha da Noite, e a princesa Daenerys Targaryen, da dinastia que reinou antes de Robert, que
pretende ressuscitar os dragões do passado para recuperar o trono, custe o que custar.`, 2008, 2, [3, 4, 5], "Saída de Emergência", 400, 1, "2018-05-02", 1, -1))
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
    fotoUtilizadorLogado.src = "../" + Utilizador.getUrlFotoById(idUtilizadorLogado)
}
