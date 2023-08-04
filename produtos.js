async function imprime_produtos(){
    const consulta = await fetch('/atividadeWeb/controllers/produtos_controller.php');
    const dados = await consulta.json();
    console.log(dados);

    for(let dado of dados) {
        
        const nome = dado.descricao;
        const valor = dado.valor_unitario;

        document.write(`${nome} : ${valor} <br>`);
 
    }
    
}

