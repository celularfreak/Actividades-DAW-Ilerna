<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Index.php</title>
</head>
<body>

	<?php
		include "consultas.php";
	?>

	<form action="index.php" method="POST">
		<p><label for="usuario">Usuario: </label><input type ="text" name="usuario"></p>
		<p><label for="correo">Correo: </label><input type ="email" name="correo"></p>
		<p><input type="submit" value ="Entrar" name="Entrar"></p>
	</form>

	<?php
		if (isset($_POST['Entrar'])) {
			$nombre = $_POST['usuario'];
			$correo = $_POST['correo'];
			$tipoUsuario = tipoUsuario($nombre, $correo);
			setcookie("datos", $tipoUsuario, time()+500);
			switch ($tipoUsuario) {
				case 'superadmin':
					echo "Bienvenido $nombre. Pulsa <a href='usuarios.php'>aquí</a> para ver los usuarios.";
					break;
				case 'autorizado' :
					echo "Bienvenido $nombre. Pulsa <a href='articulos.php'>aquí</a> para entrar al panel de articulos.";
					break;
				case 'registrado' :
					echo "Bienvenido $nombre. No tiene los permisos para acceder.";
					break;
				default :
					echo "Usuario no registrado.";
					break;
			}
		}
	?>
		
</body>
</html>