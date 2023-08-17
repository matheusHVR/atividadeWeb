document.addEventListener("DOMContentLoaded",imprimeEnderecos());

async function imprimeEnderecos(){
    const consulta = await fetch('/atividadeWeb/controllers/enderecos_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    let tabela = document.getElementById(`tabela`);
    for(let dado of dados) {

        let enderecos = [];
        enderecos[0] = dado.estado;
        enderecos[1] = dado.cidade;
        enderecos[2] = dado.rua;
        enderecos[3] = dado.numero;
        enderecos[4] = dado.bairro;
        enderecos[5] = dado.telefone;

        let tr = document.createElement(`tr`);
        let th = [];
        for (let i = 0; i<6;++i){
            th[i] = document.createElement(`th`);
            th[i].innerHTML = enderecos[i];
            tr.appendChild(th[i]);
        }
        
        tabela.appendChild(tr);
 
    }
    
}

function cadastraEnderecos(){
    let selectEstados = document.getElementById("estados");
    let estadoIndex = selectEstados.selectedIndex;
    let estado = selectEstados.options[estadoIndex].getAttribute("data-nome");
    let sigla = selectEstados.options[estadoIndex].getAttribute("data-sigla");
    let cidade = document.getElementById(`cidade`).value;
    let rua = document.getElementById(`rua`).value;
    let numero = document.getElementById(`numero`).value;
    let bairro = document.getElementById(`bairro`).value;
    let telefone = document.getElementById(`telefone`).value;

    const data = {
        esatado: estado,
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