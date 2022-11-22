// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

// iniciamos el juego 
var playerChoice = 0;
var computerChoice = null;
// creamos un array con los botones
var button = document.getElementsByTagName("button");
// cuando se pulsa el boton de jugar se ejecuta ejecuta la funcion checkGame
button[0].addEventListener("click", checkGame);
// Funcion que comprueba si los datos introducidos son correctos
function checkGame() {
	// guardamos los valores de los inputs
	var userName = document.getElementsByName("nombre")[0].value;
	var userGames = document.getElementsByName("partidas")[0].value;
	// comprobamos que los datos introducidos son correctos
	if (userName.length < 4 || isNaN(userName[0]) == false) {
		document.getElementsByName("nombre")[0].classList.add("fondoRojo");
	}
	if (userGames <= 0) {
		document.getElementsByName("partidas")[0].classList.add("fondoRojo");
	} // si los datos son correctos se ejecuta la funcion startGame
	if (userName.length >= 4 && isNaN(userName[0]) == true && userGames > 0) {
		document.getElementsByName("nombre")[0].classList.remove("fondoRojo");
		document.getElementsByName("nombre")[0].disabled = true;
		document.getElementsByName("partidas")[0].classList.remove("fondoRojo");
		document.getElementsByName("partidas")[0].disabled = true;
		document.getElementById("total").innerHTML = userGames;
		button[1].addEventListener("click", startGame); // añadimos el evento click al boton de YA
	}
	button[0].removeEventListener("click", checkGame); // eliminamos el evento click al boton de jugar
}
// cargamos las imagenes de piedra papel y tijera
var playerGraphics = document.getElementById("jugador").getElementsByTagName("img");

for (var i = 0; i < posibilidades.length ; i++) {
	playerGraphics[i].src = "img/" + posibilidades[i] + "Jugador.png";
}
// a cada imagen le añadimos el evento click para que al pulsarla se ejecute la funcion playerSelection
playerGraphics[0].addEventListener("click", function(){playerSelection(0)});
playerGraphics[1].addEventListener("click", function(){playerSelection(1)});
playerGraphics[2].addEventListener("click", function(){playerSelection(2)});
// Funcion que guarda la eleccion del jugador y marca la imagen seleccionada
function playerSelection(selection){
	for (var i = 0; i < playerGraphics.length ; i++) {
		playerGraphics[i].classList.add("noSeleccionado");
		playerGraphics[i].classList.remove("seleccionado");
		if(i == selection){
			playerGraphics[i].classList.remove("noSeleccionado");
			playerGraphics[i].classList.add("seleccionado");
			playerChoice = selection;
		}
	}
}
// funcion que inicia la partida al pulsar el boton de YA
function startGame(){
	computerSelection();
	checkGameNumber();
	result();
}
// funcion que genera la eleccion de la maquina
function computerSelection(){
	var computerSelection= Math.floor(Math.random() * 3); // genera un numero aleatorio entre 0 y 2
	var computerGraphics = document.getElementById("maquina").getElementsByTagName("img"); // guardamos las imagenes de piedra papel y tijera de la maquina
	computerGraphics[0].src = "img/" + posibilidades[computerSelection] + "Ordenador.png"; // cambiamos la imagen de la maquina por la seleccion aleatoria
	computerChoice = computerSelection; // guardamos la eleccion de la maquina
}
// inicalizamos la variable numero de partidas a 0
var gameNumber = 0; 
// funcion que comprueba si hemos llegado al numero de partidas introducido
function checkGameNumber(){
	gameNumber = gameNumber + 1;
	if(gameNumber < document.getElementsByName("partidas")[0].value){
		document.getElementById("actual").innerHTML = gameNumber;
	} else {
		button[1].removeEventListener("click", startGame);
		document.getElementById("actual").innerHTML = gameNumber;
	}

}
// funcion que comprueba quien es el ganador siguiendo las instrucciones de la PAC
function result(){
	if(playerChoice == (computerChoice-1) || (computerChoice == 0 && playerChoice== posibilidades.length-1)){
        document.getElementById("historial").innerHTML = document.getElementById("historial").innerHTML + "<li>Gana la Maquina</li>";
    }else if(computerChoice == (playerChoice-1) || (playerChoice == 0 && computerChoice== posibilidades.length-1)){
        document.getElementById("historial").innerHTML =  document.getElementById("historial").innerHTML + "<li>Gana " + document.getElementsByName("nombre")[0].value+"</li>";
    }else{
        document.getElementById("historial").innerHTML =document.getElementById("historial").innerHTML + "<li>Empate</li>";
    }
} 

// boton de RESET
button[2].addEventListener("click", reset);
// funcion que reinicia el juego al pulsar el boton RESET
function reset() {
	// escribimos en el historial que se ha reiniciado el juego
	document.getElementById("historial").innerHTML =  document.getElementById("historial").innerHTML + "<li>Nueva partida</li>"; 
	document.getElementsByName("nombre")[0].disabled = false;  // habilitamos el input de nombre pero no lo borramos
	document.getElementsByName("partidas")[0].disabled = false; // habilitamos el input de partidas
  	document.getElementsByName("partidas")[0].value=0; // borramos el valor de partidas
	document.getElementById("actual").innerHTML = "0"; // ponemos el numero de partidas actual a 0
  	document.getElementById("total").innerHTML = "0"; // ponemos el numero de partidas total a 0
	gameNumber = 0; // reiniciamos la variable gameNumber a 0
	// dejamos la imagen de la maquina por defecto
	var computerGraphics = document.getElementById("maquina").getElementsByTagName("img");
  	computerGraphics[0].src = "img/defecto.png";
    // desabilitamos el boton de YA y volvemos a habilitar el boton de JUGAR
	button[1].removeEventListener("click", startGame);
	button[0].addEventListener("click", checkGame);
    // deseleccionamos las imagenes de piedra papel y tijera y habilitamos la posicion por defecto
	for (var i = 0; i < playerGraphics.length ; i++) {
        playerGraphics[i].classList.add("noSeleccionado");
        playerGraphics[i].classList.remove("seleccionado");

        if(i == 0){
            playerGraphics[i].classList.add("seleccionado");
            playerGraphics[i].classList.remove("noSeleccionado");
    	}
	}
}