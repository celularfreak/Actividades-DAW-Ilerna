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

	?>
		
	
</body>
</html>