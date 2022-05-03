// PAC 6 Actividad desarrollo
// David Nuñez Merino
// Abril 2022
// Clase Cuenta

import java.util.ArrayList;
import java.util.List;

public class Cuenta {
	//variables
	private double saldo;
	private Usuario usuario;
	private List<Gasto> gastos;
	private List<Ingreso> ingresos;
	
	public Cuenta(Usuario usuario) {
		//constructor
		this.usuario = usuario;
		this.saldo = 0;
		this.gastos = new ArrayList<>();
		this.ingresos = new ArrayList<>();
	}	
	//getters y setters
	public double getSaldo() {
		return saldo;
	}
	
	public void setSaldo(double saldo) {
		this.saldo = saldo;
	}
	
	public Usuario getUsuario() {
		return usuario;
	}
	
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	public List<Gasto> getGastos() {
		return gastos;
	}
	
	public List<Ingreso> getIngresos() {
		return ingresos;
	}
	//metodos
	public double addIngresos(String description, double cantidad) {
		
		Ingreso ingreso = new Ingreso(cantidad, description);
		this.ingresos.add(ingreso);
		setSaldo(this.saldo + cantidad);
		return this.getSaldo();
	}
	
	public double addGastos(String description, double cantidad) {
		
		try {
			if(this.saldo - cantidad < 0) {
				throw new GastoException();
			}
		}catch(GastoException e) { //captura excepcion
			return - 1;
		}
		Gasto gasto = new Gasto(cantidad, description);
		this.gastos.add(gasto);
		setSaldo(this.saldo - cantidad);
		return this.getSaldo();
	}
	
	@Override
	public String toString() {
		
		return "El saldo actual de la cuenta del usuario " + this.usuario.getNombre() + " es " + this.saldo + " euros.";
	}
	
}
