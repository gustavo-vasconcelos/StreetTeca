window.onload = function () {
    /*window.addEventListener("resize", function () {
        let rankingDiv = document.getElementsByClassName("ranking-div")
        let ranking = document.getElementsByClassName("numero-ranking")
        for (let i = 0; i < rankingDiv.length; i++) {
            let altura = rankingDiv[i].clientHeight;

            if (altura >= 160) {
                rankingDiv[i].style.paddingTop = `${altura * 0.2}px`
                ranking[i].style.fontSize = `${altura * 0.4}px`
            } else if(altura >= 130){
                rankingDiv[i].style.paddingTop = `${altura * 0.04}px`
            } else {
                rankingDiv[i].style.paddingTop = `${altura * 0.02}px`
                ranking[i].style.fontSize = `${altura * 0.5}px`
            }
            
        }
    })*/


    (function ($) {
        "use strict"; // Start of use strict

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

        var animar = function () {
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
        var centrar = function () {
            if ($(window).width() <= 575) {
                $(".livro-pontuado").wrap("<div class='text-center livro-centrar'></div>");
            }
            else {
                $(".livro-centrar").contents().unwrap();
            }
        }

        $(window).resize(centrar)
        $(document).ready(centrar)


    })(jQuery); // End of use strict

}




/*
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

if(window.innerWidth <= 992) {
    for (let i = 0; i < trigger.length; i++) {
        trigger[i].onclick = function () {
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
        };
    }
}*/

