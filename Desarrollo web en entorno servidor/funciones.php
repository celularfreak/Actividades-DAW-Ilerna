<?php 

	include "consultas.php";


	function pintaCategorias($defecto) {
		$categories = getCategorias();

		while($row = mysqli_fetch_assoc($categories)) {
			if ($row["CategoryID"] == $defecto) {
				echo "<option value='" . $row["CategoryID"] . "'selected>" . $row["Name"] . "</option>";
			} else {
				echo "<option value='" . $row["CategoryID"] . "'>" . $row["Name"] . "</option>";
			}
		}
	}
	

	function pintaTablaUsuarios(){
		$userList = getListaUsuarios();

		echo "<table>\n
				<tr>\n
					<th>Nombre</th>\n
					<th>Email</th>\n
					<th>Autorizado</th>\n
				</tr>\n";
		
		while($row = mysqli_fetch_assoc($userList)) {
			echo "<tr>\n
					<td>" . $row['FullName'] . "</td>\n
					<td>" . $row['Email'] . "</td>\n";
			if ($row["Enabled"] == 1) {
				echo "<td class='rojo'>" . $row['Enabled'] . "</td>\n";
			} else {
				echo "<td>" . $row['Enabled'] . "</td>\n";
			}
		}
	}

		
	function pintaProductos($orden) {
		$products = getProductos($orden);

		echo "<table>\n
				<tr>\n
					<th><a href='articulos.php?order=ProductID'>ID</a></th>\n
					<th><a href='articulos.php?order=Name'>Nombre</a></th>\n
					<th><a href='articulos.php?order=Cost'>Coste</a></th>\n
					<th><a href='articulos.php?order=Price'>Precio</a></th>\n
					<th><a href='articulos.php?order=Categoria'>Categoria</a></th>\n
					<th>Acciones</th>\n
				</tr>\n";

		while($row = mysqli_fetch_assoc($products)) {
			echo "<tr>\n
					<td>" . $row['ProductID'] . "</td>\n
					<td>" . $row['Name'] . "</td>\n
					<td>" . $row['Cost'] . "</td>\n
					<td>" . $row['Price'] . "</td>\n
					<td>" . $row['Categoria'] . "</td>\n";

			if (getPermisos() == 1) {
				echo "<td><a href='formArticulos.php?Editar=" . $row['ProductID'] . "'>Editar</a> - <a href='formArticulos.php?Borrar=" . $row['ProductID'] . "'>Borrar</a>
				</tr>\n";
			}
		}

		echo "</table>";

	}
?>