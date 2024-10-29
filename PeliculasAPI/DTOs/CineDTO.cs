using PeliculasAPI.Entidades;

namespace PeliculasAPI.DTOs
{
    public class CineDTO: IId
    {
        public int Id {get; set;}
        public required string Nombre {get; set;}
        public double Latiud {get; set;}
        public double Longitud {get; set;}

    }
}