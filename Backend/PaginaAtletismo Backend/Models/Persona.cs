namespace PaginaAtletismo_Backend.Models
{
    public class Persona
    {
        public int IdPersona { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Dni {  get; set; }
        public string Direccion {get; set; }  
        public string Localidad { get; set; }  
        public string rol {  get; set; } 

    }
}
