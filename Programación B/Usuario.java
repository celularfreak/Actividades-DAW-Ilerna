// PAC 6 Actividad desarrollo
// David Nuñez Merino
// Abril 2022
// Clase Usuario

import java.util.regex.Pattern;// importamos regex pattern 
import java.util.regex.Matcher;//y matcher para controlar la correcta introduccion del DNI

public class Usuario {
	//variables
	private String nombre;
	private int edad;
	private String DNI;
	
	public Usuario() {//contructor vacio
	}
	//setters y getters
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getEdad() {
		return edad;
	}
	
	public void setEdad(int edad) {
		this.edad = edad;
	}
	
	public String getDNI() {
		return DNI;
	}
	
	
	public boolean setDNI(String DNI) {
		Pattern pat = Pattern.compile("([0-9]{8,8}[A-Za-z])|([0-9]{8,8}[-][A-Za-z])");//validaran los casos con 8 numero y 1 letra, con guion o sin guien entre numeros y letras
		Matcher mat = pat.matcher(DNI);
		if (mat.matches()) {
			this.DNI = DNI;
			return true;
		}else {
			return false;
		}
		
	}

	@Override
	public String toString() {
		return "Nombre: " + nombre + ". Edad: " + edad + " años. DNI: " + DNI;
	}
	
}
