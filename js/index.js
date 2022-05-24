const submit = document.querySelector("#submit-button");

submit.addEventListener("click", function (e) {
    e.preventDefault()

    logar()
})


function logar() {
    const usuariocamp = document.querySelector("#usuario");
    const senhacamp = document.querySelector("#senha");

    let usuario = {
        login: '',
        senha: ''
    }

    usuario = JSON.parse(localStorage.getItem('usuarios'));

    console.log(usuario)

    usuario.forEach((elemento) => {
        if (elemento.login === usuariocamp.value && elemento.senha === senhacamp.value) {
            usuario = {
                login: elemento.login,
                senha: elemento.senha
            }
        }
    });
    if (usuario.login === usuariocamp.value && usuario.senha === senhacamp.value) {
        sessionStorage.setItem('logado', usuario.login)
        const modalSucesso = document.querySelector(".modal-sucesso");
        modalSucesso.style.visibility = "visible";
        setTimeout(function () {
            window.location.href = 'notas.html';
        }, 600);
        
    } else {
        const modalerroVazio = document.querySelector(".modal-erro-vazio");
        modalerroVazio.style.visibility = "visible";
    }
}