setTimeout(function () {
    $(".game").removeClass("hide");
}, 2000);

$(".game").addClass("hide");

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

$("#start").click(function () {
    $("#restart").removeClass("hide");
    $("#table").removeClass("hide");
    $("#dropmenu").addClass("hide");
    $("#start").addClass("hide");

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


$("#restart").click(function () {
	$(".car").animate({
        marginLeft: "0"
    });
	$("#restart").addClass("hide");
		$("#table").addClass("hide");
	setTimeout(function () {
		$("#start").removeClass("hide");
		$("#dropmenu").removeClass("hide");
		$("#start").removeClass("hide");
		$("#results > tbody").html("");
		$("#carnumber").val("0");
		$(".logo").removeClass("hide");
		$(".car").addClass("hide");
	}, 1000);
    
});
