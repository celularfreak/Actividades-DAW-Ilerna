/*Al iniciarse el juego el boton inicio 
y selector de coches estan ocultos*/
setTimeout(function () {
    $(".game").removeClass("hide");
	$(".title").removeClass("hide");
}, 2000);
//A los 2 segundos se muestran los botones
$(".game").addClass("hide");
$(".title").addClass("hide");

/*Seleccionamos el numero de coches, almacenamos el valor 
en el array junto a la velocidad que calculamos*/
var cars = [];
$("#carnumber").change(function () {
    cars = [];
    $(".car").addClass("hide");
	$(".logo").addClass("hide");
    var numberOfCars = $("#carnumber").val(); 
    for (var i = 1; i <= numberOfCars; i++) {
        var current = "car" + i;
        $(".car[data-id='" + current + "']").removeClass("hide"); 
        cars.push({
            "currentCar": current,
            "speed": Math.floor(Math.random() * (11 - 1) + 1) 
        }); 
    }
})
/*Al pulsar el boton de inicio se oculta el boton de inicio
el selector de numero de coches y el logo, y se muestra el
boton de reinicio y la tabla de resultados*/
$("#start").click(function () {
	$("#restart").removeClass("hide");
    $("#table").removeClass("hide");
    $("#dropmenu").addClass("hide");
    $("#start").addClass("hide");
	$(".title").addClass("hide");
/*Los coches se mueven y cuando llegan a la meta aoarece su
posicion en la tabla de resultados*/
    var result = 1;
    cars.forEach(function (car) {
        $(".car[data-id='" + car["currentCar"] + "']").animate({
            marginLeft: "100%"
        }, car["speed"] * 1000, function () {
            $('#results tbody').append('<tr><td>' + result + '</td><td>' + car["currentCar"] + '</td></tr>');
            result = result + 1;
        });
    });
});
/*Al pulsar el boton de reinicio se oculta el boton de reinicio,
se vacia la tabla de resultados, se muestra el boton de inicio,
los coches vuelven al inicio, ocultamos la pista,el selector de
numero de coches se reinicia, y 
se vuelve a mostrar el logo que habiamos ocultado.*/
$("#restart").click(function () {
	$(".car").animate({
        marginLeft: "0"
    });
	$("#restart").addClass("hide");
		$("#table").addClass("hide");
	setTimeout(function () {
		$("#results > tbody").html("");
		$("#start").removeClass("hide");
		$("#dropmenu").removeClass("hide");
		$("#start").removeClass("hide");
		$("#carnumber").val("0");
		$(".logo").removeClass("hide");
		$(".car").addClass("hide");
		$(".title").removeClass("hide");
	}, 1000);
});
