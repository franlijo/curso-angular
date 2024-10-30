namespace PeliculasAPI.DTOs
{
    public class PeliculasPutGetDTO
    {
        public PeliculaDTO Pelicula {set; get; } = null!;
        public List<GeneroDTO> GenerosSeleccionados {set;get;} = new List<GeneroDTO>();
        public List<GeneroDTO> GenerosNoSeleccionados {set;get;} = new List<GeneroDTO>();
        public List<CineDTO> CinesSeleccionados {set;get;} = new List<CineDTO>();
        public List<CineDTO> CineNoSeleccionados {set;get;} = new List<CineDTO>();
        public List<PeliculaActorDTO> Actores {set;get;} = new List<PeliculaActorDTO>();

    }
}