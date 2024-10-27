using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.DTOs
{
    public class GeneroCreacionDTO
    {
        [Required]
        [StringLength(50, ErrorMessage ="el campo {0} debe tener {1} caracteres o menos")]
        public required string Nombre { get; set; }

    }
}