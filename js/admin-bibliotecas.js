window.onload = function () {
	//importar variáveis do sessionStorage
	concelhos = JSON.parse(localStorage.getItem("concelhos"))
	transformarEmInstanciaConcelho(concelhos)

	freguesias = JSON.parse(localStorage.getItem("freguesias"))
	transformarEmInstanciaFreguesia(freguesias)

	bibliotecas = JSON.parse(localStorage.getItem("bibliotecas"))
	transformarEmInstanciaBiblioteca(bibliotecas)

	idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

	//atualiza as informações do utilizador logado
	atualizarFotoNome()

	//gerar tabelas e mapa
	gerarTabelaConcelhos()
	gerarTabelaFreguesias()
	gerarMapaBibliotecas()

	//gerar combobox concelhos
	gerarComboboxConcelhos()

	//form adicionar concelho
	let formConcelho = document.getElementById("formConcelho")
	let inputConcelhoConcelho = document.getElementById("inputConcelhoConcelho")
	let btnResetConcelho = document.getElementById("btnResetConcelho")

	formConcelho.addEventListener("submit", function (event) {
		if (Concelho.getIdByConcelho(inputConcelhoConcelho.value) !== -1) {
			swal("Erro!", `Já existe um concelho com o mesmo nome.`, "error");
		} else {
			concelhos.push(new Concelho(inputConcelhoConcelho.value))
			localStorage.setItem("concelhos", JSON.stringify(concelhos))
			swal("Concelho adicionado!", `Foi adicionado o concelho ${inputConcelhoConcelho.value} com o id ${Concelho.getUltimoId()}.`, "success");
			formConcelho.reset()
			gerarTabelaConcelhos()
			gerarComboboxConcelhos()
			gerarComboboxFreguesias("")
		}
		event.preventDefault()
	})

	btnResetConcelho.addEventListener("click", function () {
		inputConcelhoConcelho.focus()
	})


	//form adicionar freguesia
	let formFreguesia = document.getElementById("formFreguesia")
	let inputFreguesiaConcelho = document.getElementById("inputFreguesiaConcelho")
	let inputFreguesiaFreguesia = document.getElementById("inputFreguesiaFreguesia")

	formFreguesia.addEventListener("submit", function (event) {
		if (Freguesia.getIdByIdConcelhoFreguesia(Concelho.getIdByConcelho(inputFreguesiaConcelho.value), inputFreguesiaFreguesia.value) !== -1) {
			swal("Erro!", `A freguesia ${Freguesia.getFreguesiaById(Freguesia.getIdByIdConcelhoFreguesia(Concelho.getIdByConcelho(inputFreguesiaConcelho.value), inputFreguesiaFreguesia.value))} já existe nesse concelho.`, "error");
		} else {
			freguesias.push(new Freguesia(Concelho.getIdByConcelho(inputFreguesiaConcelho.value), inputFreguesiaFreguesia.value))
			swal("Freguesia adicionada!", `Foi adicionada a freguesia ${inputFreguesiaFreguesia.value} com o id ${Freguesia.getUltimoId()}.`, "success");

			gerarTabelaConcelhos()
			gerarTabelaFreguesias()
		}


		event.preventDefault()
	})


	//form adicionar biblioteca
	let formBiblioteca = document.getElementById("formBiblioteca")
	let inputBibliotecaConcelho = document.getElementById("inputBibliotecaConcelho")
	let inputBibliotecaFreguesia = document.getElementById("inputBibliotecaFreguesia")
	let inputBibliotecaMorada = document.getElementById("inputBibliotecaMorada")
	let inputBibliotecaCapacidade = document.getElementById("inputBibliotecaCapacidade")
	let inputBibliotecaDescricao = document.getElementById("inputBibliotecaDescricao")
	inputBibliotecaDescricao.style.resize = "vertical"
	inputBibliotecaDescricao.style.minHeight = "48px"
	inputBibliotecaDescricao.style.maxHeight = "150px"

	let btnResetBibliotecas = document.getElementById("btnResetBibliotecas")

	inputBibliotecaConcelho.addEventListener("change", function () {
		gerarComboboxFreguesias(inputBibliotecaConcelho.value)
	})

	formBiblioteca.addEventListener("submit", function (event) {
		let resposta = Biblioteca.getCoordenadasByMorada(inputBibliotecaMorada.value)

		bibliotecas.push(new Biblioteca(Concelho.getIdByConcelho(inputBibliotecaConcelho.value), Freguesia.getIdByFreguesia(inputBibliotecaFreguesia.value), resposta[0], parseInt(inputBibliotecaCapacidade.value), inputBibliotecaDescricao.value, resposta[1]))
		localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas))
		swal("Biblioteca adicionada!", `Foi adicionada uma biblioteca com o id ${Biblioteca.getUltimoId()}.`, "success");
		formBiblioteca.reset()
		gerarMapaBibliotecas()

		event.preventDefault()
	})

	btnResetBibliotecas.addEventListener("click", function () {
		inputBibliotecaConcelho.focus()
	})
} //fim window.onload

