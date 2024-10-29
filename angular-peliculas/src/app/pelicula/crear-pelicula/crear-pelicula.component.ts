import { Component, inject } from '@angular/core';
import { PeliculasCreacionDTO } from '../../peliculas/peliculas';
import { FormularioPeliculasComponent } from '../../peliculas/formulario-peliculas/formulario-peliculas.component';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutocompleteDTO } from '../../actores/actores';
import { PeliculasService } from '../../peliculas/peliculas.service';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent, MostrarErroresComponent, CargandoComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.scss',
})
export class CrearPeliculaComponent {
  generosSeleccionados: SelectorMultipleDTO[] = [];
  generosNoSeleccionados: SelectorMultipleDTO[] = [];
  cinesSeleccionados: SelectorMultipleDTO[] = [];
  cinesNoSeleccionados: SelectorMultipleDTO[] = [];
  actoresSeleccionados: actorAutocompleteDTO[] = [];
  peliculasService = inject(PeliculasService);
  router = inject(Router);
  errores: string[] = [];

  constructor()
  {
    this.peliculasService.crearGet().subscribe(modelo => {
      this.generosNoSeleccionados = modelo.generos.map(genero => {
        return <SelectorMultipleDTO>{llave: genero.id, valor: genero.nombre};
      })

      this.generosNoSeleccionados = modelo.cines.map(cine => {
        return <SelectorMultipleDTO>{llave: cine.id, valor: cine.nombre};
      })


    });

  }

  guardarCambios(pelicula: PeliculasCreacionDTO) {
    this.peliculasService.crear(pelicula).subscribe({
      next: (pelicula) => {
        console.log(pelicula);
        this.router.navigate(['/']);

      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }

    })
  }
}
