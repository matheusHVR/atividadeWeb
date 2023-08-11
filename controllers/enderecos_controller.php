<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    cadastra_endereco();
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){
    lista_enderecos();
}elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
    altera_endereco($_SERVER['PATH_INFO']);
}elseif($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    deleta_endereco($_SERVER['PATH_INFO']);
}

function lista_enderecos(){
    $con = mysqli_connect('localhost','root','');
    mysqli_select_db($con,'e_comerce');

    $query = "SELECT * from enderecos, cidades, estados WHERE enderecos.cidade_id = cidades.id AND cidades.estado_id = estados.id";
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

function cadastra_endereco(){
    $id = rand(0,999);
    $rua = $_POST['rua'];
    $numero = $_POST['numero'];
    $bairro = $_POST['bairro'];
    $telefone = $_POST['telefone'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $sigla = $_POST['sigla'];
    

    $con = mysqli_connect('localhost','admin','');
    mysqli_select_db('e_comerce', $con);

    $query = "SELECT nome FROM estados WHERE nome = $estado";
    $result = mysqli_query($query);
    
    if ($result){//testa se existe o estado
        $id_estado = mysql_fetch_assoc($result)[¨id¨];
        $query = "SELECT nome FROM cidades WHERE nome = $cidade AND estado_id = $id_estado";
        $result2 = mysqli_query($query);
        if($result2){//testa se existe a cidade
            $id_cidade = mysql_fetch_assoc($result2)[¨id¨];
            $query = "INSERT INTO enderecos (id, rua, numero, bairro, cidade_id, telefone) VALUES ($id, $rua, $numero, $bairro, $id_cidade, $telefone);";
            $result = mysqli_query($query);

        }else{//cria cidade e endereco
            $id_cidade = rand(0,999);
            $query = "INSERT INTO cidades (id, nome, estado_id) VALUES ($id_cidade, $nome, $id_estado);";
            $result = mysqli_query($query);

            $query = "INSERT INTO enderecos (id, rua, numero, bairro, cidade_id, telefone) VALUES ($id, $rua, $numero, $bairro, $id_cidade, $telefone);";
            $result = mysqli_query($query);
        }

    }else{//cria estado cidade e endereco
        $id_estado = rand(0,999);
        $query = "INSERT INTO estados (id, nome, sigla) VALUES ($id_estado, $nome, $sigla);";
        $result = mysqli_query($query);
        $id_cidade = rand(0,999);
        $query = "INSERT INTO cidades (id, nome, estado_id) VALUES ($id_cidade, $nome, $id_estado);";
        $result = mysqli_query($query);

        $query = "INSERT INTO enderecos (id, rua, numero, bairro, cidade_id, telefone) VALUES ($id, $rua, $numero, $bairro, $id_cidade, $telefone);";
        $result = mysqli_query($query);

    }

    echo $result;
    mysqli_close($con);

} 

?>