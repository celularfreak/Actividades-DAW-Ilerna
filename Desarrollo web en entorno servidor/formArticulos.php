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

		if (!isset($_COOKIE['userData']) or ($_COOKIE['userData'] != "autorizado")) {
			echo "No tienes permisos para acceder a esta página.";
		} else {
			if (isset($_GET["Editar"])) {
				$productData = mysqli_fetch_array(getProducto($_GET["Editar"]));
			} else if (isset($_GET["Borrar"])) {
				$productData = mysqli_fetch_array(getProducto($_GET["Borrar"]));
			} else {
				$productData = ["ProductID" => "", "Name" => "", "Cost" => 0, "Price" => 0, "Categoria" => "PANTALÓN"];
			}
		}
	?>

	<form action="formArticulos.php" action="POST">
		<input type="hidden" name="id" value="<?php echo $productData["ProductID"]; ?>"></p>
		<p><label>ID: </label><input type="number" value="<?php echo $productData["ProductID"]; ?>" disabled></p>
		<p><label>Nombre: </label><input type="text" name="nombre" value="<?php echo $productData["Name"]; ?>"></p>
		<p><label>Coste: </label><input type="number" name="coste" value="<?php echo $productData["Cost"]; ?>"></p>
		<p><label>Precio: </label><input type="number" name="precio" value="<?php echo $productData["Price"]; ?>"></p>
		<p><label>Categoría: </label> <select name="categoria">
			<?php
				pintaCategorias($productData["CategoryID"]);
			?>
		</select></p>
	
	<?php
		if (isset($_GET["Editar"])) {
			echo "<input type='submit' name='Action' value='Editar'>";
		} else if (isset($_GET["Borrar"])) {
			echo "<input type='submit' name='Action' value='Borrar'>";
		} else {
			echo "<input type='submit' name='Action' value='Añadir'>";
		}
	?>

	<?php
		if (isset($_GET["Action"])) {
			switch ($_GET["Action"]){
				case 'Editar':
					if(editarProducto($_GET["id"], $_GET["nombre"], $_GET["coste"], $_GET["precio"], $_GET["categoria"])){
						echo "Producto editado correctamente.";
					} else {
						echo "Error al editar el producto.";
					}
					break;
				case 'Borrar':
					if(borrarProducto($_GET["id"])){
						echo "Producto borrado correctamente.";
					} else {
						echo "Error al borrar el producto.";
					}
					break;
				case 'Añadir':
					if(anadirProducto($_GET["nombre"], $_GET["coste"], $_GET["precio"], $_GET["categoria"])){
						echo "Producto añadido correctamente.";
					} else {
						echo "Error al añadir el producto.";
					}
					break;
			}
			
		}
	?>

	<a href="articulos.php">Volver</a>
	</form>
</body>
</html>