//importar variáveis do sessionStorage
utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
transformarEmInstanciaUtilizador(utilizadores)

idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

//área utilizador
let areaUtilizador = document.getElementById("areaUtilizador")
let btnPainelAdmin = document.getElementById("btnPainelAdmin")
areaUtilizador.style.display = "none"
btnPainelAdmin.style.display = "none"

//efetuar login
let btnLogin = document.getElementById("btnLogin")
let formLogin = document.getElementById("formLogin")
let loginInputEmail = document.getElementById("loginInputEmail")
let loginInputPassword = document.getElementById("loginInputPassword")

formLogin.addEventListener("submit", function (event) {
    let idUtilizador = Utilizador.getIdByEmail(loginInputEmail.value)
    let erro = false

    if (idUtilizador !== -1) {
        if (Utilizador.getPasswordById(idUtilizador) === loginInputPassword.value) {
            idUtilizadorLogado = idUtilizador
            localStorage.setItem("idUtilizadorLogado", idUtilizadorLogado)

            btnLogin.style.display = "none"

            areaUtilizador.style.display = "inline"
            areaUtilizador.innerHTML = "ÁREA DE UTILIZADOR"

            if (Utilizador.getTipoAcessoById(idUtilizadorLogado) === 0) {
                btnPainelAdmin.style.display = "inline"
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

    if (erro) {
        swal("Erro!", "Email ou password inválido(s).", "error");
    }

    event.preventDefault()
})

btnLogin.addEventListener("click", function () {
    formLogin.reset()
})

//btn logout
let btnLogout = document.getElementById("btnLogout")
btnLogout.addEventListener("click", function () {
    swal("Até à próxima, " + Utilizador.getPrimeiroNomeById(idUtilizadorLogado) + "!", {
        icon: "success",
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        timer: 1000,
    });
    
    idUtilizadorLogado = -1
    localStorage.setItem("idUtilizadorLogado", idUtilizadorLogado)

    btnPainelAdmin.style.display = "none"
    areaUtilizador.style.display = "none"
    btnLogin.style.display = "inline"
})