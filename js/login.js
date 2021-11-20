var usrAtual= sessionStorage.getItem('usrLogado')

if (window.usrAtual != null ) {
    var pegaH1 = document.querySelector('.text-logo');
    var criaP = document.createElement('p');
    var classeP = criaP.setAttribute("class","usuario-logado");
    var textoP = document.createTextNode('Seja bem-vindo ' + usrAtual);
    criaP.appendChild(textoP);
    pegaH1.appendChild(criaP);
    var criaBotaoLogout = document.createElement("input");
    criaBotaoLogout.setAttribute("type","submit");
    criaBotaoLogout.setAttribute("class","botao-loginout");
    criaBotaoLogout.value = "Logout";
    pegaH1.appendChild(criaBotaoLogout);
    criaBotaoLogout.addEventListener("click",loginOrLogout);
}

if (window.usrAtual == null && !document.URL.includes('login')) {
    var pegaH1 = document.querySelector('.text-logo');
    var criaBotaoLogin = document.createElement("input");
    criaBotaoLogin.setAttribute("type","submit");
    criaBotaoLogin.setAttribute("class","botao-loginout");
    criaBotaoLogin.value = "Login";
    pegaH1.appendChild(criaBotaoLogin);
    criaBotaoLogin.addEventListener("click",loginOrLogout);
}

var loginButton = document.querySelector(".button-login")
loginButton.addEventListener("click", logar)

var usuario = {
    nome: ['Otavio', 'Administrador'],
    sobrenome: ["Silva", "Admin"], datadenascimento: ["1995-10-22", "1900-01-01"], cpf: ["102.874.966-00", "000.000.00-00"], login: ['otavio.teste', 'admin'], email: ['otaviored@gmail.com', 'admin@admin.com'], senha: ['@kalunga123', 'admin']
}
localStorage.setItem('cadastroUsuarios', usuario)
var usuarioLogado='';


function logar (event) {
    event.preventDefault();
    let loginUsuario = document.querySelector('.login-login').value;
    let senhaUsuario = document.querySelector('.senha-login').value;
    let loginExists = usuario.login.includes(loginUsuario);
    if (!loginExists) {
        alert('Login não existe')
        loginUsuario = '';
        senhaUsuario = '';
        return
    } 
    let loginId = usuario.login.indexOf(loginUsuario);
    let senhaCorreta = (usuario.senha[loginId] === senhaUsuario) ? true : false;
    if (!senhaCorreta) {
        alert('Senha inválida tente novamente')
        senhaUsuario = '';
        return
    }
    usuarioLogado = usuario.nome[loginId];
    sessionStorage.setItem('usrLogado',usuarioLogado)
    window.location.replace("./index.html")       
}

var botaoLoginLogout = document.querySelector(".botao-loginout")
botaoLoginLogout.addEventListener("click",loginOrLogout)

function loginOrLogout(event){
    var valor = (event.target.value);
    if (valor == 'Login') {
        paginaLogin()
    } else {
        deslogar()
    }
}

function deslogar () {
    sessionStorage.removeItem('usrLogado')
    usrAtual= null
    location.reload()
}


function paginaLogin () {
    window.location.replace("./login.html")
}