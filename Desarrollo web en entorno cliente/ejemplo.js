// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

var seleccionJugador = 0;
var seleccionOrdenador = null;

var buttons = document.getElementsByTagName("button");
buttons[0].addEventListener("click", evaluarTodo);

function evaluarTodo() {
    evaluarNombre();
    evaluarJuego();
    if (evaluarNombre() == true && evaluarJuego() == true) {
        document.getElementById("total").innerHTML = document.getElementsByName("partidas")[0].value;
        var buttons = document.getElementsByTagName("button");
        buttons[1].addEventListener("click", botonYa);
    }
}

function evaluarNombre() {
    var nombreUsuario = document.getElementsByName("nombre")[0].value;
    if (nombreUsuario.length < 4 || isNaN(nombreUsuario[0]) == false) {
        document.getElementsByName("nombre")[0].classList.add("fondoRojo");
    } else if (isNaN(nombreUsuario[0]) == true) {
        document.getElementsByName("nombre")[0].classList.remove("fondoRojo");
        document.getElementsByName("nombre")[0].disabled = true;
        return true;
    }
    return false;
}

function evaluarJuego() {
    var numeroPartidas = document.getElementsByName("partidas")[0];
    var partidasIntroducidas = numeroPartidas.value;
    if (partidasIntroducidas <= 0) {
        numeroPartidas.classList.add("fondoRojo");
        return true;
    } else {
        numeroPartidas.classList.remove("fondoRojo");
        numeroPartidas.disabled = true;
        return true;
    }
    return false;
}

/*ponemos las imagenes en su sitio de jugador*/
var divJugador = document.getElementById("jugador");
var imagenesJugador = divJugador.getElementsByTagName("img");

/*al seleccionar ppt*/
for (var i = 0; i < posibilidades.length ; i++) {
    imagenesJugador[i].src = "img/" + posibilidades[i] + "Jugador.png";
}

function seleccionarOpcion(posicion){
    for (var i = 0; i < imagenesJugador.length ; i++) {
        imagenesJugador[i].classList.add("noSeleccionado");
        imagenesJugador[i].classList.remove("seleccionado");
        if(i == posicion){
            imagenesJugador[i].classList.add("seleccionado");
            imagenesJugador[i].classList.remove("noSeleccionado");
            seleccionJugador=posicion;
        }
}
}
imagenesJugador[0].addEventListener("click",  function(){seleccionarOpcion(0);});
imagenesJugador[1].addEventListener("click",  function(){seleccionarOpcion(1);});
imagenesJugador[2].addEventListener("click",  function(){seleccionarOpcion(2);});

/*boton ya*/

function botonYa() {
    seleccionMaquina();
    aumentarValor();
    Gana();
}

function seleccionMaquina() {
    var seleccionMaquina = Math.floor(Math.random() * posibilidades.length);
var divMaquina = document.getElementById("maquina");
var imagenesMaquina = divMaquina.getElementsByTagName("img");
imagenesMaquina[0].src = "img/"+ posibilidades[seleccionMaquina]+"Ordenador.png";
seleccionOrdenador= seleccionMaquina;
}

var numeroDeJuegos = 0
function aumentarValor() {
    if (numeroDeJuegos < document.getElementsByName("partidas")[0].value) {
        numeroDeJuegos = numeroDeJuegos + 1;
        document.getElementById("actual").innerHTML = numeroDeJuegos;
    } else {
        buttons[1].removeEventListener ("click", botonYa);
    }
}

/*quien gana?*/



function Gana() {
     if(seleccionJugador == (seleccionOrdenador-1) || (seleccionOrdenador == 0 && seleccionJugador== posibilidades.length-1)){
        document.getElementById("historial").innerHTML = document.getElementById("historial").innerHTML + "<li>Gana la Maquina</li>";
    }else if(seleccionOrdenador == (seleccionJugador-1) || (seleccionJugador == 0 && seleccionOrdenador== posibilidades.length-1)){
        document.getElementById("historial").innerHTML =  document.getElementById("historial").innerHTML + "<li>Gana " + document.getElementsByName("nombre")[0].value+"</li>";
    }else{
        document.getElementById("historial").innerHTML =document.getElementById("historial").innerHTML + "<li>Empate</li>";
    }
            } 

  /*reset*/
  buttons[2].addEventListener("click", reset);
  function reset() {

  document.getElementById("historial").innerHTML =  document.getElementById("historial").innerHTML + "<li>Nueva partida</li>";
  document.getElementsByName("nombre")[0].disabled = false;
  document.getElementsByName("partidas")[0].disabled = false;
  document.getElementsByName("partidas")[0].value=0;

  document.getElementById("actual").innerHTML = "0";
  document.getElementById("total").innerHTML = "0";

  var divMaquina = document.getElementById("maquina");
  var imagenesMaquina = divMaquina.getElementsByTagName("img");
  imagenesMaquina[0].src = "img/defecto.png";
    buttons[1].removeEventListener("click", botonYa);
    for (var i = 0; i < imagenesJugador.length ; i++) {
        imagenesJugador[i].classList.add("noSeleccionado");
        imagenesJugador[i].classList.remove("seleccionado");
        if(i == 0){
            imagenesJugador[i].classList.add("seleccionado");
            imagenesJugador[i].classList.remove("noSeleccionado");
        }
}

  
 
  }