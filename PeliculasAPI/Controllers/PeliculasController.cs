using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;
using System.Runtime.Intrinsics.X86;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Servicios;

namespace PeliculasAPI.Controllers
{
    [Route("api/peliculas")]
    [ApiController]
    public class PeliculasController : CustomBaseControllers
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private const string cacheTag = "peliculas";
        private readonly string contenedor = "peliculas";

        public PeliculasController(ApplicationDbContext context, IMapper mapper, 
            IOutputCacheStore outputCacheStore, IAlmacenadorArchivos almacenadorArchivos) 
            : base(context, mapper, outputCacheStore, cacheTag)
        {
            this.context = context;
            this.mapper = mapper;
            this.outputCacheStore = outputCacheStore;
            this.almacenadorArchivos = almacenadorArchivos;
        }

        [HttpGet("landing")]
        [OutputCache(Tags =[cacheTag])]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var hoy = DateTime.Today;

            var proximosEstrenos = await context.Peliculas
                .Where(p=>p.FechaLanzamiento > hoy)
                .OrderBy(p=>p.FechaLanzamiento)
                .Take(top)
                .ProjectTo<PeliculaDTO>(mapper.ConfigurationProvider)
                .ToListAsync();

            var enCines = await context.Peliculas
                .Where(p=>p.PeliculasCines.Select(pc=> pc.PeliculaId).Contains(p.Id))
                .OrderBy(p => p.FechaLanzamiento )
                .Take(top)
                .ProjectTo<PeliculaDTO>(mapper.ConfigurationProvider)
                .ToListAsync();

            var resultado = new LandingPageDTO();
            resultado.Encines = enCines;
            resultado.ProximosEstrenos = proximosEstrenos;
            return resultado;




        }

        [HttpGet("{id:int}", Name = "ObtenerPeliculaPorId")]
        [OutputCache(Tags =[cacheTag])]
        public async Task<ActionResult<PeliculaDetallesDTO>> Get(int id)
        {
            var pelicula = await context.Peliculas
                .ProjectTo<PeliculaDetallesDTO>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(p => p.Id == id);

            return (pelicula is null)? NotFound() : pelicula;

        }

            


        [HttpGet("PostGet")]
        public async Task<ActionResult<PeliculasPostGetDTO>> PostGet()
        {
            var cines = await context.Cines.ProjectTo<CineDTO>(mapper.ConfigurationProvider).ToListAsync();
            var generos = await context.Generos.ProjectTo<GeneroDTO>(mapper.ConfigurationProvider).ToListAsync();

            return new PeliculasPostGetDTO
            {
                Cines = cines,
                Generos = generos
            };
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            var pelicula = mapper.Map<Pelicula>(peliculaCreacionDTO);
            if (peliculaCreacionDTO.Poster is not null)
            {
                var url = await almacenadorArchivos.Almacenar(contenedor,peliculaCreacionDTO.Poster);
                pelicula.Poster = url;
            }
            AsignarOrdenActores(pelicula);
            context.Add(pelicula);
            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag,default);
            var PeliculaDTO = mapper.Map<PeliculaDTO>(pelicula);
            return CreatedAtRoute("ObtenerPeliculaPorId", new {id = pelicula.Id}, PeliculaDTO);

        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<PeliculasPutGetDTO>> PutGet(int id)
        {
                var pelicula = await context.Peliculas
                    .ProjectTo<PeliculaDetallesDTO>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == id);
                if (pelicula is null) {return NotFound();}

                var generosSeleccionadosIds = pelicula.Generos.Select(g => g.Id).ToList();
                var generosNoSeleccionados = await context.Generos
                    .Where(g=> !generosSeleccionadosIds.Contains(g.Id))
                    .ProjectTo<GeneroDTO>(mapper.ConfigurationProvider)
                    .ToListAsync();

                var cinesSeleccionadosIds = pelicula.Cines.Select(c => c.Id).ToList();
                var cinesNoSelecionados = await context.Cines
                                    .Where(c=> !cinesSeleccionadosIds.Contains(c.Id))
                                    .ProjectTo<CineDTO>(mapper.ConfigurationProvider)
                                    .ToListAsync();

                var respuesta = new PeliculasPutGetDTO();
                respuesta.Pelicula = pelicula;
                respuesta.GenerosSeleccionados= pelicula.Generos;
                respuesta.GenerosNoSeleccionados = generosNoSeleccionados;
                respuesta.CinesSeleccionados = pelicula.Cines;
                respuesta.CineNoSeleccionados = cinesNoSelecionados;
                respuesta.Actores = pelicula.Actores;
                return respuesta;
        }


        [HttpPut("{id: int}")]
        public async Task<IActionResult> Put(int id, [FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
        {
            var pelicula = await context.Peliculas
                            .Include(p => p.PeliculasActores)
                            .Include(p=> p.PeliculasCines)
                            .Include(p=>p.PeliculasGeneros)
                            .FirstOrDefaultAsync(p=>p.Id ==id);
            if (pelicula is null)
            {
                return NotFound();
            }

            pelicula = mapper.Map(peliculaCreacionDTO, pelicula);

            if (peliculaCreacionDTO.Poster is not null)
            {
                pelicula.Poster = await almacenadorArchivos.Editar(pelicula.Poster, 
                    contenedor, peliculaCreacionDTO.Poster);
            }

            AsignarOrdenActores(pelicula);

            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return NoContent();


        }

        private void AsignarOrdenActores(Pelicula pelicula)
        {
            if (pelicula.PeliculasActores is not null)
            {
                for (int i = 0; i < pelicula.PeliculasActores.Count; i++)
                {
                    pelicula.PeliculasActores[i].Orden = i;
                }
            }
        }
    }
}