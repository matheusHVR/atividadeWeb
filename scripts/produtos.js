document.addEventListener("DOMContentLoaded",imprimeProdutos());

async function imprimeProdutos(){
    console.log(`aqui`);
    const consulta = await fetch('/atividadeWeb/controllers/produtos_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    let tabela = document.getElementById(`tabela`);
    for(let dado of dados) {

        const id = dado.id; 
        const nome = dado.desccricao;
        const valor = dado.valor_unitario;

        let tr = document.createElement(`tr`);
        let th0 = document.createElement(`th`);
        let th1 = document.createElement(`th`);
        let th2 = document.createElement(`th`);
        th0.innerHTML = id;
        th1.innerHTML = nome;
        th2.innerHTML = valor;
        tr.appendChild(th0);
        tr.appendChild(th1);
        tr.appendChild(th2);

        let atualiza = document.createElement(`button`);
        let deleta = document.createElement(`button`);
        atualiza.setAttribute(`onClick`,`alteraProduto(${id})`);
        deleta.setAttribute(`onClick`,`deletaProduto(${id})`);
        atualiza.innerHTML = `alterar`;
        deleta.innerHTML = `deletar`;
        let tdAtualiza = document.createElement('th');
        let tdDeleta = document.createElement('th');
        tdAtualiza.appendChild(atualiza);
        tdDeleta.appendChild(deleta);
        tr.appendChild(tdAtualiza);
        tr.appendChild(tdDeleta);

        tabela.appendChild(tr);
 
    }
    
}

async function cadastraProdutos(){
    let descricao = document.getElementById(`descricao`).value;
    let valor_unitario = document.getElementById(`valor_unitario`).value;

    const data = {
        descricao: descricao,
        valor_unitario: valor_unitario
    }
    fetch(`/atividadeWeb/controllers/produtos_controller.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Se o servidor requer autenticação, você pode adicionar cabeçalhos de autorização aqui
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Resposta do servidor:', data);
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });

}

function alteraProduto(){

}

function deletaProduto(id){

    const data = {
        id: id
    }
    fetch(`/atividadeWeb/controllers/produtos_controller.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Se o servidor requer autenticação, você pode adicionar cabeçalhos de autorização aqui
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Resposta do servidor:', data);
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
}