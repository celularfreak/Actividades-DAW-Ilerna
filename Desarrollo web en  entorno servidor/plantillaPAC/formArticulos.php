<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Formulario de artículos</title>
</head>
<body>

	<?php 

		include "funciones.php";
	
	?>

	<?php

		if (!isset($_COOKIE['datos']) or ($_COOKIE['datos'] != 'autorizado')) {
			echo "No tienes permisos para acceder a esta página.";
		} else {
			if (isset($_POST["Editar"])) {
				$datosProducto = mysqli_fetch_array(getProducto($_POST["Editar"]));
			} else if {
				$datosProducto = mysqli_fetch_array(getProducto($_POST["Borrar"]));
			} else {
				$datosProducto = array("ProductID" => "", "Name" => "", "Cost" => 0, "Price" => 0, "Categoria" => "PANTALÓN");
	
			}
		}
	?>
</body>
</html>