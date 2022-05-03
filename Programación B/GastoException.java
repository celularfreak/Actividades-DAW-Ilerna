// PAC 6 Actividad desarrollo
// David Nuñez Merino
// Abril 2022
// Clase GastoException

public class GastoException extends Exception{
	
	GastoException() {//mensaje que se mostrara al capturarse la excepcion
		System.out.println("Saldo insuficiente.");
	}
}
