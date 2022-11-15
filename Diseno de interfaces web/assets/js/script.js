
var coches = [];
$("#carnumber").change(function () {
    coches = [];
    $(".car").addClass("hide");
    var numeroDeCoches = $("#carnumber").val(); 
    for (var i = 1; i <= numeroDeCoches; i++) {
        var actual = "car" + i;
        $(".car[data-id='" + actual + "']").removeClass("hide"); 
        coches.push({
            "cocheActual": actual,
            "velocidad": Math.floor(Math.random() * (11 - 1) + 1) 
        }); 
    }
})


$("#start").click(function () {
    $("#restart").removeClass("hide");
    $("#table").removeClass("hide");
    $("#dropmenu").addClass("hide");
    $("#start").addClass("hide");
    

    var posicion = 1;
    coches.forEach(function (coche) {
        $(".car[data-id='" + coche["cocheActual"] + "']").animate({
            marginLeft: "95.9%"
        }, coche["velocidad"] * 1000, function () {
            $('#results tbody').append('<tr><td>' + posicion + '</td><td>' + coche["cocheActual"] + '</td></tr>');
            posicion = posicion + 1;
        });
    });
});


$("#restart").click(function () {
    $("#restart").addClass("hide");
    $("#table").addClass("hide");
    $("#start").removeClass("hide");
    $("#dropmenu").removeClass("hide");
    $("#start").removeClass("hide");
    $(".car").animate({
        marginLeft: "0"
    });
    $("#results > tbody").html("");
});