using System.Linq.Expressions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Utilidades;

namespace PeliculasAPI.Controllers
{
    public class CustomBaseControllers: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly string cacheTag;

        public CustomBaseControllers(ApplicationDbContext context, IMapper mapper, IOutputCacheStore outputCacheStore, 
            string cacheTag)
        {
            this.context = context;
            this.mapper = mapper;
            this.outputCacheStore = outputCacheStore;
            this.cacheTag = cacheTag;
        }

        protected async Task<List<TDTO>> Get<TEntidad, TDTO>(PaginacionDTO paginacion, 
            Expression<Func<TEntidad, object>> ordenarPor)
            where TEntidad : class
        {
            var queryable = context.Set<TEntidad>().AsQueryable();
          await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
          return await queryable
               .OrderBy(ordenarPor)
               .Paginar(paginacion)
               .ProjectTo<TDTO>(mapper.ConfigurationProvider).ToListAsync();


        }

        protected async Task<ActionResult<TDTO>> Get <TEntidad, TDTO>(int id)
            where TEntidad : class, IId
            where TDTO: IId
        {
            var entidad = await context.Set<TEntidad>()
                .ProjectTo<TDTO>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (entidad is null)
            {
                return NotFound();
            }
            return entidad;
        }

    }
}