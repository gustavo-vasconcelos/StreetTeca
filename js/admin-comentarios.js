window.onload = function () {
	//importar variáveis do sessionStorage
	comentarios = JSON.parse(localStorage.getItem("comentarios"))
	transformarEmInstanciaComentario(comentarios)

	freguesias = JSON.parse(localStorage.getItem("freguesias"))
	transformarEmInstanciaFreguesia(freguesias)

	idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

	//atualiza as informações do utilizador logado
	atualizarFotoNome()

	//gera a tabela
	gerarTabelaComentarios()


}

function gerarTabelaComentarios() {
	let totalComentarios = document.getElementById("totalComentarios")
	totalComentarios.innerHTML = "Lista de comentários - " + comentarios.length

	let str = ` <thead class="thead-dark">
					<tr>
                        <th>#</th>
                        <th>ID utilizador</th>                        
                        <th>Nome utilizador</th>                        
                        <th>ID livro</th>                        
                        <th>Título livro</th>                        
						<th>Comentário</th>
						<th>Pontuação</th>
						<th></th>
					</tr>
				</thead>`

	let count = 1

	for (let i in comentarios) {
		str += `<tr id="${comentarios[i].id}">
					<td>${count}</td>
					<td>${comentarios[i].idUtilizador}</td>
					<td>${Utilizador.getNomeById(comentarios[i].idUtilizador)}</td>
					<td>${comentarios[i].idLivro}</td>
					<td>${Livro.getTituloById(comentarios[i].idLivro)}</td>
					<td>${comentarios[i].comentario}</td>
					<td>${comentarios[i].pontuacao}</td>					
					<td align="right">
						<button type="button" class="btn btn-danger removerComentario"><i class="fa fa-trash"></i></button>
					</td>
				</tr>`
		count++
	}

	document.getElementById("tabelaComentarios").innerHTML = str

	//btn remover comentario
	let btnRemoverComentario = document.getElementsByClassName("removerComentario")
	for (let i = 0; i < btnRemoverComentario.length; i++) {
		btnRemoverComentario[i].addEventListener("click", function () {
			let idComentario = parseInt(btnRemoverComentario[i].parentNode.parentNode.id)
			swal({
				title: "Deseja mesmo remover?",
				text: `O comentário cujo id é ${idComentario} será removido para sempre!`,
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					swal("Comentário removido!", `O comentário cujo id era ${idComentario} foi removido com sucesso.`, {
						icon: "success",
					});
					Comentario.removerComentarioById(idComentario)
					localStorage.setItem("comentarios", JSON.stringify(comentarios))

					gerarTabelaComentarios()
				}
			});
		})
	}
}