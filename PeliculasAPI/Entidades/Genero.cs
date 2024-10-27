using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Genero
    {
        public int Id {get;set;}
        [Required]
        [StringLength(50, ErrorMessage ="el campo {0} debe tener {1} caracteres o menos")]
        public required string Nombre { get; set; }
        
    }
}