namespace PaginaAtletismo_Backend.Models
{
    public class Torneo
    {
        public int IdTorneo{ get; set; }
        public string Name { get; set; }
        public DateTime FechaTorneo { get; set; }
        public String Lugar { get; set; }
        public String ResultadosUrl { get; set; }
        public DateTime FechaInicioInscripcion {  get; set; }
        public DateTime FechaFinInscripcion { get; set; }
        public int CantidadCarriles {  get; set; }
        public List<String> Pruebas { get; set; }


    }
}
