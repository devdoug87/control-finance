const formCompra = document.querySelector ('.form-compra');
const lista = document.querySelector ('.lista-compras');
const campoProduto = document.querySelector ('.campo-produto');
const campoValor = document.querySelector ('.campo-valor');
const totalSpan = document.querySelector ('.total');
const btnLimpar = document.querySelector ('.limpar');

let compras = JSON.parse(localStorage.getItem('compras')) || [];

function atualizarLista() {
    lista.innerHTML = '';
    let total = 0;

    compras.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.produto} - R$ ${item.valor.toFixed(2)}`;
    

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'remover';

    btnRemover.classList.add('remover-btn');

    btnRemover.addEventListener('click', () => {
        compras.splice(index, 1);
        localStorage.setItem('compras', JSON.stringify(compras));
        atualizarLista();
    });

    li.appendChild(btnRemover);
    lista.appendChild(li);
    total += item.valor;
});
totalSpan.textContent = total.toFixed(2);
}

formCompra.addEventListener('submit', function(event) {
    event.preventDefault();

    const produto = campoProduto.value;
    const valor = parseFloat(campoValor.value);

    if(!produto || isNaN(valor))
        return;

    compras.push({ produto, valor });
    localStorage.setItem('compras', JSON.stringify(compras));

    atualizarLista();
    formCompra.reset();
});

btnLimpar.addEventListener('click', function() {
    if(confirm("Deseja realmente apagar a lista")) {
        compras = [];
        localStorage.removeItem('compras');
        atualizarLista();
    }
});

atualizarLista();