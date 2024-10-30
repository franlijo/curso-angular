import { actorAutocompleteDTO } from "../actores/actores";
import { CineDTO } from "../cines/cines";
import { GeneroDTO } from "../generos/generos";

export interface PeliculaDTO {
    id:number;
    titulo: string;
    fechaLanzamiento: Date;
    trailer: string; 
    poster?: string;
}

export interface PeliculasCreacionDTO{
    titulo: string;
    fechaLanzamiento: Date;
    trailer: string; 
    poster?: File;
    generosIds?: number[];
    cinesIds?: number[];
    actores?: actorAutocompleteDTO[];
}

export interface PeliculasPostGetDTO {
    generos: GeneroDTO[];
    cines: CineDTO[];
}

export interface LandingPageDTO {
    enCines: PeliculaDTO[];
    proximosEstrenos: PeliculaDTO[];
}

export interface PeliculasPutGetDTO {
    pelicula: PeliculaDTO;
    generosSeleccionados: GeneroDTO[];
    generosNoSeleccionados: GeneroDTO[];
    cinesSeleccionados: CineDTO[];
    cinesNoSeleccionados: CineDTO[];
    actores: actorAutocompleteDTO[];

}