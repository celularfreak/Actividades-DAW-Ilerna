// PAC 6 Actividad desarrollo
// David Nuñez Merino
// Abril 2022
// Clase Ingreso

public class Ingreso extends Dinero {
	
	public Ingreso(double ingreso, String description) {// constructor
		this.dinero = ingreso;
		this.description = description;
	}

	@Override
	public String toString() {
		return this.description + ": " + this.dinero + " euros";
	}
	
}
