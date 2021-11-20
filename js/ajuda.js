var corpo = document.querySelector(".corpo-faq")
corpo.addEventListener("click", verificaClick)

function verificaClick (event) {
    var ondeClick = event.target.type;
    if (ondeClick == "image") {
        var imgTarget = event.target;
        var valorClick = event.target.value;
        var pCorreto = document.querySelectorAll(".corpo-faq p")[valorClick];
        var abrirOuFechar = pCorreto.classList.contains("escondido");
        if (abrirOuFechar) {
            imgTarget.src = "./imagens/seta-baixo.png"
            pCorreto.removeAttribute("class","escondido")
        } else {
            imgTarget.src = "./imagens/seta-lado.png"
            pCorreto.setAttribute("class", "escondido")
        }
        
    }
}