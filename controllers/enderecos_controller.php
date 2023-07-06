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

    $query = "SELECT * from enderecos";
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
    $usuario = $_POST['usuario'];
    $rua = $_POST['rua'];
    $numero = $_POST['numero'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $telefone = $_POST['telefone'];
/*
    $con = mysqli_connect('localhost','admin','');
    mysqli_select_db('e_comerce', $con);

    $query = "INSERT INTO produtos (descricao, valor_unitario) VALUES (".$valor_unitario.", ".$d.");";
    $result = mysqli_query($query);

    echo $result;
    mysqli_close($con);
    */
} 

?>