<?php 

	include "conexion.php";

	function tipoUsuario($nombre, $correo){
		$conexion = crearConexion();
		
		if (esSuperadmin($nombre, $correo)) {
			return "superadmin";
		} else {
			$query = "SELECT FullName, Email, Enabled FROM user WHERE FullName = '$nombre' and Email = '$correo'";
			
			$result = mysqli_query($conexion, $query);

			cerrarConexion($conexion);

			if ($data = mysqli_fetch_array($result)) {
				if ($data["Enabled"] == 0){
					return "registrado";
				} else if ($data["Enabled"] == 1){
					return "autorizado";
				}
			} else {
				return "no registrado";
			}
		}
	}


	function esSuperadmin($nombre, $correo){
		$conexion = crearConexion();

		$query = "SELECT user.UserID FROM user INNER JOIN setup ON user.UserID = setup.SuperAdmin WHERE user.FullName = '$nombre' and user.Email = '$correo'";
		
		$result = mysqli_query($conexion, $query);

		if ($data = mysqli_fetch_array($result)) {
				return true;
		} else {
				return false;
		}
	}


	function getListaUsuarios() {
		$conexion = crearConexion();

		$query = "SELECT FullName, Email, Enabled FROM user";
		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);

		return $result;
	}

	function getPermisos() {
		$conexion = crearConexion();

		$query = "SELECT Autenticación FROM setup";
		$result = mysqli_fetch_assoc(mysqli_query($conexion, $query));

		cerrarConexion($conexion);

		return $result["Autenticación"];
	}


	function cambiarPermisos() {
		$permisos = getPermisos();

		$conexion = crearConexion();

		if ($permisos == 1) {
			$query = "UPDATE setup SET Autenticación = 0";
		} else if(($permisos == 0)) {
			$query = "UPDATE setup SET Autenticación = 1";
		}

		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);
	}


	function getCategorias() {
		$conexion = crearConexion();

		$query = "SELECT * FROM category";
		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);

		return $result;
	}


	function getProducto($ID) {
		$conexion = crearConexion();

		$query = "SELECT * FROM product WHERE ProductID = $ID";
		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);

		return $result;
	}


	function getProductos($orden) {
		$conexion = crearConexion();

		$query = "SELECT product.ProductID, product.Name, product.Cost, product.Price, category.Name as Categoria FROM product INNER JOIN category WHERE product.CategoryID = category.CategoryID ORDER BY $orden";
		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);

		return $result;
	}


	function anadirProducto($nombre, $coste, $precio, $categoria) {
		$conexion = crearConexion();

		$query = "INSERT INTO product (Name, Cost, Price, CategoryID) VALUES ('$nombre', $coste, $precio, $categoria)";
		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);

		return $result;
	}


	function borrarProducto($id) {
		$conexion = crearConexion();
		
		$query = "DELETE FROM product WHERE ProductID = $id";
		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);

		return $result;
	}


	function editarProducto($id, $nombre, $coste, $precio, $categoria) {
		$conexion = crearConexion();

		$query = "UPDATE product SET Name = '$nombre', Cost = $coste, Price = $precio, CategoryID = $categoria WHERE ProductID = $id";
		$result = mysqli_query($conexion, $query);

		cerrarConexion($conexion);

		return $result;
	}

?>