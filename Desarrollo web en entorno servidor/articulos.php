<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Articulos</title>
</head>
<body>

	<?php 
		include "funciones.php";
	?>

	<h1>Lista de artículos</h1>

	
	<?php
		if (!isset($_COOKIE['userData']) or ($_COOKIE['userData'] != "autorizado")) {
			echo "No tienes permisos para acceder a esta página.";
		} else {
			if (!isset($_GET["order"])) {
				$order = "ProductID";
			} else {
				$order = $_GET["order"];
			}
			if (getPermisos() == 1) {
				echo "<a href='formArticulos.php?Anadir'>Añadir producto</a>";
			}
			pintaProductos($order);
		}
	?>

	<a href="index.php">Volver</a>
	
</body>
</html>