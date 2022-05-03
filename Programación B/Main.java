// PAC 6 Actividad desarrollo
// David Nuñez Merino
// Abril 2022
// Clase Main

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		/* El metodo main nos pedira datos para la creacion de un objeto usuario
		 * y iniciaremos un objeto cuenta./
		 * Tenemos un pequeño menu para llamar a los metodos que necesitamos para operar.
		 */
		
		int option;
		
		Scanner sc = new Scanner(System.in);
		
		Usuario user = new Usuario();
		nuevoUsuario(user, sc);
		
		Cuenta cuenta = new Cuenta(user);
		
		option = -1;
		while(option != 0)
		{
			menu();
			
			option = Integer.valueOf(sc.nextLine());
			
			switch(option) {
			case 1:
				salidaDin(cuenta, sc);
				break;
			case 2:
				ingresoDin(cuenta, sc);
				break;
			case 3:
				todosGastos(cuenta);
				break;
			case 4:
				todosIngresos(cuenta);
				break;
			case 5:
				System.out.println(cuenta);
				break;
			}
			
		}
		 sc.close();
	        System.out.println("Fin del programa.");
	        System.out.println("Gracias por utilizar la aplicación.");
	}
	
	private static void nuevoUsuario(Usuario user, Scanner sc) {
		//metodo para crear usuario
		System.out.println("Introduzca el nombre del usuario");
		String nombre = sc.nextLine();
		user.setNombre(nombre);
		
		System.out.println("Introduzca la edad del usuario");
		int edad = Integer.valueOf(sc.nextLine());
		user.setEdad(edad);
		
		System.out.println("Introduzca el DNI del usuario");
		String DNI = sc.nextLine();
		while(!user.setDNI(DNI)) {// se comprueba si el DNI cumple la norma definida en la clase usuario
			System.out.println("DNI con Formato incorrecto");
			System.out.println("Introduzca el DNI del usuario válido");
			DNI = sc.nextLine();
		}
		user.setDNI(DNI);
		System.out.println("Usuario creado correctamente");
	}
	
	private static void menu() {
		//los textos que necesitamos para las opciones de nuestro menu
		 System.out.println("Realiza una nueva acción");
		 System.out.println("1 Introduce un nuevo gasto");
		 System.out.println("2 Introduce un nuevo ingreso");
		 System.out.println("3 Mostrar gastos");
		 System.out.println("4 Mostrar ingresos");
		 System.out.println("5 Mostrar saldo");
		 System.out.println("0 Salir");
	}
	
	private static void salidaDin(Cuenta cuenta, Scanner sc){
		//metodo para introducir gastos
        System.out.println("Introduce la descripción");
        String description = sc.nextLine();
        
        System.out.println("Introduce la cantidad");
        double gasto  =Double.valueOf(sc.nextLine());
        cuenta.addGastos(description, gasto);
        
        System.out.println(cuenta);
    }
	
	private static void ingresoDin(Cuenta cuenta, Scanner sc){
		//metodo para introducir ingresos
        System.out.println("Introduce la descripción");
        String concepto = sc.nextLine();
        
        System.out.println("Introduce la cantidad");
        double ingreso = Double.valueOf(sc.nextLine());
        
        cuenta.addIngresos(concepto, ingreso);
        System.out.println(cuenta);
    }
	
    private static void todosGastos(Cuenta cuenta){
    	//metodo para mostrar los resultados recorriendo el array gastos
        for(int i  =0; i < cuenta.getGastos().size(); i++){
            System.out.println(cuenta.getGastos().get(i).toString());
        }
    }
    
    private static void todosIngresos(Cuenta cuenta){
    	//metodod para mostrar los resultados recorriendo el array ingresos
       for(int i = 0; i < cuenta.getIngresos().size(); i++){
            System.out.println(cuenta.getIngresos().get(i).toString());
       }
    }
    
}