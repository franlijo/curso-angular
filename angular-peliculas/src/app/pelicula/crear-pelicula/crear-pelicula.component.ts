import { Component } from '@angular/core';
import { PeliculasCreacionDTO } from '../../peliculas/peliculas';
import { FormularioPeliculasComponent } from "../../peliculas/formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutocompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.scss'
})
export class CrearPeliculaComponent {



  generosSeleccionados: SelectorMultipleDTO[] = [];
  generosNoSeleccionados: SelectorMultipleDTO[] =[
    {llave: 1, valor: "Drama"},
    {llave: 2, valor: "Acción"},
    {llave: 3, valor: "Comedia"}
  ]

  cinesSeleccionados: SelectorMultipleDTO[] = [];
  cinesNoSeleccionados: SelectorMultipleDTO[] =[
    {llave: 1, valor: "Agora Mall"},
    {llave: 2, valor: "Blue Mall"},
    {llave: 3, valor: "Acropolis"}
  ]

  actoresSeleccionados: actorAutocompleteDTO[] = [];

  guardarCambios(pelicula: PeliculasCreacionDTO){
    console.log('Creando pelicula', pelicula);
  }

}
