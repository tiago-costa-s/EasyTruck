//criado para verificar se o usuário já está logado ao acessar a página de login

if (window.usrAtual != null) {
    var criah2 = document.createElement('h2');
    var criap = document.createElement('p');
    var criap1 = document.createElement('p');
    var criap2 = document.createElement('p');
    criah2.setAttribute("class", "ja-logado")
    criap.innerHTML = "</br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>"
    var elemento = document.querySelector('.forml');
    elemento.innerHTML='';
    criah2.innerText ='Usuário já logado';
    elemento.appendChild(criah2)
    elemento.appendChild(criap)
}