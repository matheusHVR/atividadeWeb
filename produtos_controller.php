<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    cadastra_produto();
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){
    lista_produtos();
}elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
    altera_produto($_SERVER['PATH_INFO']);
}elseif($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    deleta_produto($_SERVER['PATH_INFO']);
}

function lista_produtos(){
    $con = mysqli_connect('localhost','root','');
    mysqli_select_db($con,'e_comerce');

    $query = "SELECT * from produtos";
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

function cadastra_produto(){
    $descricao = $_POST['descricao'];
    $valor_unitario = $_POST['valor_unitario'];
    $id = rand(0,999);

    $con = mysqli_connect('localhost','admin','');
    mysqli_select_db('e_comerce', $con);

    $query = "INSERT INTO produtos (id, descricao, valor_unitario) VALUES ($id, $descricao, $valor_unitario);";
    $result = mysqli_query($query);

    echo $result;
    mysqli_close($con);
} 

function altera_produto($id){
    $data = file_get_contents("php://input");
    $decodedData = json_decode($data, true);
    $id = $decodedData[¨id¨];
    $descricao = $decodedData[¨descricao¨];
    $valor_unitario = $decodedData[¨valor_unitario¨];
    header("Content-Type: application/json");

    $con = mysqli_connect('localhost','admin','');
    mysqli_select_db('e_comerce', $con);

    $query = "UPDATE produtos SET descricao = $descricao , valor_unitario = $valor_unitario WHERE id = $id;";
    $result = mysqli_query($query);

    echo $result;
    mysqli_close($con);
}

function deleta_produto($id){

    $data = file_get_contents("php://input");
    $decodedData = json_decode($data, true);
    $id = $decodedData[¨id¨];
    header("Content-Type: application/json");
   
    $con = mysqli_connect('localhost','admin','');
    mysqli_select_db('e_comerce', $con);

    $query = "DELETE FROM produtos WHERE id = $id;";
    $result = mysqli_query($query);

    echo $result;
    mysqli_close($con);
}


?>