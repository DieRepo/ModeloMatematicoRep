
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
var n = 0;

var agregados = 0;
var totalPorcentajeSimulacion;

var juzgadosSimulacion = [];
var markers = [] ;



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

        obtenerJuzgados(map);

        //obtenerJuzgadosFamiliar(map);


    } catch (ex) {
        console.log(ex);
    }
}

function obtenerJuzgados(map) {
    console.log("Obtener información de WS");
    $.ajax({
        type: "POST",
        url: "http://localhost:59005/WebService.asmx/GetDetails",
        data: '{"fecha" : "2023-01-01", "materia": "FAMILIAR"} ',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            //alert(r.d);
            //console.log(r.d);
            const parsed = JSON.parse(r.d);
            markers = parsed;
            //console.log("TERMINA OBTENER JUZGADOS  " + markers.length);
            obtenerJuzgadosFamiliar(map);
        },
        error: function (r) {
            alert(r.responseText);
        },
        failure: function (r) {
            alert(r.responseText);
        }
    });

}


function obtenerJuzgadosFamiliar(map) {

    console.log("MARKERS JSON: "+markers.length)
    var latlngbounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
        var infoWindow = new google.maps.InfoWindow();

        var data = markers[i]
        //console.log(data);
        var myLatlng = new google.maps.LatLng(data.Lat, data.Lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.Title ,
            label: {
                text: data.Title + " (" + data.Total + ")" ,
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
                infoWindow.setContent("<div style = 'width:200px;min-height:40px'>Total: " + data.Total + "</div>");
                infoWindow.open(map, marker);

            });
        })(marker, data);
        arrayMarker.push(marker);
        latlngbounds.extend(marker.position);

        //infoWindow.setContent('            <div id="odometer0" class="odometer">' + data.Total+ '</div>');
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
        cadena += ' <div id="odometer' + (0 + 10) + '" class="odometer">' + i + '</div>';
    }


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
    console.log("Modificar: " + elemento + " -" + valor + "-");
    document.getElementById(elemento).textContent = valor;
    document.getElementById(elemento).style.visibility = "visible";

}

function ocultarOdometro(index, valor) {
    for (var x = index; x < 11; x++) {
        var elemento = 'odometer' + (x - 1);
        //console.log("Ocultar: " + elemento + " -" + valor + "-");
        /* document.getElementById(elemento).style.visibility= "hidden";*/
        document.getElementById(elemento).style.visibility = "hidden";
    }
    console.log("TERMINAR REINICIO");
}


function reiniciarOdometro(n) {
    console.log("REINICIAR");
    


    n = 0;
    var total = 10;
    /*for (var i = 0; i < total; i++) {
        var elemento = 'odometer' + i;
        document.getElementById(elemento).textContent = 0;
        document.getElementById(elemento).style.visibility = "hidden";

    }*/
    deleteMarkers(arrayMarker);
    console.log("TERMINAR REINICIO");
    for (var i = 0; i < arrayMarker.length; i++) {
        arrayMarker[i].setMap(null);
    }
    //arrayMarker = new Array();
    //document.getElementById('odometerTotal'+n).textContent = 0;
    //document.getElementById('nombreJuzgado'+n).textContent = "";
    //window.odometerTotal.innerHTML = 0;
    //window.NombreJuzgado.innerHTML = "";
    //obtenerJuzgadosFamiliar(map);
    //circle.setMap(null);
    //$('#tabla${n}').empty();
    window.location.reload();
}


