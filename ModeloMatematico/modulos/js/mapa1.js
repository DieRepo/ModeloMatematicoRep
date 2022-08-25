var idEvento = 0;
var arrayMarker = new Array();
var label = "Nuevo Juzgado  >> 0 ";
var position = [19.316327373141174, -99.67071533203125];
var a = 1;
var total = 0;
var totalMarkers = 0;
var totalMetros = 0;
var circle;
var totalNuevo = 0;
var arrayJuzgados = [];
var map;

var agregados = 0;
var totalPorcentajeSimulacion;

var juzgadosSimulacion = [];
var markers = [
    {
        "id": "1",
        "total": "10",
        "title": 'Juzgado 1° Familiar Toluca',
        "lat": '19.11821699',
        "lng": '-99.63481351',
        "description": 'Aksa Beach is a popular beach and a vacation spot in Aksa village at Malad, Mumbai.'
    },
    {
        "id": "2",
        "total": "20",
        "title": 'Juzgado 2° Familiar Toluca',
        "lat": '19.4247067',
        "lng": '-99.63481351',
        "description": 'Juhu Beach is one of favorite tourist attractions situated in Mumbai.'
    },
    {
        "id": "3",
        "total": "30",
        "title": 'Juzgado 3° Familiar Toluca',
        "lat": '19.71821699',
        "lng": '-99.63481351',
        "description": 'Girgaum Beach commonly known as just Chaupati is one of the most famous public beaches in Mumbai.'
    },
    {
        "id": "4",
        "total" : "40",
        "title": 'Juzgado 4° Familiar Toluca',
        "lat": '19.9247067',
        "lng": '-99.63481351',
        "description": 'Jijamata Udyan is situated near Byculla station is famous as Mumbai (Bombay) Zoo.'
    },
    {
        "id": "5",
        "total": "50",
        "title": 'Juzgado 5° Familiar Toluca',
        "lat": '19.2147067',
        "lng": '-99.63481351',
        "description": 'Sanjay Gandhi National Park is a large protected area in the northern part of Mumbai city.'
    }
];



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
    //loadInfo();
});



/**
 * crear mapa
 */

function initMap() {
    try {
        map;

        var myLocation = new google.maps.LatLng(position[0], position[1]);
        var mapOptions = {
            zoom: 9,
            center: myLocation,
            mapTypeControl: true,
            noClear: false
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
            + '<button type="button" class="btn btn-light" id="reiniciar" onclick="reiniciarOdometro()">Reiniciar</button>'
            + '<button type="button" class="btn btn-dark" id="simular" onclick="simularInfo()">Simular</button>'

            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'

            + '<div class="img arrowText arrowBottom" id="btnMenu">'
            + '<a>MENU</a> '
            + '</div>'
      );


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

        obtenerJuzgadosFamiliar(map);


    } catch (ex) { console.log(ex); }
}


function obtenerJuzgadosFamiliar(map ) {
    var latlngbounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
        var infoWindow = new google.maps.InfoWindow();

        var data = markers[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title,
            label: {
                text: data.title,
                color: "#000",
                lineHeight: "20px",
                draggable: true,
                animation: google.maps.Animation.DROP,
                fontSize: "14px",
                fontWeight: "bold"
            },
        });

        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
               infoWindow.setContent("<div style = 'width:200px;min-height:40px'>Total: "+data.total+"</div>");
                infoWindow.open(map, marker);

            });
        })(marker, data);
        arrayMarker.push(marker);
        latlngbounds.extend(marker.position);

        //infoWindow.setContent('            <div id="odometer0" class="odometer">' + data.total+ '</div>');
        //infoWindow.setContent('<div id="odometer' + (i+1) + '" class="odometer odometer-auto-theme"><div class="odometer-inside"><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class= "odometer-ribbon-inner" > <span class="odometer-value">0</span></span ></span ></span ></span ></div ></div > ');
        //infoWindow.open(map, marker);

    }
    var bounds = new google.maps.LatLngBounds();
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
}





function simularInfo() {
    var total = 5;
    var cadena = "";
    for (var i = 0; i < total; i++) {
        cadena += ' <div id="odometer' + (0+10) + '" class="odometer">' + i + '</div>';
    }
    //document.getElementById("panelOdometro").textContent = cadena;

    //$("#panelOdometro").append(cadena);
   /* var el = document.querySelector('#panelOdometro');

    od = new Odometer({
        el: el,
        value: 10,
        // Any option (other than auto and selector) can be passed in here
        format: '',
        theme: 'digital'
    });

    od.update(100)
    // or
    el.innerHTML = 150  */


    console.log("SIMULACION");
    var cont = 42;
    console.log(agregados + "  /  " + totalMarkers);

    var totalSimulacion = (agregados / totalMarkers);
    console.log(elemento + "    " + totalSimulacion);

    for (var i = 0; i < total; i++) {
        var elemento = 'odometer' + i;
        $(elemento).html('');
        //setTimeout(function () { elemento.innerHTML = cont; }, 1000);

        //$(elemento).html(cont );
        var text = document.getElementById(elemento).textContent;
        document.getElementById(elemento).textContent = parseInt(totalSimulacion);
        cont = cont + 10;
    }



    console.log("TERMINAR SIMULACION");
}


