const addButton = document.querySelector("#button-add");
const modal = document.querySelector("#modal");
const fecharmodalButton = document.querySelector("#fechar-modal");
const form = document.querySelector("#form-add");
const table = document.querySelector("#tbody");
let sessao = sessionStorage.getItem('logado');
let idx = form.idx.value

//salvar no localstorage
const atualizarLocalStorage = (produtos) =>{localStorage.setItem('produtos', JSON.stringify(produtos))}

//recupera os produtos
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos')|| '[]')

const salvarProduto = (e) =>{
    e.preventDefault()
    //pegar os dados do formulário
    const descricao = form.descricao.value;
    const detalhamento = form.detalhamento.value;

    if(idx == 'novo'){
        const produtos = recuperarLocalStorage();
        produtos.push({id:produtos.length + 1, descricao, detalhamento});
        atualizarLocalStorage(produtos);
        form.reset();
    }else {
        let produto = {id: idx, descricao, detalhamento}
        atualizaProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo';
    }

 
}

const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    table.innerHTML = '';
    for(const produto of produtos){
        table.innerHTML += `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.descricao}</td>
            <td>${produto.detalhamento}</td>
            <td>
                <button class="button-apagar" onclick="removerProduto(${produto.id})">Apagar</button>
                <button class="button-editar" onclick="atualizarProduto(${produto.id})">Editar</button>
            </td>
        </tr>
        `
    }
}

const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    if(indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    preencherTabela();
}

const atualizarProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    form.descricao.value = produtos[indexProduto].descricao;
    form.detalhamento.value = produtos[indexProduto].detalhamento;
    abrirModal();
    idx = id;
}

const atualizaProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);   
}


form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto);
form.addEventListener("submit", preencherTabela)

document.addEventListener("DOMContentLoaded", function () {
    fecharmodalButton.addEventListener("click", fecharModal)
    logadoNaHome();
    addButton.addEventListener("click", abrirModal)
    document.querySelector('#sair').addEventListener('click', (e) => {
        e.preventDefault()
        sair();
    });
})

function abrirModal() {
    modal.style.display = "block"
}

function fecharModal() {
    modal.style.display = "none"
}


function nomeLocalStorage() {
    let nomeLocalStorage = sessionStorage.getItem("logado")
    const nome = document.querySelector("#nome")
    nome.innerHTML = nomeLocalStorage
}


function logadoNaHome() {
    if (!sessao) {
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 600);
    }
}

function sair() {
    sessionStorage.removeItem("logado")
    setTimeout(function () {
        window.location.href = "index.html";
    }, 600);
}
