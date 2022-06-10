var idEvento = 0;
var arrayMarker = new Array();

/*
*/
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
 * 
 */
function initMap() {
    try {
        var map;

        var myLocation = new google.maps.LatLng(19.316327373141174, -99.67071533203125);
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
            + '<button type= "button" class="btn btn-secondary"> Boton 2 </button >'
            + '<button type="button" class="btn btn-success">Success</button>'
            + '<button type="button" class="btn btn-danger">Danger</button>'
            + '<button type="button" class="btn btn-warning">Warning</button>'
            + '<button type="button" class="btn btn-info">Info</button>'
            + '<button type="button" class="btn btn-light">Light</button>'
            + '<button type="button" class="btn btn-dark">Dark</button>'
            + ' </div>'
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

       


      
    } catch (ex) { console.log(ex);}
}

function agregaJuzgado(latLng= google.maps.LatLng, map = google.maps.Map) {
    try {

        const marker = new google.maps.Marker({
            position: latLng,
            map,
            title: "Click derecho para eliminar",

        });

        //var alerta = new google.maps.Circle({
        //    strokeColor: '#FF0000',
        //    strokeOpacity: 0.8,
        //    strokeWeight: 2,
        //    fillColor: '#FF0000',
        //    fillOpacity: 0.35,
        //    map: map,
        //    center: latLng,
        //    radius: 5000
        //});

        marker.addListener("rightclick", () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            marker.setMap(null);
            alerta.setMap(null);
        });

       /* map.addListener("center_changed", () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            window.setTimeout(() => {
                map.panTo(marker.getPosition() = google.maps.LatLng);
            }, 3000);
        });*/

        //google.maps.event.addListener(map, "rightclick", function (event) {
        //    var lat = event.latLng.lat();
        //    var lng = event.latLng.lng();
        //    // populate yor box/field with lat, lng
        //    alert("Lat=" + lat + "; Lng=" + lng);
        //});

        arrayMarker.push(marker);
        medirDistancia();
    } catch (ex) { console.log(ex); }
}

function medirDistancia() {
    try { 
        //var firstLatLng = null;
        //var secondLatLng = null

        firstLatLng = arrayMarker[0].getPosition();

        for (var x = 0; x < arrayMarker.length-1; x++) {
            //console.log(arrayMarker[x]);
           

            //secondLatLng = arrayMarker[x].getPosition();

            var distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
                arrayMarker[arrayMarker.length-1].getPosition(),
                arrayMarker[x].getPosition()
            );

            // Imprime : Distance in Meters:  286562.7470149898

            if (distanceInMeters <= 15000) {
                console.log("Juzgado dentro de la simulacion Distancia en metros:" + distanceInMeters);
                arrayMarker[x].setAnimation(google.maps.Animation.BOUNCE);
                arrayMarker[arrayMarker.length - 1].setAnimation(google.maps.Animation.BOUNCE);
            } else {
                arrayMarker[x].setAnimation(null);
                console.log("Juzgado fuera de la simulacion Distancia en metros:" + distanceInMeters);
            }

            //console.log(firstLatLng);
           // console.log(secondLatLng);

        }
   
    } catch (ex) { console.log(ex); }
}