function modificarOdometro(index, valor) {
    var elemento = 'odometer' + index;
    console.log("Modificar: "+elemento + " -"+valor+"-");
    document.getElementById(elemento).textContent = valor;
    document.getElementById(elemento).style.visibility = "visible";

}

function ocultarOdometro(index, valor) {
    for (var x = index; x < 11; x++) {
        var elemento = 'odometer' + (x - 1);
        //console.log("Ocultar: " + elemento + " -" + valor + "-");
        document.getElementById(elemento).style.visibility= "hidden";
    }
    console.log("TERMINAR REINICIO");
}


function reiniciarOdometro() {
    console.log("REINICIAR");
    var total = 10;
    for (var i = 0; i < total; i++) {
        var elemento = 'odometer' + i;
        document.getElementById(elemento).textContent = 0;
        document.getElementById(elemento).style.visibility = "hidden";
    }
    deleteMarkers(arrayMarker);
    console.log("TERMINAR REINICIO");
    for (var i = 0; i < arrayMarker.length; i++) {
        arrayMarker[i].setMap(null);
    }
    arrayMarker = new Array();
    document.getElementById('odometerTotal').textContent = 0;
    document.getElementById('nombreJuzgado').textContent = "";
    obtenerJuzgadosFamiliar(map);
    $('#tablaJuzgados').empty();
}


