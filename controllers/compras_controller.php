<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    cadastra_compra();
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){
    lista_compras();
}elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
    altera_compra($_SERVER['PATH_INFO']);
}elseif($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    deleta_compra($_SERVER['PATH_INFO']);
}

function lista_compras(){
    $con = mysqli_connect('localhost','root','');
    mysqli_select_db($con,'e_comerce');

    $query = "SELECT * from compras";
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

function cadastra_compra(){
    $id = rand(0,999);
    $endereco = $_POST['endereco'];
    $data = $_POST['data'];
    

    $con = mysqli_connect('localhost','admin','');
    mysqli_select_db('e_comerce', $con);

    $query = "INSERT INTO compras (id, endereco_id, data) VALUES ($id, $endereco, $data);";
    $result = mysqli_query($query);

    echo $result;
    mysqli_close($con);
    
} 

?>