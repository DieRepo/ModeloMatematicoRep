using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

/// <summary>
/// Descripción breve de WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]

public class WebService : System.Web.Services.WebService {

    public WebService () {

        //Elimine la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hola a todos";
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetDetails(DateTime inicio,DateTime fin,string materia)
    {
        string jsonNuevo= "";
        try
        {
            MySqlConnection conexion = new MySqlConnection(System.Configuration.ConfigurationManager.AppSettings["die"]);
            conexion.Open();

            List<Simulacion> lista = new List<Simulacion>();
            

            String consulta =
                 "SELECT p.cveJuzgado cvejuz,p.total total,h.nombre juz,p.latitud la,p.longitud lo " +
                 "FROM die_simulacion.tblpredicciones p " +
                 "inner join die_equivalencias_catalogos.homologado_tbljuzgados h on p.cveJuzgado = h.idJuzgado " +
                 "where cveJuzgado in(109, 15, 16, 99, 149, 127, 50, 127, 116, 146)" +
                 "and p.fechaPrediccion between '"+inicio+"' and '"+fin+"' and materia = '"+materia+"' ";

            MySqlCommand cmd = new MySqlCommand(consulta, conexion);
            cmd.CommandTimeout = 1800;
            MySqlDataReader r = cmd.ExecuteReader();


            while (r.Read())
            {
                Simulacion s = new Simulacion();
                s.Id = r.GetString("cvejuz");
                s.Total = r.GetString("total");
                s.Title = r.GetString("juz");
                s.Lat = r.GetString("la");
                s.Lng = r.GetString("lo");
                s.Description = "";

                lista.Add(s);
            }

             jsonNuevo = JsonConvert.SerializeObject(lista,Formatting.Indented);


            conexion.Close();
        }
        catch (Exception)
        {
            Debug.WriteLine("Error");
        }

        return jsonNuevo;
    }

}
