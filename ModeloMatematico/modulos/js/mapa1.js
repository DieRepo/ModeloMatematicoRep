var idEvento = 0;
var arrayMarker = new Array();
var label = "Juzgado: ";
var position = [19.316327373141174, -99.67071533203125];


$(document).ready(function () {
    initMap();
    $("#btnMenu").click(function () {
        if ($('#contMenu').is(':visible')) {

            $("#contMenu").slideUp(1000);
            $("#btnMenu").addClass("arrowBottom");
            $("#btnMenu").removeClass("arrowTop");
        } else {
            $('#contMenu').slideDown(1000);
            $("#btnMenu").addClass("arrowTop");
            $("#btnMenu").removeClass("arrowBottom");
        }
    });

});

/**
 * crear mapa
 */

function initMap() {
    try {
        var map;

        var myLocation = new google.maps.LatLng(position[0], position[1]);
        var mapOptions = {
            zoom: 9,
            center: myLocation,
            mapTypeControl: true,
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $("#map").append('<div id="contMenu" class="contMenu">'
            + '<div class="container">'
            + '<div class="row justify-content-center">'
            + '<div class="btn-group" role= "group" aria- label="Basic mixed styles example" >'
            + '<button type="button" class="btn btn-primary" id="agregarJuzgado">+ Juzgado</button>'
            + '<button type="button" class="btn btn-secondary" id="moverJuzgado"> Mover </button >'
            + '<button type="button" class="btn btn-danger" id="eliminarJuzgado">Eliminar</button>'
            + '<button type="button" class="btn btn-success">Danger</button>'
            + '<button type="button" class="btn btn-warning">Warning</button>'
            + '<button type="button" class="btn btn-info">Info</button>'
            + '<button type="button" class="btn btn-light">Light</button>'
            + '<button type="button" class="btn btn-dark">Dark</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'

            + '<div class="img arrowText arrowBottom" id="btnMenu">'
            + '<a>MENU</a> '
            + '</div>');


        map.addListener("click", (e) => {
            // 3 seconds after the center of the map has changed, pan back to the
            if (idEvento == 0) {
            } else if (idEvento == 1) {
                agregaJuzgado(e.latLng, map);
            }

        });

        $("#agregarJuzgado").click(function () {
            idEvento = 1;
        });


    } catch (ex) { console.log(ex); }
}


function agregaJuzgado(latLng = google.maps.LatLng, map = google.maps.Map) {

    try {

        const marker = new google.maps.Marker({
            position: latLng,
            label: {
                text: label,
                color: "#000",
                lineHeight: "20px",
                draggable: true,
                fontSize: "20px",
                fontWeight: "bold"
            },
            map: map,
            title: "Click derecho para eliminar",
            draggable: true,
        });

        arrayMarker.push(marker);
        medirDistancia();

        google.maps.event.addListener(marker, 'drag', function () {
            medirDistancia();
        });


        marker.addListener("rightclick", () => {

            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            if (idEvento == 0) {
            } else if (idEvento == 1) {
                // mensaje de eliminado

                marker.setMap(null); //eliminar marcador
                deleteMarkers(arrayMarker);
                //  arrayMarker[arrayMarker.length - 1];
                //  setMapOnAll(map);
                // cleanArray(arrayMarker.length);
                //Eliminar espacios en blanco
                //marker.setMap(null);
                var popup = new google.maps.InfoWindow({
                    content: 'Marcador eliminado'
                    , position: map.getCenter()
                });
                console.log(arrayMarker.length);

                popup.open(map);
            }

        });
    }
    catch (ex) { console.log(ex); }
}

function cleanArray(arrayMarker) {
    var newArray = new Array();
    for (var i = 0, j = arrayMarker.length; i < j; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}


function medirDistancia() {

    try {
        //firstLatLng = arrayMarker[0].getPosition();
        var x = 0;
        cleanArray(arrayMarker.length);
        var agregados = 6;
        var fijos = 4;

        a = 1;
        for (x; x < arrayMarker.length - 1; x++) {


            posicion = arrayMarker.length;

            var distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
                arrayMarker[arrayMarker.length - 1].getPosition(),
                arrayMarker[x].getPosition(),
            );

            if (distanceInMeters <= 15000) {
              

                // console.log("Juzgado dentro de la simulacion Distancia en metros:" + distanceInMeters);
                arrayMarker[x].setAnimation(google.maps.Animation.BOUNCE);

                arrayMarker[arrayMarker.length - 1].setAnimation(google.maps.Animation.BOUNCE);
                posicion2 = x;
                console.log("JUNTOS  posicion:" + posicion + " " + "pos2=" + posicion2);

                // sumar(posicion, posicion2, agregados,a);
                arrayMarker[x].setLabel(label + x);
                a++;
                console.log("veces q pasa en a:" + a);

            }
            else {
                arrayMarker[x].setAnimation(null);
                // console.log("Juzgado fuera de la simulacion Distancia en metros:" + distanceInMeters);
                arrayMarker[x].setLabel(label + x);
                posicion2 = x;
                console.log("SEPARADOS posicion:" + posicion + " " + "pos2=" + posicion2);
                // sumar(fijos, posicion, posicion2);
                //sumar(fijos);
            }
            arrayMarker[x].getPosition();
        }

    } catch (ex) { console.log(ex); }
}


function cleanArray(arrayMarker) {
    var newArray = new Array();
    for (var i = 0, j = arrayMarker.length; i < j; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}


function sumar(posicion, posicion2, fijos, agregados) {

    if (fijos == null) {
        fijos = 0;
    } else {
        fijos;
    }

    if (agregados == null) {
        agregados = 0;
    } else {
        agregados;
    }


    var suma = 0;
    if (posicion2 == 0) {

        posicion2 = posicion2 + 1;
    } else {
        posicion2;
    }
    div = posicion - posicion2;

    if (div == 0) {

        div = div + 1;
    } else if (div == 1) {

        div = div + 1;
    } else {
        div;
    }

    for (var i = 0; i < posicion; i++) {

        if (i <= div) {
            suma = agregados + fijos + suma;
            console.log(suma);

        }
        console.log(i);

    }

    div = suma / div;
    console.log(div);
}


function setMapOnAll(map) {
    for (var i = 0; i < arrayMarker.length; i++) {
        arrayMarker[i].setMap(map);
    }
}


function deleteMarkers(arrayMarker) {
    for (let i = 0; i < arrayMarker.length; i++) {
        total = arrayMarker.length - 1;
        console.log("total length= " + total);
    }

    let removedItem = arrayMarker.pop();
    arrayMarker;
    removedItem;

    arrayMarker = [total];

    medirDistancia(removedItem);
}


