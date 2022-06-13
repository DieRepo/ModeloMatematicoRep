<%@ Page Language="VB" AutoEventWireup="false" CodeFile="mapa.aspx.vb" Inherits="modulos_mapa_mapa" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../../Content/bootstrap.css" rel="stylesheet" />
    <link href="../css/mapa.css" rel="stylesheet" />
    <title></title>
    <style>

#map {
  height: 100%;
}

/* 
 * Optional: Makes the sample page fill the window. 
    * Prueba de Abisai para subir cambios 
    Prueba Abisai Meza 
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
    </form>
    <div id="map"> </div>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzBQYIkq1-4sG-FWP5vgTVE2LMagnWkfo&libraries=geometry"></script>
    <script src="../../Scripts/jquery-3.6.0.min.js"></script>
    <script src="../../Scripts/bootstrap.js"></script>
    <script src="../js/mapa.js"></script>
</body>
</html>