function gerarTabelaConcelhos() {
	let totalConcelhos = document.getElementById("totalConcelhos")
	totalConcelhos.innerHTML = "Lista de concelhos - " + concelhos.length

	let str = ` <thead class="thead-dark">
					<tr>
						<th>#</th>
						<th>Concelho</th>
						<th>Nº de freguesias</th>
						<th></th>
					</tr>
				</thead>`

	let count = 1

	for (let i in concelhos) {
		str += `<tr id="${concelhos[i].id}">
					<td>${count}</td>
					<td>${concelhos[i].concelho}</td>
					<td>${Freguesia.getQuantidadeFreguesiaByIdConcelho(concelhos[i].id)}</td>
					<td align="right">
						<button type="button" class="btn btn-primary infoConcelho" data-toggle="modal" data-target="#modal"><i class="fa fa-search"></i></button>
					</td>
				</tr>`
		count++
	}

	document.getElementById("tabelaConcelhos").innerHTML = str

	//btn info concelho
	let btnInfoConcelho = document.getElementsByClassName("infoConcelho")
	for (let i = 0; i < btnInfoConcelho.length; i++) {
		btnInfoConcelho[i].addEventListener("click", function () {
			let idConcelho = parseInt(btnInfoConcelho[i].parentNode.parentNode.id)
			for (let j in concelhos) {
				if (concelhos[j].id === idConcelho) {
					modalTitulo.innerHTML = "Informações sobre o concelho"
					modalBody.innerHTML = `<div class="container-fluid">
												<p><b>ID:</b> ${concelhos[j].id}</p>
												<p><b>Concelho:</b> ${concelhos[j].concelho}</p>
												<p><b>Freguesias:</b> ${Freguesia.getFreguesiasByIdConcelho(concelhos[j].id).join(", ")}</p>
											</div>`
					modalFooter.innerHTML = `<button type="button" class="btn btn-danger removerConcelho">Remover concelho</button>
											 <button type="button" class="btn btn-warning editarConcelho">Editar concelho</button>
											 <button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>`
				}
			}

			//btn remover concelho
			let btnRemoverConcelho = document.getElementsByClassName("removerConcelho")
			for (let j = 0; j < btnRemoverConcelho.length; j++) {
				btnRemoverConcelho[j].addEventListener("click", function () {
					swal({
						title: "Deseja mesmo remover?",
						text: `O concelho ${Concelho.getConcelhoById(idConcelho)} e todas as freguesias associadas, assim como os livros associados a estas serão também removidos.`,
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((willDelete) => {
						if (willDelete) {
							swal(`O concelho ${Concelho.getConcelhoById(idConcelho)} foi removido com sucesso.`, {
								icon: "success",
							});
							$("#modal").modal('hide')

							//remove as bibliotecas que estão naquele concelho
							Biblioteca.removerBibliotecaByIdConcelho(idConcelho)
							localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas))
							gerarMapaBibliotecas()

							//remove as freguesias que estão naquele concelho
							Freguesia.removerFreguesiasByIdConcelho(idConcelho)
							localStorage.setItem("freguesias", JSON.stringify(freguesias))
							gerarTabelaFreguesias()

							//remove o concelho
							Concelho.removerConcelhoById(idConcelho)
							localStorage.setItem("concelhos", JSON.stringify(concelhos))
							gerarTabelaConcelhos()

							gerarComboboxConcelhos()
							gerarComboboxFreguesias("")
						}
					});
				})
			}

			//btn editar concelho
			let btnEditarConcelho = document.getElementsByClassName("editarConcelho")
			for (let j = 0; j < btnEditarConcelho.length; j++) {
				btnEditarConcelho[j].addEventListener("click", function () {
					for (let k in concelhos) {
						if (concelhos[k].id === idConcelho) {
							modalTitulo.innerHTML = "A editar " + concelhos[k].concelho
							modalBody.innerHTML = `<div class="container-fluid">
														<form class="form-horizontal" id="formEditarConcelho">
															<div class="form-group">
																<label class="col-sm-3 control-label" for="inputConcelhoEditarId">ID</label>
																<div class="col-sm-9">
																	<input id="inputConcelhoEditarId" type="text" class="form-control" required readonly value="${concelhos[k].id}">
																</div>
															</div>
															<div class="form-group">
																<label class="col-sm-3 control-label" for="inputConcelhoEditarConcelho">Concelho</label>
																<div class="col-sm-9">
																	<input id="inputConcelhoEditarConcelho" type="text" class="form-control" required value="${concelhos[k].concelho}">
																</div>
															</div>
															<div class="form-group">
																<label class="col-sm-3 control-label" for="inputConcelhoEditarFreguesias">Freguesias</label>
																<div class="col-sm-9">
																	<input id="inputConcelhoEditarFreguesias" type="text" class="form-control" required readonly value="${Freguesia.getFreguesiasByIdConcelho(concelhos[j].id).join(", ")}">
																</div>
															</div>
															<input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
															<button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
														</form>                                  
													</div>`
							modalFooter.innerHTML = ""

							//form editar
							let formEditarConcelho = document.getElementById("formEditarConcelho")
							formEditarConcelho.addEventListener("submit", function (event) {
								let inputConcelhoEditarConcelho = document.getElementById("inputConcelhoEditarConcelho")

								if (Concelho.getIdByConcelho(inputConcelhoEditarConcelho.value) === -1 || (Concelho.getIdByConcelho(inputConcelhoEditarConcelho.value) === concelhos[k].id && Concelho.getIdByConcelho(inputConcelhoEditarConcelho.value) !== -1)) { //caso não exista nenhum concelho com o nome indicado
									let inputConcelhoEditarFreguesias = document.getElementById("inputConcelhoEditarFreguesias")

									concelhos[k].concelho = inputConcelhoEditarConcelho.value

									//atualizar a key do localStorage
									localStorage.setItem("concelhos", JSON.stringify(concelhos))

									swal("Concelho editado!", `O concelho com o id ${idConcelho} foi editado com sucesso.`, "success");
									gerarTabelaConcelhos()
									gerarTabelaFreguesias()
									gerarComboboxConcelhos()
									gerarComboboxFreguesias("")
									gerarMapaBibliotecas()
									$("#modal").modal("hide")
								} else { //caso exista um concelho com o mesmo nome indicado
									swal("Erro!", `O concelho ${inputConcelhoEditarConcelho.value} já existe.`, "error");
								}

								event.preventDefault()
							})
						}
					}
				})
			}
		})
	}
}

