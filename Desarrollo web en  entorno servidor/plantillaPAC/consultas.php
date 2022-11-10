<?php 

	include "conexion.php";

	function tipoUsuario($nombre, $correo){
		$conexion = crearConexion();
		
		if (esSuperadmin($nombre, $correo)) {
			return "superadmin";
		} else {
			$consulta = "SELECT FullName, Email, Enabled FROM user WHERE FullName = '$nombre' AND Email = '$correo'";
			
			$resultado = mysqli_query($conexion, $consulta);

			cerrarConexion($conexion);

			if ($datos = mysqli_fetch_array($resultado)) {
				if ($datos["Enabled"] == 0){
					return "registrado";
				} else if ($datos["Enabled"] == 1){
					return "autorizado";
				}
			} else {
				return "no registrado";
			}
		}
	}


	function esSuperadmin($nombre, $correo){
		$conexion = crearConexion();

		$consulta = "SELECT user.UserID FROM user INNER JOIN setup ON user.UserID = setup.SuperAdmin WHERE user.FullName = '$nombre' AND user.Email = '$correo'";
		
		$resultado = mysqli_query($conexion, $consulta);

		if ($datos = mysqli_fetch_array($resultado)) {
				return true;
			} else {
				return false;
		}
	}


	function getListaUsuarios() {
		$conexion = crearConexion();

		$consulta = "SELECT FullName, Email, Enabled FROM user";
		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);

		return $resultado;
	}

	function getPermisos() {
		$conexion = crearConexion();

		$consulta = "SELECT Autenticación FROM setup";
		$resultado = mysqli_fetch_assoc(mysqli_query($conexion, $consulta));

		cerrarConexion($conexion);

		return $resultado["Autenticación"];
	}


	function cambiarPermisos() {
		$permisos = getPermisos();

		$conexion = crearConexion();

		if ($permisos == 1) {
			$consulta = "UPDATE setup SET Autenticación = 0";
		} else {
			$consulta = "UPDATE setup SET Autenticación = 1";
		}

		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);
	}


	function getCategorias() {
		$conexion = crearConexion();

		$consulta = "SELECT * FROM category";
		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);

		return $resultado;
	}


	function getProducto($ID) {
		$conexion = crearConexion();

		$consulta = "SELECT * FROM product WHERE ProductID = $ID";
		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);

		return $resultado;
	}


	function getProductos($orden) {
		$conexion = crearConexion();

		$consulta = "SELECT product.ProductID, product.Name, product.Cost product.Price, category.Name as Categoria FROM product INNER JOIN category WHERE 
		product.CategoryID = category.CategoryID ORDER BY $orden";
		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);

		return $resultado;
	}


	function anadirProducto($nombre, $coste, $precio, $categoria) {
		$conexion = crearConexion();

		$consulta = "INSERT INTO product (Name, Cost, Price, CategoryID) VALUES ('$nombre', $coste, $precio, $categoria)";
		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);

		return $resultado;
	}


	function borrarProducto($id) {
		$conexion = crearConexion();

		$consulta = "DELETE FROM product WHERE ProductID = $id";
		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);

		return $resultado;
	}


	function editarProducto($id, $nombre, $coste, $precio, $categoria) {
		$conexion = crearConexion();

		$consulta = "UPDATE product SET Name = '$nombre', Cost = $coste, Price = $precio, CategoryID = $categoria WHERE ProductID = $id";
		$resultado = mysqli_query($conexion, $consulta);

		cerrarConexion($conexion);

		return $resultado;
	}

?>