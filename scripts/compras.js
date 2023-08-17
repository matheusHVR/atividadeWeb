document.addEventListener("DOMContentLoaded",imprimeCompras());

async function imprimeCompras(){
    console.log(`aqui`);
    const consulta = await fetch('/atividadeWeb/controllers/compras_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    let tabela = document.getElementById(`tabela`);
    for(let dado of dados) {
        
        const endereco = dado.endereco_id;
        const data = dado.data;

        let tr = document.createElement(`tr`);
        let th1 = document.createElement(`th`);
        let th2 = document.createElement(`th`);

        th1.innerHTML = endereco;
        th2.innerHTML = data;
        
        tr.appendChild(th1);
        tr.appendChild(th2);

        let atualiza = document.createElement(`button`);
        let deleta = document.createElement(`button`);
        let atualiza_icon = document.createElement(`i`);
        let deleta_icon = document.createElement(`i`);
        atualiza_icon.className = "fa-solid fa-trash";
        deleta_icon.className = "fa-solid fa-pen";
        atualiza.appendChild(atualiza_icon);
        deleta.appendChild(deleta_icon);
        atualiza.setAttribute(`onClick`,`atualiza_item()`);
        deleta.setAttribute(`onClick`,`deleta_item()`);
        tr.appendChild(atualiza);
        tr.appendChild(deleta);

        tabela.appendChild(tr);
 
    }
    
}

function atualiza_item(){
    
}
function deleta_item(){

}