function gerarTabelaFreguesias() {
	let totalFreguesias = document.getElementById("totalFreguesias")
	totalFreguesias.innerHTML = "Lista de freguesias - " + freguesias.length

	let str = ` <thead class="thead-dark">
					<tr>
						<th>#</th>
						<th>Freguesia</th>
						<th>Concelho</th>
						<th></th>
					</tr>
				</thead>`

	let count = 1

	for (let i in freguesias) {
		str += `<tr id="${freguesias[i].id}">
					<td>${count}</td>
					<td>${freguesias[i].freguesia}</td>
					<td>${Concelho.getConcelhoById(freguesias[i].idConcelho)}</td>
					<td align="right">
						<button type="button" class="btn btn-warning editarFreguesia" data-toggle="modal" data-target="#modal"><i class="fa fa-edit"></i></button>                    
						<button type="button" class="btn btn-danger removerFreguesia"><i class="fa fa-trash"></i></button>
					</td>
				</tr>`
		count++
	}

	document.getElementById("tabelaFreguesias").innerHTML = str

	//btn editar freguesia
	let btnEditarFreguesia = document.getElementsByClassName("editarFreguesia")
	for (let i = 0; i < btnEditarFreguesia.length; i++) {
		let idFreguesia = parseInt(btnEditarFreguesia[i].parentNode.parentNode.id)

		btnEditarFreguesia[i].addEventListener("click", function () {
			for (let j in freguesias) {
				if (freguesias[j].id === idFreguesia) {
					modalTitulo.innerHTML = "A editar " + freguesias[j].freguesia
					modalBody.innerHTML = `<div class="container-fluid">
												<form class="form-horizontal" id="formEditarFreguesia">
													<div class="form-group">
														<label class="col-md-3 control-label" for="inputFreguesiaEditarId">ID</label>
														<div class="col-md-9">
															<input id="inputFreguesiaEditarId" type="number" class="form-control" required readonly value="${freguesias[j].id}">
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label" for="inputFreguesiaEditarConcelho">Concelho</label>
														<div class="col-md-9">
															<select id="inputFreguesiaEditarConcelho" class="form-control" required></select>
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label" for="inputFreguesiaEditarFreguesia">Freguesia</label>
														<div class="col-md-9">
															<input id="inputFreguesiaEditarFreguesia" type="text" class="form-control" required value="${freguesias[j].freguesia}">
														</div>
													</div>
													<input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
													<button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
												</form>                                  
											</div>`
					modalFooter.innerHTML = ""

					//combobox concelho
					gerarComboboxConcelhosEditarFreguesia(idFreguesia)

					//form editar
					let formEditarFreguesia = document.getElementById("formEditarFreguesia")
					formEditarFreguesia.addEventListener("submit", function (event) {
						let inputFreguesiaEditarConcelho = document.getElementById("inputFreguesiaEditarConcelho")
						let inputFreguesiaEditarFreguesia = document.getElementById("inputFreguesiaEditarFreguesia")

						if (Freguesia.getIdByIdConcelhoFreguesia(Concelho.getIdByConcelho(inputFreguesiaEditarConcelho.value), inputFreguesiaEditarFreguesia.value) === -1 ||
							(Freguesia.getIdByIdConcelhoFreguesia(Concelho.getIdByConcelho(inputFreguesiaEditarConcelho.value), inputFreguesiaEditarFreguesia.value) === freguesias[j].id &&
								Freguesia.getIdByIdConcelhoFreguesia(Concelho.getIdByConcelho(inputFreguesiaEditarConcelho.value), inputFreguesiaEditarFreguesia.value) !== -1)) { //caso não exista nenhuma freguesia no concelho indicado
							let inputConcelhoEditarFreguesias = document.getElementById("inputConcelhoEditarFreguesias")

							freguesias[j].idConcelho = Concelho.getIdByConcelho(inputFreguesiaEditarConcelho.value)
							freguesias[j].freguesia = inputFreguesiaEditarFreguesia.value

							//atualizar a key do localStorage
							localStorage.setItem("freguesias", JSON.stringify(freguesias))

							swal("Freguesia editada!", `A freguesia cujo id é ${idFreguesia} foi editada com sucesso.`, "success");

							gerarTabelaFreguesias()
							gerarTabelaConcelhos()
							gerarComboboxConcelhos()
							gerarComboboxFreguesias("")
							gerarMapaBibliotecas()
							$("#modal").modal("hide")
						} else { //caso exista uma freguesia no concelho indicado
							swal("Erro!", `A freguesia ${Freguesia.getFreguesiaById(Freguesia.getIdByIdConcelhoFreguesia(Concelho.getIdByConcelho(inputFreguesiaEditarConcelho.value), inputFreguesiaEditarFreguesia.value))} já existe nesse concelho.`, "error");
						}

						event.preventDefault()
					})
				}
			}
		})
	}

	//btn remover freguesia
	let btnRemoverFreguesia = document.getElementsByClassName("removerFreguesia")
	for (let i = 0; i < btnRemoverFreguesia.length; i++) {
		let idFreguesia = parseInt(btnRemoverFreguesia[i].parentNode.parentNode.id)

		btnRemoverFreguesia[i].addEventListener("click", function () {
			swal({
				title: "Deseja mesmo remover?",
				text: `A freguesia ${Freguesia.getFreguesiaById(idFreguesia)} e todos os livros associados a estas serão também removidos.`,
				icon: "warning",
				buttons: true,
				dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					swal(`A freguesia ${Freguesia.getFreguesiaById(idFreguesia)} foi removida com sucesso.`, {
						icon: "success",
					});
					$("#modal").modal('hide')

					//remove as bibliotecas que estão naquela freguesia
					Biblioteca.removerBibliotecaByIdFreguesia(idFreguesia)
					localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas))
					gerarMapaBibliotecas()

					//remove a freguesia
					Freguesia.removerFreguesiaById(idFreguesia)
					localStorage.setItem("freguesias", JSON.stringify(freguesias))
					gerarTabelaFreguesias()

					gerarTabelaConcelhos()
					gerarComboboxConcelhos()
					gerarComboboxFreguesias("")
				}
			});
		})
	}
}

