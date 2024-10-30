namespace PeliculasAPI.DTOs
{
    public class PeliculaDetallesDTO: PeliculaDTO
    {
        public List<GeneroDTO> Generos {set;get;} = new List<GeneroDTO>();
        public List<CineDTO> Cines {set;get;} = new List<CineDTO>();
        public List<PeliculaActorDTO> Actores {set;get;} = new List<PeliculaActorDTO>();
        
    }
}