window.onload = function () {
    /*
        INÍCIO APARÊNCIA
    */
    (function ($) {
        "use strict"; // Start of use strict

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

        // Collapse Navbar
        var navbarCollapse = function () {
            if ($("#mainNav").offset().top > 95) {
                $("#mainNav").addClass("navbar-shrink");
            } else {
                $("#mainNav").removeClass("navbar-shrink");
            }
        };


        var marca = function () {
            if ($(window).width() > 992) {
                if ($("#mainNav").offset().top > 846) {
                    $("#marca").addClass("mr-5");
                    $("#marca").attr('src', 'img/marca.png')
                } else {
                    $("#marca").attr("src", "");
                    $("#marca").removeClass("mr-5");
                }
            } else {
                $("#marca").attr('src', 'img/marca.png')
                $("#marca").removeClass("mr-5");
            }

        };

        // Collapse now if page is not at top
        navbarCollapse();

        marca();

        // Collapse the navbar when page is scrolled
        $(window).scroll(navbarCollapse);
        $(window).scroll(marca);
        $(window).resize(marca)



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


        //centrar mais pontuados quando a largura é menor ou igual a 575
        let wrapped = false
        let centrar = function () {
            if ($(window).width() <= 575 && !wrapped) {
                $(".livro-pontuado").wrap("<div class='text-center livro-centrar'></div>");
                wrapped = true
            }
            if ($(window).width() > 575 && wrapped) {
                wrapped = false
                $(".livro-centrar").contents().unwrap();
            }
        }

        $(window).resize(centrar)
        $(document).ready(centrar)

    })(jQuery);
    /*
        FIM APARÊNCIA
    */


    //importar variáveis do sessionStorage
    utilizadores = JSON.parse(localStorage.getItem("utilizadores"))
    transformarEmInstanciaUtilizador(utilizadores)

    idUtilizadorLogado = parseInt(localStorage.getItem("idUtilizadorLogado"))

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

    //efetuar registo
    let formRegisto = document.getElementById("formRegisto")
    let registoInputNome = document.getElementById("registoInputNome")
    let registoInputEmail = document.getElementById("registoInputEmail")
    let registoInputPassword = document.getElementById("registoInputPassword")
    let registoInputConfirmarPassword = document.getElementById("registoInputConfirmarPassword")
    let registoInputUrlFoto = document.getElementById("registoInputUrlFoto")

    formRegisto.addEventListener("submit", function(event) {
        let erro = false
        let strErro = ""
        if(Utilizador.getIdByEmail(registoInputEmail.value) !== -1) {
            erro = true
            strErro = "Já existe um utilizador registado com o mesmo email."
        }
        if(registoInputPassword.value !== registoInputConfirmarPassword.value) {
            erro = true
            //para que apenas adicione uma quebra de linha caso a variável strErro não esteja vazia
            strErro = (strErro) ? (strErro + "\n") : strErro
            strErro += "\nAs passwords não coincidem."
        }
        
        if(erro) {
            swal("Erro!", strErro, "error")
        } else {
            utilizadores.push(new Utilizador(registoInputNome.value, registoInputEmail.value, registoInputPassword.value, registoInputUrlFoto.value))
            localStorage.setItem("utilizadores", JSON.stringify(utilizadores))
            $("#modalRegisto").modal("hide")
            swal("Registo efetuado!", "Faça login com as suas credenciais.", "success")
        }
        
        event.preventDefault()
    })


    //efetuar login
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

                if (Utilizador.getTipoAcessoById(idUtilizadorLogado) === 0) {
                    btnPainelAdmin.style.display = "inline"
                }

                swal("Bem vindo, " + Utilizador.getPrimeiroUltimoNomeById(idUtilizadorLogado) + "!", {
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
}
