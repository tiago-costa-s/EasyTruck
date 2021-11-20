//Fazer evento para caso mude o valor ele mudar a label
document.addEventListener("change", verelemento)
var fecharModal = '';
//Criado essa função pois o event listener também pegava quando mudava o valor do número do rastreio
//Essa função vai validar se o que teve alteração de valor foi realmente os dois campos radios e se for
//vai acionar a função de trocar mudar valores
function verelemento(event) {
    var isRadio = event.target.type;
    if (isRadio === 'radio') {
        changeInput()
    } else { return }
}

var devInput = '';

function changeInput() {
    var actualInput = document.querySelector(":checked");
    var buttonChange = document.querySelector(".rastreio-form-submit")
    var label = document.querySelector(".label-text");
    label.innerHTML = actualInput.value;
    var textInput = document.querySelector(".rastreio-form-text")
    if (actualInput.id === 'numero-rastreio') {
        textInput.removeAttribute("disabled");
        textInput.required = true;
        buttonChange.value = "Enviar";
        textInput.setAttribute("placeholder", "Número do Rastreio")
        buttonChange.removeEventListener("click", consultaDev)
    } else if (actualInput.id === 'consultar-usuario') {
        textInput.disabled = true;
        textInput.removeAttribute("required");
        textInput.removeAttribute("placeholder")
        buttonChange.value = "Consultar"
        
    }
}

var button = document.querySelector(".rastreio-form-submit");
button.addEventListener("click", verificaTipo)

function verificaTipo(event) {
    var valor = event.target.value
    if (valor =="Consultar") {
        consultaDev()
        event.preventDefault();  
    } else {
        var formulario = document.querySelector("form");
        var codigoRastreio = document.querySelector(".rastreio-form-text").value;
        formulario.setAttribute("action","./rastreio/" + codigoRastreio + ".html");
    }
}

var listaDevolucao = ''

var objDevolucao = '';
criaObj();

function criaObj() {
    if (usrAtual == 'Otavio') {
        objDevolucao = {
            codigo: ["685E22", "665CD4", "K45FF6"], empresa: ["Americanas.com", "Magazine Luiza", "Ponto Frio"],
            dataenv: ["22/10/2019", "30/06/2020", "05/07/2020"], status: ["Finalizada", "Em Trânsito", "Aguardando Coleta"]
        }
    } else if (usrAtual == 'admin') {
        objDevolucao = {
            codigo: ["15322A"], empresa: ["Kabum"], dataenv: ["15/06/2020"], status: ["Finalizada"]
        }
    }
}
var campos = ["Código", "Empresa", "Data de Envio", "Status"]

