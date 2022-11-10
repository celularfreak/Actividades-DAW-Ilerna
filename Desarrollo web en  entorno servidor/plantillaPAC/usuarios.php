<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="estilo.css">
	<title>Usuarios</title>
</head>
<body>

	<?php 

		include "funciones.php";

		if (!isset($_COOKIE['datos']) or ($_COOKIE['datos'] != 'superadmin')) {
			echo "No tienes permisos para acceder a esta página.";
		} else {
			if (isset($_GET['Cambiear'])) {
				cambiarPermisos();
			}
		}	
	?>

	<p> Los permisos actuales están a <span><?php echo getPermisos(); ?></span> </p>
	<form action="usuarios.php" action="POST">
		<p> <input type="submit" name="Modificar" value="Modificar permisos"></p>
	</form>

	<?php
		pintaTablaUsuarios();
	?>

	<a href="index.php">Volver</a>

</body>
</html>