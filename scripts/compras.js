document.addEventListener("DOMContentLoaded", function(){imprimeCompras();listaEnderecos()});

async function imprimeCompras(){
    console.log(`aqui`);
    const consulta = await fetch('/atividadeWeb/controllers/compras_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    let tabela = document.getElementById(`tabela`);
    for(let dado of dados) {

        const id = dado.id;
        const endereco = dado.endereco_id;
        const data = dado.data;

        let tr = document.createElement(`tr`);
        let th0 = document.createElement(`th`);
        let th1 = document.createElement(`th`);
        let th2 = document.createElement(`th`);

        th0.innerHTML = id;
        th1.innerHTML = endereco;
        th2.innerHTML = data;

        tr.appendChild(th0);
        tr.appendChild(th1);
        tr.appendChild(th2);

        let atualiza = document.createElement(`button`);
        let deleta = document.createElement(`button`);
        atualiza.setAttribute(`onClick`,`alteraCompra(${id})`);
        deleta.setAttribute(`onClick`,`deletaCompra(${id})`);
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

async function listaEnderecos(){
    const consulta = await fetch('/atividadeWeb/controllers/enderecos_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    let select = document.getElementById(`endereco`);
    for(let dado of dados) {

        let enderecos = [];
        enderecos[0] = dado.estado;
        enderecos[1] = dado.cidade;
        enderecos[2] = dado.rua;
        enderecos[3] = dado.numero;
        enderecos[4] = dado.bairro;
        enderecos[5] = dado.telefone;

        let option = document.createElement(`option`); 
        option.value = dado.id;
        for (let i = 0; i<6;++i){
            option.innerHTML += `${enderecos[i]}, `;
        }
        select.appendChild(option);
 
    }
}

async function cadastraCompra(){
    let endereco = document.getElementById(`endereco`).value;
    let data = document.getElementById(`data`).value;

    const dados = {
        endereco: endereco,
        data: data
    }
    fetch(`/atividadeWeb/controllers/compras_controller.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Se o servidor requer autenticação, você pode adicionar cabeçalhos de autorização aqui
        },
        body: JSON.stringify(dados)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Resposta do servidor:', data);
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
}

function alteraCompra(){
    
}
function deletaCompra(id){

    const data = {
        id: id
    }
    fetch(`/atividadeWeb/controllers/compras_controller.php`, {
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