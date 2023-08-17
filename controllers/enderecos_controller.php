<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $dadosRecebidos = file_get_contents('php://input');
    $dadosDecodificados = json_decode($dadosRecebidos, true);
    cadastra_endereco($dadosDecodificados);
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){
    echo(`ate aqui veio`);
    lista_enderecos();
}elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
    altera_endereco($_SERVER['PATH_INFO']);
}elseif($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    deleta_endereco($_SERVER['PATH_INFO']);
}

function lista_enderecos(){
    $con = mysqli_connect('localhost','root','');
    mysqli_select_db($con,'e_comerce');

    $query = "SELECT estados.nome as estado, cidades.nome as cidade, rua, numero, bairro, telefone from estados, cidades, enderecos;";
    $result = mysqli_query($con,$query);

    if($result){
        $rows = array();
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $rows[$i] = $row;
            $i += 1;
        }
        $json_dados = json_encode($rows);

        header('Content-Type: application/json');

        echo $json_dados;
    }else{
        echo "Ocorreu um erro na consulta: " . mysqli_error($con);
    }
   
    mysqli_close($con);

}

function cadastra_endereco($endereco){
    
    $id = rand(0,999);
    $estado = $endereco['estado'];
    $sigla = $endereco['sigla'];
    $cidade = $endereco['cidade'];
    $rua = $endereco['rua'];
    $numero = $endereco['numero'];
    $bairro = $endereco['bairro'];
    $telefone = $endereco['telefone'];
    

    $con = mysqli_connect('localhost','admin','');
    mysqli_select_db($con,`e_comerce`);

    $query = "SELECT nome FROM estados WHERE nome = $estado";
    $result = mysqli_query($con,$query);
    echo(`ate aqui veio`);
    
    if ($result){//testa se existe o estado
        echo(`ate aqui veio`);
        $id_estado = mysqli_fetch_assoc($result)[`id`];
        $query = "SELECT nome FROM cidades WHERE nome = $cidade AND estado_id = $id_estado";
        $result2 = mysqli_query($con,$query);
        if($result2){//testa se existe a cidade
            $id_cidade = mysqli_fetch_assoc($result2)[`id`];
            $query = "INSERT INTO enderecos (id, rua, numero, bairro, cidade_id, telefone) VALUES ($id, $rua, $numero, $bairro, $id_cidade, $telefone);";
            $result = mysqli_query($con,$query);

        }else{//cria cidade e endereco
            $id_cidade = rand(0,999);
            $query = "INSERT INTO cidades (id, nome, estado_id) VALUES ($id_cidade, $cidade, $id_estado);";
            $result = mysqli_query($con,$query);

            $query = "INSERT INTO enderecos (id, rua, numero, bairro, cidade_id, telefone) VALUES ($id, $rua, $numero, $bairro, $id_cidade, $telefone);";
            $result = mysqli_query($con,$query);
        }

    }else{//cria estado cidade e endereco
        $id_estado = rand(0,999);
        $query = "INSERT INTO estados (id, nome, sigla) VALUES ($id_estado, $estado, $sigla);";
        $result = mysqli_query($con,$query);
        $id_cidade = rand(0,999);
        $query = "INSERT INTO cidades (id, nome, estado_id) VALUES ($id_cidade, $cidade, $id_estado);";
        $result = mysqli_query($con,$query);

        $query = "INSERT INTO enderecos (id, rua, numero, bairro, cidade_id, telefone) VALUES ($id, $rua, $numero, $bairro, $id_cidade, $telefone);";
        $result = mysqli_query($con,$query);

    }

    echo $result;
    mysqli_close($con);

}

function altera_endereco(){

}
function deleta_endereco(){

}

?>