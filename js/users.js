var usrAtual = sessionStorage.getItem('usrLogado');

var usuario = {
    nome: ['Otavio', 'Administrador'],
    sobrenome: ["Silva", "Admin"], datadenascimento: ["1995-10-22", "1900-01-01"], cpf: ["102.874.966-00", "000.000.000-00"], login: ['otavio.teste', 'admin'], email: ['otaviored@gmail.com', 'admin@admin.com'], senha: ['@kalunga123', 'admin']
};

if (window.usrAtual != null) {
    if (document.URL.includes("faleconosco")) {
        var campoNome = document.querySelector("#nome input");
        var campoSobrenome = document.querySelector("#sobre input");
        var campoEmail = document.querySelector("#email input");
        var getUserId = usuario.nome.indexOf(usrAtual);
        campoNome.value = usuario.nome[getUserId];
        campoSobrenome.value = usuario.sobrenome[getUserId];
        campoEmail.value = usuario.email[getUserId];
    } else {
        var campoNome = document.querySelector("#nome input");
        var campoSobrenome = document.querySelector("#sobre input");
        var campoDataNasc = document.querySelector("#nascimento input")
        var campoCPF = document.querySelector("#cpf input")
        var campoEmail = document.querySelector("#email input");
        var getUserId = usuario.nome.indexOf(usrAtual);
        campoNome.value = usuario.nome[getUserId];
        campoSobrenome.value = usuario.sobrenome[getUserId];
        campoDataNasc.value = usuario.datadenascimento[getUserId];
        campoCPF.value = usuario.cpf[getUserId];
        campoEmail.value = usuario.email[getUserId];

    }
}











