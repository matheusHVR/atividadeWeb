document.addEventListener("DOMContentLoaded",imprimeEnderecos());

async function imprimeEnderecos(){
    const consulta = await fetch('/atividadeWeb/controllers/enderecos_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    let tabela = document.getElementById(`tabela`);
    for(let dado of dados) {
      
        let enderecos = [];
        enderecos[0] = dado.id;
        enderecos[1] = dado.estado;
        enderecos[2] = dado.cidade;
        enderecos[3] = dado.rua;
        enderecos[4] = dado.numero;
        enderecos[5] = dado.bairro;
        enderecos[6] = dado.telefone;

        let tr = document.createElement(`tr`);
        let th = [];
        for (let i = 0; i<7;++i){
            th[i] = document.createElement(`th`);
            th[i].innerHTML = enderecos[i];
            tr.appendChild(th[i]);
        }

        let atualiza = document.createElement(`button`);
        let deleta = document.createElement(`button`);
        atualiza.setAttribute(`onClick`,`alteraEndereco(${enderecos[0]})`);
        deleta.setAttribute(`onClick`,`deletaEndereco(${enderecos[0]})`);
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

async function cadastraEnderecos(){
    let selectEstados = document.getElementById("estados");
    let estadoIndex = selectEstados.selectedIndex;
    let estado = selectEstados.options[estadoIndex].getAttribute("data-nome");
    let sigla = selectEstados.options[estadoIndex].getAttribute("data-sigla");
    let cidade = document.getElementById(`cidades`).value;
    let rua = document.getElementById(`rua`).value;
    let numero = document.getElementById(`numero`).value;
    let bairro = document.getElementById(`bairro`).value;
    let telefone = document.getElementById(`telefone`).value;

    const data = {
        estado: estado,
        sigla: sigla,
        cidade: cidade,
        rua: rua,
        numero: numero,
        bairro: bairro,
        telefone: telefone
    };

    fetch(`/atividadeWeb/controllers/enderecos_controller.php`, {
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

async function alteraEndereco(id){

}

async function deletaEndereco(id){
  const data = {
    id: id
  }
  fetch(`/atividadeWeb/controllers/enderecos_controller.php`, {
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