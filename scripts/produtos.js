document.addEventListener("DOMContentLoaded",imprimeProdutos());

async function imprimeProdutos(){
    console.log(`aqui`);
    const consulta = await fetch('/atividadeWeb/controllers/produtos_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    let tabela = document.getElementById(`tabela`);
    for(let dado of dados) {
        
        const nome = dado.desccricao;
        const valor = dado.valor_unitario;

        let tr = document.createElement(`tr`);
        let th1 = document.createElement(`th`);
        let th2 = document.createElement(`th`);
        th1.innerHTML = nome;
        th2.innerHTML = valor;
        tr.appendChild(th1);
        tr.appendChild(th2);
        tabela.appendChild(tr);
 
    }
    
}

