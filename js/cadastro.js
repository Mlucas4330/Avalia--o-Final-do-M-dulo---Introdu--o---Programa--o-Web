const campoUsuario = document.querySelector("#input-usuario");
const labelUsuario = document.querySelector("#label-usuario");
let validEmail = false;

const campoSenha = document.querySelector("#input-senha");
const labelSenha = document.querySelector("#label-senha");
let validSenha = false;

const campoConfirmaSenha = document.querySelector("#input-confirma-senha");
const labelConfirmaSenha = document.querySelector("#label-confirma-senha");
let validConfirmaSenha = false;

const formularioCadastro = document.querySelector("#form-cadastro");
const botaoCadastrar = document.querySelector("#submit-button");

const regSenha =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

campoUsuario.addEventListener("keyup", verificaEmail);
campoSenha.addEventListener("keyup", verificaSenha);
campoConfirmaSenha.addEventListener("keyup", verificaConfirmaSenha);
botaoCadastrar.addEventListener("click", verificaCampos);

function verificaEmail() {
    if (campoUsuario.value.length < 3) {
        labelUsuario.setAttribute("style", "color: red");
        labelUsuario.innerHTML = "Insira no mínimo 3 caracteres";
        campoUsuario.setAttribute(
            "style",
            "border-color: red;",
        );
        validEmail = false;
    } else {
        labelUsuario.setAttribute("style", "color: green");
        labelUsuario.innerHTML = "";
        campoUsuario.setAttribute(
            "style",
            "border-color: green;"
        );
        validEmail = true;
    }
}

function verificaSenha() {
    let senhaValida = campoSenha.value.match(regSenha);

    if (campoSenha.value.length < 8) {
        labelSenha.setAttribute("style", "color: red");
        labelSenha.innerHTML = "Insira no mínimo 8 caracteres";
        campoSenha.setAttribute(
            "style",
            "border-color: red;"
        );
        validSenha = false;
    } else if (senhaValida === null) {
        labelSenha.innerHTML =
            "A senha deve conter uma letra maíuscula e caracteres especiais";
        validSenha = false;
    } else {
        labelSenha.setAttribute("style", "color: green");
        labelSenha.innerHTML = "";
        campoSenha.setAttribute(
            "style", "border-color: green;"
        );
        validSenha = true;
    }
}

function verificaConfirmaSenha() {
    if (campoSenha.value !== campoConfirmaSenha.value) {
        labelConfirmaSenha.setAttribute("style", "color: red");
        labelConfirmaSenha.innerHTML =
            "A senha digitada não corresponde";
        campoConfirmaSenha.setAttribute(
            "style",
            "border-color: red;"
        );
        validConfirmaSenha = false;
    } else {
        labelConfirmaSenha.setAttribute("style", "color: green");
        labelConfirmaSenha.innerHTML = "";
        campoConfirmaSenha.setAttribute(
            "style",
            "border-color: green;"
        );
        validConfirmaSenha = true;
    }
}

function verificaCampos(e) {
    e.preventDefault()

    if (
        campoUsuario.value === "" ||
        campoSenha.value === "" ||
        campoConfirmaSenha.value === ""
    ) {
        const modalerroVazio = document.querySelector("#modal-erro-vazio");
        modalerroVazio.style.visibility = "visible";

    } else if (!validEmail || !validSenha || !validConfirmaSenha) {
        const modalerroInfo = document.querySelector("#modal-erro-info");
        modalerroInfo.style.visibility = "visible";

    } else {
        const modalSucesso = document.querySelector("#modal-sucesso");
        modalSucesso.style.visibility = "visible";

        salvarNoLocalStorage(
            criarObjetoUsuario(
                campoUsuario.value,
                campoSenha.value,
                campoConfirmaSenha.value
            )
        );
        setTimeout(function () {
            window.location.href = "index.html";

        }, 600);

    }
}

function salvarNoLocalStorage(objetoUsuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(objetoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function criarObjetoUsuario(login, senha, confirmaSenha) {
    const objetoUsuario = {
        login: login,
        senha: senha,
        confirmaSenha: confirmaSenha,
    };
    return objetoUsuario;
}

