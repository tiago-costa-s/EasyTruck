var objDevolucao = '';
criaObj();

function criaObj() {
    if (usrAtual == 'Otavio') {
        objDevolucao = {
            codigo: ["685E22", "665CD4", "K45FF6"], empresa: ["Americanas.com", "Magazine Luiza", "Ponto Frio"],
            dataenv: ["22/10/2019", "30/06/2020", "02/07/2020"], status: ["Finalizada", "Em Trânsito", "Aguardando Coleta"]
        }
    } else if (usrAtual == 'admin') {
        objDevolucao = {
            codigo: ["15322A"], empresa: ["Kabum"], dataenv: ["15/06/2020"], status: ["Finalizada"]
        }
    }
}

var possiveisStatus = ["Aguardando Coleta", "Em Trânsito", "Finalizada"]
var classeStatus = ["aguardando", "transito","finalizada"]
consultaDev()

function consultaDev(event) {
    if (usrAtual != null) {
        var bodinho = document.querySelector("body");
        var createModalDiv = document.createElement("div");
        var createModalBox = document.createElement("div");
        var fechar = document.createElement("div");
        createModalDiv.setAttribute("id", "modal");
        createModalBox.setAttribute("class", "modal-box");
        fechar.setAttribute("class", "fechar");
        fechar.innerHTML = "X";
        createModalBox.appendChild(fechar);
        createModalDiv.appendChild(createModalBox);
        bodinho.appendChild(createModalDiv);
        geraListaDev();
        consultaFecha()
    } else { alert("Você não está logado") }
}

function consultaFecha() {
    fecharModal = document.querySelector(".fechar");
    fecharModal.addEventListener("click", fechar)
}

function fechar() {
    var fechaModal = document.querySelector("#modal");
    fechaModal.remove();
}

function geraListaDev() {
    var getModalBox = document.querySelector(".modal-box");
    var createH2 = document.createElement("h2");
    createH2.innerText = 'Suas Devoluções';
    getModalBox.appendChild(createH2)
    //
    var createModalConteudo = document.createElement("div");
    createModalConteudo.setAttribute("class", "modal-box-conteudo")
    //
    var createTabela = document.createElement("table");
    var camposTabela = Object.keys(objDevolucao);
    var valoresTabela = Object.values(objDevolucao);
    var valoresCodigo = valoresTabela[0];
    var valoresEmpresa = valoresTabela[1];
    var valoresDataenv = valoresTabela[2];
    var valoresStatus = valoresTabela[3];
    //
    for (id in possiveisStatus) {
        var createCheck = document.createElement("input");
        var createLabel = document.createElement("label");
        createCheck.setAttribute("id",possiveisStatus[id])
        createCheck.setAttribute("type", "checkbox")
        if (possiveisStatus[id] != "Finalizada") {
            createCheck.checked = true;
        }
        createCheck.setAttribute("class", "modal-box-checkbox modal-box-checkbox-" + classeStatus[id])
        createLabel.setAttribute("for",possiveisStatus[id]);
        createLabel.innerText  = possiveisStatus[id]
        getModalBox.appendChild(createCheck)
        getModalBox.appendChild(createLabel)
    }
    //
    var cabecalhoTabela = document.createElement("tr");
    for (id in camposTabela) {
        var createTh = document.createElement("th")
        var textTh = document.createTextNode(camposTabela[id]);
        createTh.appendChild(textTh)
        cabecalhoTabela.appendChild(createTh)
        createTabela.appendChild(cabecalhoTabela);
        createModalConteudo.appendChild(createTabela)
    }
    for (id in valoresCodigo) {
        var createRow = document.createElement("tr");
        if (valoresStatus[id] == "Finalizada") {
            createRow.setAttribute("class","finalizada")
            createRow.setAttribute("id", "finalizada")
        } else if (valoresStatus[id].includes("Aguardando")) {
            createRow.setAttribute("class", "aguardando")
            createRow.setAttribute("id", "aguardando")
        } else {
            createRow.setAttribute("class","transito")
            createRow.setAttribute("id", "transito")
        }
        var createDataCodigo = document.createElement("td");
        createDataCodigo.innerText = valoresCodigo[id];
        var createDataEmpresa = document.createElement("td");    
        createDataEmpresa.innerText = valoresEmpresa[id];
        var createDataData = document.createElement("td");
        createDataData.innerText = valoresDataenv[id];
        var createDataStatus = document.createElement("td");
        createDataStatus.innerText = valoresStatus[id];
        createRow.appendChild(createDataCodigo);
        createRow.appendChild(createDataEmpresa);
        createRow.appendChild(createDataData);
        createRow.appendChild(createDataStatus);
        createTabela.appendChild(createRow)
    }
    getModalBox.appendChild(createModalConteudo)
    verificaCheckFinalizada()
    verificaCheckAguardando()
    verificaCheckTransito()
}

function verificaCheckFinalizada () {
    var check = document.querySelector(".modal-box-checkbox-finalizada");
    check.addEventListener("change",mudaFinalizada)
}

function mudaFinalizada() {
    var check = document.querySelector(".modal-box-checkbox-finalizada");
    var finalizada = document.querySelector("tr#finalizada")
    if (check.checked) {
        finalizada.removeAttribute("class","finalizada")
    } else {finalizada.setAttribute("class", "finalizada")}
}

function verificaCheckAguardando () {
    var check = document.querySelector(".modal-box-checkbox-aguardando");
    check.addEventListener("change",mudaAguardando)
}

function mudaAguardando() {
    var check = document.querySelector(".modal-box-checkbox-aguardando");
    var aguardando = document.querySelector("tr#aguardando")
    if (check.checked) {
        aguardando.removeAttribute("class","finalizada")
    } else {aguardando.setAttribute("class", "finalizada")}
}
function verificaCheckTransito () {
    var check = document.querySelector(".modal-box-checkbox-transito");
    check.addEventListener("change",mudaTransito)
}

function mudaTransito() {
    var check = document.querySelector(".modal-box-checkbox-transito");
    var transito = document.querySelector("tr#transito")
    if (check.checked) {
        transito.removeAttribute("class","finalizada")
    } else {transito.setAttribute("class", "finalizada")}
}
