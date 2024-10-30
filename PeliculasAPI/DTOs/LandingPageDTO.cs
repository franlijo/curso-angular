namespace PeliculasAPI.DTOs
{
    public class LandingPageDTO
    {
        public List<PeliculaDTO> Encines { get; set; } = new List<PeliculaDTO>();
        public List<PeliculaDTO> ProximosEstrenos { get; set; } = new List<PeliculaDTO>();
        
        
    }
}