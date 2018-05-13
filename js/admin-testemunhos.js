window.onload = function () {
    //importar variáveis do sessionStorage
    testemunhos = JSON.parse(localStorage.getItem("testemunhos"))
    transformarEmInstanciaTestemunho(testemunhos)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

    //atualiza as informações do utilizador logado
    atualizarFotoNome()

    //gerar tabelas
    gerarTabelaPendentes()
    gerarTabelaTestemunhos()

} //fim onload

function gerarTabelaPendentes() {
    if (Testemunho.getIdsByEstado(0).length > 0) {
        let testemunhosPendentes = Testemunho.getIdsByEstado(0)
        let totalPendentes = document.getElementById("totalPendentes")
        totalPendentes.innerHTML = "Total de testemunhos pendentes - " + testemunhosPendentes.length

        let str = ` <thead class="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>ID utilizador</th>
                            <th>Nome do utilizador</th>
                            <th>Testemunho</th>
                            <th>Aceitar?</th>
                        </tr>
                    </thead>`

        let count = 1

        for (let i in testemunhosPendentes) {
            for (let j in testemunhos) {
                if (testemunhosPendentes[i] === testemunhos[j].id) {
                    str += `<tr id="${testemunhos[j].id}">
                                <td>${count}</td>
                                <td>${testemunhos[j].idUtilizador}</td>
                                <td>${Utilizador.getNomeById(testemunhos[j].idUtilizador)}</td>
                                <td>${testemunhos[j].testemunho}</td>
                                <td>
                                    <button class="aceitar" style="border: none; background-color: transparent;"><i class="fa fa-xl fa-check" style="color:green"></i></button>
                                    <button class="removerPendente" style="border: none; background-color: transparent;"><i class="fa fa-xl fa-times color-red"></i></button>
                                </td>
                            </tr>`
                    count++
                }
            }
        }
        let tabelaPendentes = document.getElementById("tabelaPendentes")
        tabelaPendentes.innerHTML = str

        let btnAceitarTestemunho = document.getElementsByClassName("aceitar")
        for (let i = 0; i < btnAceitarTestemunho.length; i++) {
            let idTestemunho = parseInt(btnAceitarTestemunho[i].parentNode.parentNode.id)
            btnAceitarTestemunho[i].addEventListener("click", function () {
                for(let j in testemunhos) {
                    if(testemunhos[j].id === idTestemunho) {
                        testemunhos[j].estado = 1
                        localStorage.setItem("testemunhos", JSON.stringify(testemunhos))
                        gerarTabelaPendentes()
                        gerarTabelaTestemunhos()
                    }
                }
            })
        }

        let btnRemoverTestemunhoPendente = document.getElementsByClassName("removerPendente")
        for (let i = 0; i < btnRemoverTestemunhoPendente.length; i++) {
            let idTestemunho = parseInt(btnRemoverTestemunhoPendente[i].parentNode.parentNode.id)
            btnRemoverTestemunhoPendente[i].addEventListener("click", function () {
                for(let j in testemunhos) {
                    if(testemunhos[j].id === idTestemunho) {
                        Testemunho.removerTestemunhoById(idTestemunho)
                        localStorage.setItem("testemunhos", JSON.stringify(testemunhos))
                        gerarTabelaPendentes()
                    }
                }
            })
        }
    } else {
        $("#tabelaPendentesDiv").remove()
    }
}

function gerarTabelaTestemunhos() {
    if (Testemunho.getIdsByEstado(1).length > 0) {
        let testemunhosAceites = Testemunho.getIdsByEstado(1)
        let totalTestemunhos = document.getElementById("totalTestemunhos")
        totalTestemunhos.innerHTML = "Total de testemunhos - " + testemunhosAceites.length

        let str = ` <thead class="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>ID utilizador</th>
                            <th>Nome do utilizador</th>
                            <th>Testemunho</th>
                            <th></th>
                        </tr>
                    </thead>`

        let count = 1

        for (let i in testemunhosAceites) {
            for (let j in testemunhos) {
                if (testemunhosAceites[i] === testemunhos[j].id) {
                    str += `<tr id="${testemunhos[j].id}">
                                <td>${count}</td>
                                <td>${testemunhos[j].idUtilizador}</td>
                                <td>${Utilizador.getNomeById(testemunhos[j].idUtilizador)}</td>
                                <td>${testemunhos[j].testemunho}</td>
                                <td align="right">
                                    <button type="button" class="btn btn-danger remover"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>`
                    count++
                }
            }
        }
        let tabelaTestemunhos = document.getElementById("tabelaTestemunhos")
        tabelaTestemunhos.innerHTML = str

        let btnRemover = document.getElementsByClassName("remover")
        for (let i = 0; i < btnRemover.length; i++) {
            btnRemover[i].addEventListener("click", function () {
                let idTestemunho = parseInt(btnRemover[i].parentNode.parentNode.id)
                swal({
                    title: "Deseja mesmo remover?",
                    text: `O testemunho dado pelo utilizador ${Utilizador.getNomeById(Testemunho.getIdUtilizadorById(idTestemunho))} será removido para sempre!`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal(`O testemunho dado pelo utilizador ${Utilizador.getNomeById(Testemunho.getIdUtilizadorById(idTestemunho))} foi removido com sucesso.`, {
                            icon: "success",
                        });
                        $("#modal").modal('hide')
                        Testemunho.removerTestemunhoById(idTestemunho)
                        localStorage.setItem("testemunhos", JSON.stringify(testemunhos))

                        gerarTabelaTestemunhos()
                    }
                });
            })
        }
    } else {
        $("#tabelaTestemunhosDiv").remove()
    }
}