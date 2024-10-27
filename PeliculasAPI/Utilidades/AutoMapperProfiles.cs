using AutoMapper;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;

namespace PeliculasAPI.Utilidades
{
    public class AutoMapperProfiles: Profile
    {
        
    }
    private void ConfigurarMapeoGeneros()
    {
        CreateMap<GeneroCreacionDTO, Genero>();
    }
}