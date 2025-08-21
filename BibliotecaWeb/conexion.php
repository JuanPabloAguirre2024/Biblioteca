<?php
    $servidor = "localhost";
    $usuario = "root";
    $contrasena = "";
    $bd = "bibliotecadb";

    //Crear la conexion a la BD
    $conexion = new mysqli($servidor, $usuario, $contrasena, $bd);
    //$conexion = new mysqli("localhost", "root", "", "taller");

    //Válidar la conexión
    if($conexion -> connect_error){
        die("Fallo en la conexión" .$conexion ->connect_error);

    }



?>