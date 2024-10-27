using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;

namespace PeliculasAPI.Controllers
{
    [Route("api/generos")]
    [ApiController]
    public class GenerosController: ControllerBase
    {
        private readonly IOutputCacheStore outputCacheStore;
        private readonly AplicationDbContext context;
        private readonly IMapper mapper;
        private const string cacheTag = "generos";
    public GenerosController ( IOutputCacheStore outputCacheStore, AplicationDbContext context,
     IMapper mapper ){
        this.outputCacheStore = outputCacheStore;
            this.context = context;
            this.mapper = mapper;
        }

       [HttpGet] //api/generos
       [OutputCache(Tags =[cacheTag])]
       public List<GeneroDTO> Get()
       {
            return new List<GeneroDTO>() {new GeneroDTO {Id=1, Nombre="Comedia"},
                new GeneroDTO {Id=2, Nombre="Accion"}};
       }

       [HttpGet("{id:int}", Name = "ObtenerGeneroPorId")]  //api/generos/500
       [OutputCache(Tags =[cacheTag])]
       public async Task<ActionResult<GeneroDTO>> Get(int id)
       {
            throw new NotImplementedException();
       }

       [HttpPost]
       public async Task<IActionResult> Post([FromBody] GeneroCreacionDTO generoCreacionDTO)
       {  
          var genero = mapper.Map<Genero>(generoCreacionDTO);
            context.Add(genero);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerGeneroPorId", new {id = genero.Id}, genero);

       }

       [HttpPut]
       public void Put()
       {
            throw new NotImplementedException();

       }

       [HttpDelete]
       public void Delete()
       {
            throw new NotImplementedException();

       }

    }
}