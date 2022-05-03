// PAC 6 Actividad desarrollo
// David Nuñez Merino
// Abril 2022
// Clase Gasto

public class Gasto extends Dinero {
	//constructor
	public Gasto(double gasto, String description) {
		this.dinero = gasto;
		this.description = description;
	}

	@Override
	public String toString() {
		return this.description + ": " + this.dinero + " euros";
	}
	
}
