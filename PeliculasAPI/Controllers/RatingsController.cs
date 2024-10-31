using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Servicios;

namespace PeliculasAPI.Controllers
{
    [ApiController]
    [Route("api/rating")]
    public class RatingsController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IServicioUsuarios servicioUsuarios;

        public RatingsController(ApplicationDbContext context, IServicioUsuarios servicioUsuarios)
        {
            this.context = context;
            this.servicioUsuarios = servicioUsuarios;
        }    

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] RatingCreacionDTO ratingCreacionDTO){
            var UsuarioId = await servicioUsuarios.ObtenerUsuarioId();

            var ratingActual = await context.RatingsPeliculas
                .FirstOrDefaultAsync(x => x.PeliculaId == ratingCreacionDTO.PeliculaId
                && x.UsuarioId == UsuarioId);

            if (ratingActual is null)
            {
                var rating = new Rating()
                {
                    PeliculaId = ratingCreacionDTO.PeliculaId,
                    Puntuacion = ratingCreacionDTO.Puntuacion,
                    UsuarioId = UsuarioId
                };
                context.Add(rating);
            }
            else
            {
                ratingActual.Puntuacion = ratingCreacionDTO.Puntuacion;
            }

            await context.SaveChangesAsync();
            return NoContent();

        }

    }
}