function agregaJuzgado(latLng = google.maps.LatLng, map = google.maps.Map) {
    n++;
    arrayJuzgados.length = 0;
    try {

        const marker = new google.maps.Marker({
            position: latLng,
            label: {
                text: label,
                color: "WHITE",
                lineHeight: "20px",
                draggable: true,
                fontSize: "0px",
                fontWeight: "bold",
                icon: 'imag/01.png',
            },
            map: map,
            title: "Click derecho para eliminar",
            draggable: true,
        });

        arrayMarker.push(marker);

        const contentString =
            '<h5>INFORMACIÓN - SIMULACIÓN '+n+'</h5> '
            + '<div id="panelDatos' + n + ' " Style="right: 50px; top: 620px; z-index: 2; background-color: white; opacity: 0.8; border-radius: 20px; padding: 10px;" >'
            + '<table>'
            + '<tr>'
            + '    <td>'
            + '        Total:'
            + '   </td>'
            + '   <td>'
            + '       <input id="odometerTotal' + n + '" disabled value="0"  />'
            + '   </td>'
            + '</tr>'
            + '<tr>'
            + '    <td>'
            + '        Nombre Juzgado:'
            + '   </td>'
            + '   <td>'
            + '       <input id="nombreJuzgado'+n+'" text="Nombre" />'
            + '   </td>'
            + '</tr>'
            + '<tr>'
            + '   <td>'
            + '       <button id="buttonGenera'+ n + '" type="button" class="btn btn-secondary" onclick="mostrarInfoJuzgados('+n+');">Generar</button>'
            + '    </td>'
            + '</tr>'
            + '</table>'
            + '</div> '
            + '<div id="panel' + n + '" style="background-color: #e3f2fd;opacity: 0.8;border-radius: 20px;padding: 10px;">'
            + '     <table id="tablaJuzgado' + n + '">'
            + '     </table>'
            + '     <span>Total de porentaje: </span><span id="totalPorcentaje'+n+'"></span> <br /><br />'
            + '     <button id="buttonSimula'+n+'" type="button" class="btn btn-outline-primary" onclick="simularPorcentajes('+n+')">Generar</button>'
            + '     <button id="buttonGuarda' + n +'" type="button" class="btn btn-outline-success" onclick="simularPorcentajes("1")">Guardar</button>'
            + '</div>'

        console.log("resultado n: " + n);




        var infowindow = new google.maps.InfoWindow({

            content: contentString,
        });

        infowindow.open(map, marker);

        medirDistancia();

        google.maps.event.addListener(marker, 'click', 'click', function () {
            infoWindow.setContent(this.ventana);
            infoWindow.open(map, this);
        });



        google.maps.event.addListener(marker, 'drag', function () {
            //arrayMarker.length = 0;
            medirDistancia();
        });

        circle = new google.maps.Circle({
            map: map, radius: totalMetros, // distancen metros
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
                /*  arrayMarker[arrayMarker.length - 1];
                    setMapOnAll(map);
                    cleanArray(arrayMarker.length);
                    Eliminar espacios en blanco
                    marker.setMap(null); */
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
        console.log("TOTAL ARRAY MARKER: " + arrayMarker.length + "   MARKER: " + markers.length);
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

                //console.log(markers[x]);
                var arrayDeCadenas = arrayMarker[x].getLabel().text.split(" >> ");
                var esNuevo = arrayDeCadenas[0].includes('Nuevo');
                if (esNuevo) {
                    console.log("Nuevo Juzgado " + totalNuevo)
                    totalNuevo++;
                } else {

                    var total = parseInt(markers[x].Total)

                    arrayMarker[x].setAnimation(google.maps.Animation.BOUNCE); //Agregar animación

                    posicion2 = x;

                    agregados = agregados + parseInt(markers[x].Total);
                    //modificarOdometro(contador, total);

                }

                arrayJuzgados.push(markers[x]);
                contador = contador + 1;

            }
            else {

                arrayMarker[x].setAnimation(null);

                posicion2 = x;
                //      var fijos = 4;

            }
            arrayMarker[x].getPosition();
        }

        //sumar( contador, agregados, fijos);
        totalMarkers = contador;
        modificarOdometro(contador, 0);
        ocultarOdometro(arrayMarker.length, 0);


        //Actualizar input de totales
        /*var inputNombre = document.getElementById("totalSumaJuzgados");
        inputNombre.value = ""+agregados;*/

        //console.log("TOTAL : "+ $('totalJuzgado').val);

        //this.odometerTotal = agregados;

        console.log("AGREGADOS KARY " + agregados);



        //document.getElementById('total').value = agregados;
        totalNuevo++;
        var elementoC = 'odometerTotal' + totalNuevo;
     /* console.log($("#odometerTotal" + totalNuevo).val(agregados));*/

        console.log("TOTAL AGREGADOS: " + agregados + " ----- " + contador + "  N: " + totalNuevo+ "        ID= "+elementoC);

        //$("#" + elementoC).load(window.location.href + " #" + elementoC);
        //document.getElementById(elementoC).innerHTML.text = agregados;
        //$("[id*=odometerTotal" + elementoC + "]").html(""+agregados);
        //$("[id*=odometerTotal" + elementoC + "]").addClass("odometer");
        //$("#" + elementoC).load("#" + elementoC);

    } catch (ex) {
        console.log(ex);
    }
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


function mostrarInfoJuzgados(cont) {
    $("#odometerTotal" + cont).val(agregados);
    console.log("entra a mostrar info juzgados   markers=>" + totalMarkers);
    var count = totalMarkers;
    const htmlInfo = [];
    console.log(arrayJuzgados);
    console.log("TOTAL JUZGADOS: " + arrayJuzgados.length);
    console.log($('#tablaJuzgado' + cont) );
    $('#tablaJuzgado' + cont).empty();
    htmlInfo.push('<tr><td>Nombre</td><td>Porcentaje</td><td>Total</td></tr>');
    for (var i = 0; i < (totalMarkers); i++) {
        var idJuz = (i == 0) ? 'N' : arrayJuzgados[i - 1].Id;
        var nombreJuzgado = (i == 0) ? ($.trim($("[id*=nombreJuzgado"+cont+"]").val())) : (arrayJuzgados[i - 1].Title);
        var porcentajeJuzgado = (i == 0) ? $.trim($("[id*=porcentajeJuzgado"+cont+"]").val()) : 0;
        var totalInicio = (i == 0) ? 0 : arrayJuzgados[i - 1].Total;
        //console.log(i + " - " + nombreJuzgado + " - " + porcentajeJuzgado);

        var dato = '<tr>' +
            '<td style="width:300px;"> ' + idJuz + ". " + nombreJuzgado + '</td>' +
            '<td> <input id="simula' + cont + "_" + i + '"  Text="' + porcentajeJuzgado + '" style="width: 50px;" type="number" pattern="[0-9]+" min="0" max="99" class="totPor' + cont + '" onkeyup="sumarPorcentajes(' + cont + ');"/></td>' +
            '<td> <input id="simulaTotalPanel' + cont + '_' + i +'" value="0" disabled style="width: 50px;" /> </td> '+
            ' </tr >';
        htmlInfo.push(dato);

        if((nombreJuzgado == "")) {  //COMPRUEBA CAMPOS VACIOS
            alert("Campo Vacio");
            return true;
        }

        //Crear objetos para almacenarlos posteriormente en BD
        var obj = new Object();
        obj.Id = idJuz;
        obj.Nombre = nombreJuzgado;
        obj.Total = totalInicio;
        obj.Porcentaje = 0;
        obj.TotalSimula = 0;
        console.log(obj);
        juzgadosSimulacion.push(obj);
    }
    $('#tablaJuzgado' + cont).append(htmlInfo.join(''));
    //arrayJuzgados.length = 0;
}






function simularPorcentajes(cont) {
    console.log("-");
    console.log("-");
    var tot = $.trim($('[id*=totalPorcentaje' + cont + ']').val());
    console.log("AGREGADOS >>>>> " + agregados + " - " + tot);

    if (totalPorcentajeSimulacion > 100) {
        alert('Verificar porcentajes, se excede el 100 %');
    } else {
        for (var i = 0; i < juzgadosSimulacion.length; i++) {
            var prcnt = $.trim($("[id*=simula" + cont +"_" + i + "]").val());
            juzgadosSimulacion.Porcentaje = (agregados * prcnt) / 100;
            juzgadosSimulacion.porcentaje = Math.round(juzgadosSimulacion.porcentaje);
            $("#simulaTotalPanel"+cont+"_"+i).val(juzgadosSimulacion.Porcentaje);
            //simulaTotalPanel
            //console.log(i + " -- " + juzgadosSimulacion.Porcentaje);
            modificarOdometro(i, juzgadosSimulacion.Porcentaje);
        }
    }
}





function sumarPorcentajes(n) {
    totalPorcentajeSimulacion = 0;
    $(".totPor"+n).each(function () {
        if (isNaN(parseInt($(this).val()))) {
            totalPorcentajeSimulacion += 0;
        } else {
            totalPorcentajeSimulacion += parseFloat($(this).val());
        }
    });
     document.getElementById('totalPorcentaje'+n).innerHTML = totalPorcentajeSimulacion;

    //window.TotalPorcentaje.innerHTML = totalPorcentajeSimulacion;

    //console.log("TOT PORC " + totalPorcentajeSimulacion);

    if (totalPorcentajeSimulacion > 100) {
        alert('SE HA EXCEDIDO EL TOTAL DE 100 %');
    }
}


