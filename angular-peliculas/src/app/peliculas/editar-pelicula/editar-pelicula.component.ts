import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaDTO, PeliculasCreacionDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutocompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.scss'
})
export class EditarPeliculaComponent {
  
  @Input({transform: numberAttribute})
  id!: number;

  pelicula: PeliculaDTO= {id: 1, titulo: 'Spider-man', trailer: 'ABC', fechaLanzamiento: new Date('2018-07-25'), poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg' };

  generosSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: "Acción"}
  ];
  generosNoSeleccionados: SelectorMultipleDTO[] =[
    {llave: 1, valor: "Drama"},
    {llave: 3, valor: "Comedia"}
  ]

  cinesSeleccionados: SelectorMultipleDTO[] = [
    {llave: 2, valor: "Blue Mall"}

  ];
  cinesNoSeleccionados: SelectorMultipleDTO[] =[
    {llave: 1, valor: "Agora Mall"},
    {llave: 3, valor: "Acropolis"}
  ]

  actoresSeleccionados: actorAutocompleteDTO[]= [
    {id: 2, nombre: 'Tom Hanks', personaje: 'Forrest Gump', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg/220px-Tom_Hanks_at_the_Elvis_Premiere_2022.jpg'}
  ]

  guardarCambios(pelicula: PeliculasCreacionDTO){
    console.log('editando pelicula', pelicula);

  }

}