function gerarComboboxConcelhos() {
	let comboboxConcelho = document.getElementsByClassName("comboboxConcelho")
	let str = ""
	if (concelhos.length > 0) {
		str += '<option value="" selected hidden>Selecione um</option>'
		for (let i in concelhos) {
			str += `<option value="${concelhos[i].concelho}">${concelhos[i].concelho}</option>`
		}
	}
	for (let i = 0; i < comboboxConcelho.length; i++) {
		comboboxConcelho[i].innerHTML = str
	}
}

function gerarComboboxFreguesias(concelho, editar = false, freguesia = false) {
	let inputBibliotecaFreguesia = (!editar) ? document.getElementById("inputBibliotecaFreguesia") : document.getElementById("inputBibliotecaFreguesiaEditar")
	let str = ""

	if (concelho !== "") {
		str = (!editar) ? '<option value="" selected hidden>Selecione uma</option>' : ""
		let idConcelho = Concelho.getIdByConcelho(concelho)
		for (let i in freguesias) {
			if (freguesias[i].idConcelho === idConcelho) {
				if (!editar) {
					str += `<option value="${freguesias[i].freguesia}">${freguesias[i].freguesia}</option>`
				} else {
					str += `<option value="${freguesias[i].freguesia}"`
					if (freguesias[i].freguesia === freguesia) {
						str += ` selected>${freguesias[i].freguesia}</option>`
					} else {
						str += `>${freguesias[i].freguesia}</option>`
					}
				}
			}
		}
	}
	inputBibliotecaFreguesia.innerHTML = str
}

