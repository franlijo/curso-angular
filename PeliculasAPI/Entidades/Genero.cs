using System.ComponentModel.DataAnnotations;
using PeliculasAPI.Validaciones;

namespace PeliculasAPI.Entidades
{
    public class Genero: IId
    {
        public int Id {get;set;}
        [Required]
        [StringLength(50, ErrorMessage ="el campo {0} debe tener {1} caracteres o menos")]
        [PrimeraLetraMayuscula]
        public required string Nombre { get; set; }
        
    }
}