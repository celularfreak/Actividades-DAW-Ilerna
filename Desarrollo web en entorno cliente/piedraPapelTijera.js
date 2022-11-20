// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //


var playerSelection = 0;
var computerSelection = Null;

var button = document.getElementsByTagName("button");
button[0].addEventListener("click", checkForm);

function checkForm() {

	checkName();
	checkNumberGames();

	if (checkName() == true && checkNumberGames() == true) {
		document.getElementById("total").innerHTML = document.getElementsByName("partidas")[0].value;
		var button = document.getElementsByTagName("button");
		button[1].addEventListener("click", buttonStart);
	}
}

function checkName() {
	var name = document.getElementsByName("nombre")[0].value;
	if (name.lenght < 4) {
		document.getElementsByName("nombre")[0].classList.add("fondoRojo");
		return false;
	} else if (isNaN(name[0]) == true) {
		document.getElementsByName("nombre")[0].classList.add("fondoRojo");
		return false;
	}
	return true;
}

function checkNumberGames() {
	var numberGames = document.getElementsByName("partidas")[0].value;
	if (numberGames <= 0) {
		numberGames.classList.add("fondoRojo");
		return true;
	} else {
		numberGames.classList.remove("fondoRojo");
		numberGames.disabled = true;
		return true;
	}
	return false;
}

var divJugador = document.getElementById("jugador");
var imagenesJugador = divJugador.getElementsByTagName("img");

function buttonStart() {
}