function gerarMapaBibliotecas() {
	let totalBibliotecas = document.getElementById("totalBibliotecas")
	totalBibliotecas.innerHTML = "Lista de bibliotecas - " + bibliotecas.length

	let map
	let mapaBibliotecas = document.getElementById("mapaBibliotecas")
	mapaBibliotecas.style.height = "650px"

	let mapProp = {
		center: new google.maps.LatLng(41.366174, -8.7396931),
		zoom: 10,
		/*styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#1d2c4d"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#8ec3b9"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1a3646"
					}
				]
			},
			{
				"featureType": "administrative.country",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#4b6878"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#64779e"
					}
				]
			},
			{
				"featureType": "administrative.province",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#4b6878"
					}
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#334e87"
					}
				]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#023e58"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#283d6a"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#6f9ba5"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1d2c4d"
					}
				]
			},
			{
				"featureType": "poi.business",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#023e58"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#3C7680"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#304a7d"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#98a5be"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1d2c4d"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#2c6675"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#255763"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#b0d5ce"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#023e58"
					}
				]
			},
			{
				"featureType": "road.local",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#98a5be"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#1d2c4d"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#283d6a"
					}
				]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#3a4762"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#0e1626"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#4e6d70"
					}
				]
			}
		]*/
	}
	map = new google.maps.Map(mapaBibliotecas, mapProp)

	if (bibliotecas.length > 0) {
		let bibliotecasMarker = []
		let bibliotecasInfoWindow = []
		for (let i in bibliotecas) {
			bibliotecasMarker.push(new google.maps.Marker({
				position: new google.maps.LatLng(bibliotecas[i].coordenadas.lat, bibliotecas[i].coordenadas.lng),
				label: bibliotecas[i].id + "",
				title: "Biblioteca " + bibliotecas[i].id,
				animation: google.maps.Animation.DROP
			}))

			bibliotecasInfoWindow.push(new google.maps.InfoWindow({
				content: `<div class="container-fluid" id="${bibliotecas[i].id}" style="font-size:1.1em;">
							<h4>Informações sobre a biblioteca</h4>
							<hr>
							<p><b>ID:</b> ${bibliotecas[i].id}</p>
							<p><b>Concelho:</b> ${Concelho.getConcelhoById(bibliotecas[i].idConcelho)}</p>
							<p><b>Freguesia:</b> ${Freguesia.getFreguesiaById(bibliotecas[i].idFreguesia)}</p>
							<p><b>Morada:</b> ${bibliotecas[i].morada}</p>
							<p><b>Capacidade:</b> ${bibliotecas[i].capacidade}</p>
							<p><b>Descrição:</b> ${bibliotecas[i].descricao}</p>
							<p><b>Coordenadas:</b> Latitude: ${bibliotecas[i].coordenadas.lat} / Longitude: ${bibliotecas[i].coordenadas.lng}</p>
							<hr>
							<div class="pull-right">
								<button type="button" class="btn btn-danger" id="removerBiblioteca${bibliotecas[i].id}">Remover biblioteca</button>
								<button type="button" class="btn btn-warning" id="editarBiblioteca${bibliotecas[i].id}" data-toggle="modal" data-target="#modal">Editar biblioteca</button>
							</div>
						</div>`
			}))

			bibliotecasMarker[i].setMap(map)

			let idBiblioteca = parseInt(bibliotecasMarker[i].label)

			bibliotecasMarker[i].addListener("click", function () {
				bibliotecasInfoWindow[i].open(map, bibliotecasMarker[i])

				//btn remover biblioteca
				document.getElementById(`removerBiblioteca${bibliotecas[i].id}`).addEventListener("click", function () {
					swal({
						title: "Deseja mesmo remover?",
						text: `A biblioteca cujo id é ${idBiblioteca} será removida para sempre!`,
						icon: "warning",
						buttons: true,
						dangerMode: true,
					}).then((willDelete) => {
						if (willDelete) {
							swal(`A biblioteca cujo id era ${idBiblioteca} foi removida com sucesso.`, {
								icon: "success",
							});

							Biblioteca.removerBibliotecaById(idBiblioteca)
							localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas))
							gerarMapaBibliotecas()
						}
					});
				})

				//btn editar biblioteca
				document.getElementById(`editarBiblioteca${bibliotecas[i].id}`).addEventListener("click", function () {
					modalTitulo.innerHTML = "A editar biblioteca"
					modalBody.innerHTML = `<div class="container-fluid">
												<form class="form-horizontal" id="formEditarBiblioteca">
													<div class="form-group">
														<label class="col-sm-3 control-label" for="inputBibliotecaEditarId">ID</label>
														<div class="col-sm-9">
															<input id="inputBibliotecaEditarId" type="text" class="form-control" required readonly value="${bibliotecas[i].id}">
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label" for="inputBibliotecaConcelhoEditar">Concelho</label>
														<div class="col-md-9">
															<select class="form-control" id="inputBibliotecaConcelhoEditar" required></select>
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label" for="inputBibliotecaFreguesiaEditar">Freguesia</label>
														<div class="col-md-9">
															<select class="form-control" id="inputBibliotecaFreguesiaEditar" required></select>
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-3 control-label" for="inputBibliotecaEditarMorada">Morada</label>
														<div class="col-sm-9">
															<input id="inputBibliotecaEditarMorada" type="text" maxlength="50" class="form-control" required value="${bibliotecas[i].morada}">
														</div>
													</div>
													<div class="form-group">
														<label class="col-sm-3 control-label" for="inputBibliotecaEditarCapacidade">Capacidade</label>
														<div class="col-sm-9">
															<input id="inputBibliotecaEditarCapacidade" type="number" min="1" max="999" class="form-control" required value="${bibliotecas[i].capacidade}">
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label" for="inputBibliotecaEditarDescricao">Descrição</label>
														<div class="col-md-9">
															<textarea id="inputBibliotecaEditarDescricao" class="form-control" rows="5" required style="resize: vertical; min-height: 48px; max-height: 150px;">${bibliotecas[i].descricao}</textarea>
														</div>
													</div>
													<input type="submit" class="col-lg-2 btn btn-warning btn-md pull-right" style="margin-left:10px;" value="Confirmar">
													<button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Fechar</button>
												</form>                                  
											</div>`
					modalFooter.innerHTML = ""

					let inputBibliotecaConcelhoEditar = document.getElementById("inputBibliotecaConcelhoEditar")
					let inputBibliotecaFreguesiaEditar = document.getElementById("inputBibliotecaFreguesiaEditar")
					let inputBibliotecaEditarMorada = document.getElementById("inputBibliotecaEditarMorada")
					let inputBibliotecaEditarCapacidade = document.getElementById("inputBibliotecaEditarCapacidade")
					let inputBibliotecaEditarDescricao = document.getElementById("inputBibliotecaEditarDescricao")

					inputBibliotecaConcelhoEditar.addEventListener("change", function () {
						gerarComboboxFreguesias(inputBibliotecaConcelhoEditar.value, true)
					})

					gerarComboboxConcelhosEditarBiblioteca(idBiblioteca)
					gerarComboboxFreguesias(inputBibliotecaConcelhoEditar.value, true, Biblioteca.getConcelhoFreguesiaById(idBiblioteca)[1])

					//form editar
					let formEditarBiblioteca = document.getElementById("formEditarBiblioteca")
					formEditarBiblioteca.addEventListener("submit", function (event) {
						bibliotecas[i].idConcelho = Concelho.getIdByConcelho(inputBibliotecaConcelhoEditar.value)
						bibliotecas[i].idFreguesia = Freguesia.getIdByFreguesia(inputBibliotecaFreguesiaEditar.value)

						let resultado = Biblioteca.getCoordenadasByMorada(inputBibliotecaEditarMorada.value)

						bibliotecas[i].morada = resultado[0]
						bibliotecas[i].coordenadas = resultado[1]
						bibliotecas[i].capacidade = parseInt(inputBibliotecaEditarCapacidade.value)
						bibliotecas[i].descricao = inputBibliotecaEditarDescricao.value

						//atualizar a key do localStorage
						localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas))

						swal("Biblioteca editada!", `A biblioteca cujo id é ${idBiblioteca} foi editada com sucesso.`, "success");
						gerarMapaBibliotecas()
						$("#modal").modal("hide")

						event.preventDefault()
					})
				})
			})
		}
	}
}

