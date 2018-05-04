//área utilizador

let areaUtilizador = document.getElementById("areaUtilizador")
let btnPainelAdmin = document.getElementById("btnPainelAdmin")
areaUtilizador.style.visibility = "hidden"
btnPainelAdmin.style.visibility = "hidden"

//efetuar login
let btnLogin = document.getElementById("btnLogin")
let formLogin = document.getElementById("formLogin")
let loginInputEmail = document.getElementById("loginInputEmail")
let loginInputPassword = document.getElementById("loginInputPassword")

formLogin.addEventListener("submit", function(event) {
    let idUtilizador = Utilizador.getIdByEmail(loginInputEmail.value)
    let erro = false

    if(idUtilizador !== -1) {
        if(Utilizador.getPasswordById(idUtilizador) === loginInputPassword.value) {
            idUtilizadorLogado = idUtilizador
            localStorage.setItem("idUtilizadorLogado", idUtilizadorLogado)

            btnLogin.style.visibility = "hidden"
            btnLogin.innerHTML = ""

            areaUtilizador.style.visibility = "visible"
            areaUtilizador.innerHTML = "ÁREA DE UTILIZADOR"

            if(Utilizador.getTipoAcessoById(idUtilizadorLogado) === 0) {
                btnPainelAdmin.style.visibility = "visible"
            }

            swal("Bem vindo, " + Utilizador.getPrimeiroNomeById(idUtilizadorLogado) + "!", {
                icon: "success",
                buttons: false,
                closeOnClickOutside: false,
                closeOnEsc: false,
                timer: 1000,
            });
            $("#modalLogin").modal("hide")
        } else {
            erro = true
        }
    } else {
        erro = true
    }

    if(erro) {
        swal("Erro!", "Email ou password inválido(s).", "error");
    }

    event.preventDefault()
})

btnLogin.addEventListener("click", function() {
    formLogin.reset()
})