function agregaJuzgado(latLng = google.maps.LatLng, map = google.maps.Map) {
    //marker.circle.setMap(null);
    arrayJuzgados.length = 0;
    try {

        const marker = new google.maps.Marker({
            position: latLng,
            label: {
                text: label,
                color: "WHITE",
                lineHeight: "20px",
                draggable: true,
                //animation: google.maps.Animation.DROP,
                fontSize: "0px",
                fontWeight: "bold",
                icon: 'imag/01.png',
            },
            map: map,
            title: "Click derecho para eliminar",
            draggable: true,
        });

        arrayMarker.push(marker);


        var infowindow = new google.maps.InfoWindow({
            content: ''  /* '<h5>INFORMACION</h5>'
                + '<table border="0" cellpadding="0" cellspacing="0">'
                + '<tr>'
                + '    <td>'
                + '        Total:'
                + '   </td>'
                + '   <td>'
                + '        <input id="totalJuzgado"  Text="0" />'
                + '    </td>'
                + '</tr>'
                + '<tr>'
                + '    <td>'
                + '        Porcentaje:'
                + '   </td>'
                + '   <td>'
                + '        <input id="porcentaje"  Text="0" />'
                + '    </td>'
                + '</tr>'
                + '</div > '*/
        });
        infowindow.open(map, marker);


        medirDistancia();

        google.maps.event.addListener(marker, 'drag', function () {
            //arrayMarker.length = 0;
            medirDistancia();
        });

        circle = new google.maps.Circle({
            map: map, radius: totalMetros, // distancia en metros
            fillColor: '#0dcaf0'
        });

        circle.bindTo('center', marker, 'position');
 

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
        console.log("TOTAL ARRAY MARKER: "+arrayMarker.length + "   MARKER: "+markers.length);
        cleanArray(arrayMarker.length);

        totalMetros = parseInt($.trim($("[id*=distancia]").val()));
        var contador = 1;
        agregados = 0;
        totalNuevo = 0;
        for (x; x < arrayMarker.length - 1; x++) {



            posicion = arrayMarker.length;

            var distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
                arrayMarker[arrayMarker.length - 1].getPosition(),
                arrayMarker[x].getPosition(),
            );

            if (distanceInMeters <= totalMetros) {


                console.log(markers[x]);
                var arrayDeCadenas = arrayMarker[x].getLabel().text.split(" >> ");
                var esNuevo = arrayDeCadenas[0].includes('Nuevo');
                if (esNuevo) {
                    console.log("Nuevo Juzgado " + totalNuevo)
                    totalNuevo++;
                } else {
                    // console.log("Juzgado dentro de la simulacion Distancia en metros:" + distanceInMeters);
                    var total = parseInt(markers[x].total)
                    //console.log("LABEL  total: " + total[1]+ "->"+total[0]);
                    //var arrayDeCadenas = cadenaADividir.split(separador);
                    arrayMarker[x].setAnimation(google.maps.Animation.BOUNCE); //Agregar animación
                    //arrayMarker[arrayMarker.length - 1].setAnimation(google.maps.Animation.BOUNCE);
                    posicion2 = x;
                    //console.log("JUNTOS  posicion:" + posicion + " " + "pos2=" + posicion2);

                    //arrayMarker[x].setLabel(label + x);
                    agregados = agregados + parseInt(markers[x].total);
                    modificarOdometro(contador, total);
                //console.log("veces q pasa en a:" + contador);
                //console.log("TOTAL AGREGADOS: "+agregados + " ----- ");
                }

                arrayJuzgados.push(markers[x]);
                contador = contador + 1;

            }
            else {

                arrayMarker[x].setAnimation(null);
                // console.log("Juzgado fuera de la simulacion Distancia en metros:" + distanceInMeters);
                //arrayMarker[x].setLabel(label + x);
                posicion2 = x;
                var fijos = 4;
                //console.log("SEPARADOS posicion:" + posicion + " " + "pos2=" + posicion2);
                // sumar(fijos, posicion, posicion2);
                //sumar(fijos);
            }
            arrayMarker[x].getPosition();
        }

        //sumar( contador, agregados, fijos);
        totalMarkers = contador;
        modificarOdometro(contador, 0);
        ocultarOdometro(arrayMarker.length , 0);


        //Actualizar input de totales
        /*var inputNombre = document.getElementById("totalSumaJuzgados");
        inputNombre.value = ""+agregados;*/

        //console.log("TOTAL : "+ $('totalJuzgado').val);
        document.getElementById('odometerTotal').textContent = agregados;

        //document.getElementById('total').value = agregados;
        totalNuevo++;
        console.log("TOTAL AGREGADOS: " + agregados + " ----- " + contador + "  N: " + totalNuevo);

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


function mostrarInfoJuzgados() {
    console.log("entra a mostrar info juzgados   markers=>"+totalMarkers);
    var count = totalMarkers;
    const htmlInfo = [];
    console.log(arrayJuzgados);
    console.log("TOTAL JUZGADOS: " + arrayJuzgados.length);
    $("#tablaJuzgados").empty();
    htmlInfo.push('<tr><td>Nombre</td><td>Porcentaje</td></tr>');
    for (var i = 0; i < (totalMarkers); i++) {
        var idJuz = (i == 0) ? 'N' : arrayJuzgados[i - 1].id;
        var nombreJuzgado = (i == 0) ? ( $.trim($("[id*=nombreJuzgado]").val())) : (arrayJuzgados[i - 1].title);
        var porcentajeJuzgado = (i == 0) ? $.trim($("[id*=porcentajeJuzgado]").val()) : 0;
        var totalInicio = (i == 0) ? 0 : arrayJuzgados[i - 1].total ;
        console.log(i + " - " + nombreJuzgado + " - " + porcentajeJuzgado);

        var dato = '<tr>' +
            '<td style="width:300px;"> ' + idJuz +". " + nombreJuzgado+'</td>' +
            '<td> <input id="simula' + i + '"  Text="' + porcentajeJuzgado + '" style="width: 50px;" class="totPor" onkeyup="sumarPorcentajes();"  /></td>' +
            //'<td><div id="odometerTotal09' + count + '" class="odometer">0</div> </td>' +
            ' </tr >';
        htmlInfo.push(dato);

        //Crear objetos para almacenarlos posteriormente en BD
        var obj = new Object();
        obj.id = idJuz;
        obj.nombre = nombreJuzgado;
        obj.total = totalInicio;
        obj.porcentaje = 0;
        obj.totalSimula = 0;
        console.log(obj);
        juzgadosSimulacion.push(obj);
    }
    $('#tablaJuzgados').append(htmlInfo.join(''));
    //arrayJuzgados.length = 0;
}






function simularPorcentajes() {
    console.log("-");
    console.log("-");
    var tot = $.trim($("[id*=totalPorcentaje1]").val());
    console.log("AGREGADOS >>>>> " + agregados + " - "+tot);

    if (totalPorcentajeSimulacion > 100) {
        alert('Verificar porcentajes, se excede el 100 %');
    } else {
        for (var i = 0; i < juzgadosSimulacion.length; i++) {
            var prcnt = $.trim($("[id*=simula" + i + "]").val());
            juzgadosSimulacion.porcentaje = (agregados * prcnt) / 100;
            //console.log(i + " -- " + juzgadosSimulacion.porcentaje);
            modificarOdometro(i, juzgadosSimulacion.porcentaje);
        }
    }
}





function sumarPorcentajes() {
    totalPorcentajeSimulacion = 0;
    $(".totPor").each(function () {
        if (isNaN(parseInt($(this).val()))) {
            totalPorcentajeSimulacion += 0;
        } else {
            totalPorcentajeSimulacion += parseFloat($(this).val());
        }
    });
    document.getElementById('totalPorcentaje1').innerHTML = totalPorcentajeSimulacion;
    //console.log("TOT PORC " + totalPorcentajeSimulacion);

    if (totalPorcentajeSimulacion > 100) {
        alert('SE HA EXCEDIDO EL TOTAL DE 100 %');
    }
}


