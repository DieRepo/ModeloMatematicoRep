<%@ Page Language="VB" AutoEventWireup="false" CodeFile="mapa.aspx.vb" Inherits="modulos_mapa_mapa" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../../Content/bootstrap.css" rel="stylesheet" />
        <link href="../../modulos/css/mapa.css" rel="stylesheet" />

    <title></title>
    <style>
        #map {
            height: 100%;
        }

        .odometer {
            font-size: 30px;
        }

        /* 
 * Optional: Makes the sample page fill the window. 
    * Prueba de Abisai para subir cambios 
    Prueba Abisai Meza Combinacion de cambios
 */
        /*
Probando subida de archivos
    **********************
    ****
*/
        html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>

    <form id="form1" runat="server">


    <div style="position: relative;">
        <div id="map" style="position: absolute; left: 10px; top: 25px; z-index: 1; width: 100%; min-height: 768px;">MAPA</div>
        <div id="panelOdometro" style="position: absolute; left: 30px; top: 80px; z-index: 3; opacity:0.7;">
            CUADRO 2 
           
           <br />
            <div id="odometer0" class="odometer">0</div>
            <br />
            <div id="odometer1" class="odometer" >0</div>
            <br />
            <div id="odometer2" class="odometer">0</div>
            <br />
            <div id="odometer3" class="odometer">0</div>
            <br />
            <div id="odometer4" class="odometer">0</div>
            <br />
            <div id="odometer5" class="odometer" >0</div>
            <br />
            <div id="odometer6" class="odometer">0</div>
            <br />
            <div id="odometer7" class="odometer">0</div>
            <br />
            <div id="odometer8" class="odometer">0</div>
            <br />
            <div id="odometer9" class="odometer" >0</div>
            <br />

        </div>


        <asp:Panel runat="server" Style="position: absolute; right: 50px; top: 120px; z-index: 2; background-color: white; opacity: 0.8; border-radius: 20px;  padding: 15px;">
            INFORMACION

                      <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                              <td>Distancia en metros:
                              </td>
                              <td>
                                  <asp:TextBox ID="distancia" runat="server" Text="10000" />
                              </td>
                          </tr>

                      </table>
        </asp:Panel>




        <asp:Panel runat="server" Style="position: absolute; left: 50px; top: 820px; z-index: 2; display: none">
            CUADRO 3 

               <table border="0" cellpadding="0" cellspacing="0">
                   <tr>
                       <td>Distancia en metros:
                       </td>
                       <td>
                           <asp:TextBox ID="txtName" runat="server" Text="10000" />
                       </td>
                   </tr>
                   <tr>
                       <td>Juzgado:
                       </td>
                       <td>
                           <asp:TextBox ID="txtAge" runat="server" Text="Juzgado Nuevo" />
                       </td>
                   </tr>
                   <tr>
                       <td>
                           <asp:Button ID="btnSubmit" Text="Enviar" runat="server" />
                       </td>
                   </tr>
               </table>
          </asp:Panel>




        <asp:Panel runat="server" ID="panelDatos" Style="position: absolute; right: 50px; top: 620px; z-index: 2; background-color: white; opacity: 0.8; border-radius: 20px; padding: 10px; display:none;">
            <h5>INFORMACION</h5>
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td>Total:
                    </td>
                    <td>
                        <div id="odometerTotal" class="odometer">0</div>
                                                <%--                       <input id="totalSumaJuzgados"  text="0" visible="false"/>--%>

                    </td>
                </tr>
              <%--  <tr>
                    <td>Porcentaje:
                    </td>
                    <td>
                        <input id="porcentajeJuzgado" text="0" />
                    </td>
                </tr>--%>
                <tr>
                    <td>Nombre Juzgado:
                    </td>
                    <td>
                        <input id="nombreJuzgado" text="Nombre" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onclick="mostrarInfoJuzgados()">Generar</button>
                    </td>
                </tr>
            </table>
        </asp:Panel>


        <asp:Panel runat="server" ID="panel1" Style="position: absolute; left: 30px; top: 520px; z-index: 2; background-color: #e3f2fd; opacity: 0.8; border-radius: 20px; padding: 10px; display:none;">
            <table id="tablaJuzgados" border="0" cellpadding="0" cellspacing="0">
            </table>
            <span>Total de porentaje: </span><span id="totalPorcentaje1"></span>
            <br />
            <button type="button" class="btn btn-outline-primary" onclick="simularPorcentajes()">Generar</button>

            <button  type="button" class="btn btn-outline-success" onclick="simularPorcentajes()">Guardar</button>

        </asp:Panel>



    </div>


    <div>

       
    </div>
    <link rel="stylesheet" href="http://github.hubspot.com/odometer/themes/odometer-theme-train-station.css" />
    <script src="http://github.hubspot.com/odometer/odometer.js"></script>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBQYIkq1-4sG-FWP5vgTVE2LMagnWkfo&libraries=geometry"></script>
    <script src="../../Scripts/jquery-3.6.0.min.js"></script>
    <script src="../../Scripts/bootstrap.js"></script>
    <script src="../js/mapa1.js"></script>

    <script>
        $(function () {
            $("[id*=btnSubmit]").click(function () {
                var name = $.trim($("[id*=txtName]").val());
                var age = $.trim($("[id*=txtAge]").val());
                $.ajax({
                    type: "POST",
                    url: "http://localhost:59005/WebService.asmx/GetDetails",
                    data: "{ name: '" + name + "', age: " + age + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (r) {
                        alert(r.d);
                    },
                    error: function (r) {
                        alert(r.responseText);
                    },
                    failure: function (r) {
                        alert(r.responseText);
                    }
                });
                return false;
            });
        });
    </script>
        </form>
</body>
</html>