var possiveisStatus = ["Aguardando Coleta", "Em Trânsito", "Finalizada"]
var classeStatus = ["aguardando", "transito", "finalizada"]


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
    var createEmptyTable = document.createElement("table");
    var createTabela = document.createElement("table");
    var camposTabela = campos;
    var valoresTabela = Object.values(objDevolucao);
    var valoresCodigo = valoresTabela[0];
    var valoresEmpresa = valoresTabela[1];
    var valoresDataenv = valoresTabela[2];
    var valoresStatus = valoresTabela[3];
    //
    for (id in possiveisStatus) {
        var createCheck = document.createElement("input");
        var createLabel = document.createElement("label");
        createCheck.setAttribute("id", possiveisStatus[id])
        createCheck.setAttribute("type", "checkbox")
        if (possiveisStatus[id] != "Finalizada") {
            createCheck.checked = true;
        }
        createCheck.setAttribute("class", "modal-box-checkbox modal-box-checkbox-" + classeStatus[id])
        createLabel.setAttribute("for", possiveisStatus[id]);
        createLabel.innerText = possiveisStatus[id]
        getModalBox.appendChild(createCheck)
        getModalBox.appendChild(createLabel)
    }
    //
    createTabela.setAttribute("class", "table-conteudo")
    createEmptyTable.setAttribute("class","table-button")
    //
    var cabecalhoEmpty = document.createElement("tr");
    var cabecalhoTabela = document.createElement("tr");
    var vazio = document.createElement("th");
    vazio.setAttribute("class", "vazio")
    cabecalhoEmpty.appendChild(vazio)
    for (id in camposTabela) {
        var createTh = document.createElement("th")
        var textTh = document.createTextNode(camposTabela[id]);
        createTh.appendChild(textTh)
        cabecalhoTabela.appendChild(createTh)
        createTabela.appendChild(cabecalhoTabela);
        createModalConteudo.appendChild(createEmptyTable)
        createModalConteudo.appendChild(createTabela)
    }
    for (id in valoresCodigo) {
        var createButtonRow = document.createElement("tr");
        var createRow = document.createElement("tr");
        if (valoresStatus[id] == "Finalizada") {
            createButtonRow.setAttribute("class", "finalizada")
            createButtonRow.setAttribute("id", "finalizada")
            createRow.setAttribute("class", "finalizada")
            createRow.setAttribute("id", "finalizada")
        } else if (valoresStatus[id].includes("Aguardando")) {
            createButtonRow.setAttribute("class", "aguardando")
            createButtonRow.setAttribute("id", "aguardando")
            createRow.setAttribute("class", "aguardando")
            createRow.setAttribute("id", "aguardando")
        } else {
            createButtonRow.setAttribute("class", "transito")
            createButtonRow.setAttribute("id", "transito")
            createRow.setAttribute("class", "transito")
            createRow.setAttribute("id", "transito")
        }
        var createButton = document.createElement("input");
        createButton.setAttribute("type", "submit");
        createButton.setAttribute("value", "Consultar")
        createButton.setAttribute("class", "modal-box-conteudo-button");
        createButton.setAttribute("name", "linha-" + id)
        var createDataCodigo = document.createElement("td");
        createDataCodigo.innerText = valoresCodigo[id];
        createDataCodigo.setAttribute("name","linha-" + id)
        var createDataEmpresa = document.createElement("td");
        createDataEmpresa.innerText = valoresEmpresa[id];
        var createDataData = document.createElement("td");
        createDataData.innerText = valoresDataenv[id];
        var createDataStatus = document.createElement("td");
        createDataStatus.innerText = valoresStatus[id];
        if (valoresStatus[id] == "Finalizada") {
            createDataStatus.setAttribute("class", "status status-finalizada")
        } else if (valoresStatus[id].includes("Aguardando")) {
            createDataStatus.setAttribute("class", "status status-aguardando")
        } else {
            createDataStatus.setAttribute("class", "status status-transito")
        }
        createButtonRow.appendChild(createButton);
        createRow.appendChild(createDataCodigo);
        createRow.appendChild(createDataEmpresa);
        createRow.appendChild(createDataData);
        createRow.appendChild(createDataStatus);
        createEmptyTable.appendChild(createButtonRow)
        createTabela.appendChild(createRow)
    }
    getModalBox.appendChild(createModalConteudo)
    verificaCheckFinalizada()
    verificaCheckAguardando()
    verificaCheckTransito()
    verificaConsulta()
}

function verificaCheckFinalizada() {
    var check = document.querySelector(".modal-box-checkbox-finalizada");
    check.addEventListener("change", mudaFinalizada)
}

function mudaFinalizada() {
    var check = document.querySelector(".modal-box-checkbox-finalizada");
    var finalizada = document.querySelectorAll("tr#finalizada")
    if (check.checked) {
        finalizada[0].removeAttribute("class", "finalizada");
        finalizada[1].removeAttribute("class", "finalizada");
    } else { 
        finalizada[0].setAttribute("class", "finalizada");
        finalizada[1].setAttribute("class", "finalizada");
    }
}

function verificaCheckAguardando() {
    var check = document.querySelector(".modal-box-checkbox-aguardando");
    check.addEventListener("change", mudaAguardando)
}

function mudaAguardando() {
    var check = document.querySelector(".modal-box-checkbox-aguardando");
    var aguardando = document.querySelectorAll("tr#aguardando")
    if (check.checked) {
        aguardando[0].removeAttribute("class", "finalizada")
        aguardando[1].removeAttribute("class", "finalizada")
    } else { 
        aguardando[0].setAttribute("class", "finalizada")
        aguardando[1].setAttribute("class", "finalizada")
     }
}
function verificaCheckTransito() {
    var check = document.querySelector(".modal-box-checkbox-transito");
    check.addEventListener("change", mudaTransito)
}

function mudaTransito() {
    var check = document.querySelector(".modal-box-checkbox-transito");
    var transito = document.querySelectorAll("tr#transito")
    if (check.checked) {
        transito[0].removeAttribute("class", "finalizada");
        transito[1].removeAttribute("class", "finalizada");
    } else { 
        transito[0].setAttribute("class", "finalizada");
        transito[1].setAttribute("class", "finalizada");
     }
}

function verificaConsulta() {
    var tabelaConsulta = document.querySelector(".table-button");
    tabelaConsulta.addEventListener("click", rastreia)
}

function rastreia (event) {
    var tabelaConteudo = document.querySelector(".table-conteudo");
    var nome = event.target.name;
    var codigoRastreio = tabelaConteudo.querySelector("td[name="+ nome+"]").innerHTML
    window.location.href = "./rastreio/"+codigoRastreio+".html"
}