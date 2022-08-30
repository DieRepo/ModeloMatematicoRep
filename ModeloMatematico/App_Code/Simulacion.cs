using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Simulacion
/// </summary>
public class Simulacion
{
    public Simulacion()
    {
        
    }

    private string id;
    private string total;
    private string title;
    private string lat;
    private string lng;
    private string description;

    public string Id { get => id; set => id = value; }
    public string Total { get => total; set => total = value; }
    public string Title { get => title; set => title = value; }
    public string Lat { get => lat; set => lat = value; }
    public string Lng { get => lng; set => lng = value; }
    public string Description { get => description; set => description = value; }
}