window.onload = function() {
    window.addEventListener("resize", function () {
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
    })
}