function gerarComboboxConcelhosEditarBiblioteca(idBiblioteca) {
	let inputBibliotecaConcelhoEditar = document.getElementById("inputBibliotecaConcelhoEditar")
	let str = ""
	for (let i in concelhos) {
		str += `<option value="${concelhos[i].concelho}"`
		if (Biblioteca.getConcelhoFreguesiaById(idBiblioteca)[0] === concelhos[i].concelho) {
			str += ` selected>${concelhos[i].concelho}</option>`
		} else {
			str += `>${concelhos[i].concelho}</option>`
		}
	}
	inputBibliotecaConcelhoEditar.innerHTML = str
}

function gerarComboboxConcelhosEditarFreguesia(idFreguesia) {
	let inputFreguesiaEditarConcelho = document.getElementById("inputFreguesiaEditarConcelho")
	let str = ""
	for (let i in concelhos) {
		str += `<option value="${Concelho.getConcelhoById(concelhos[i].id)}"`
		if (Concelho.getConcelhoById(Freguesia.getIdConcelhoById(idFreguesia)) === concelhos[i].concelho) {
			str += ` selected>${concelhos[i].concelho}</option>`
		} else {
			str += `>${concelhos[i].concelho}</option>`
		}
	}
	inputFreguesiaEditarConcelho.innerHTML = str
}