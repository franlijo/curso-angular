import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { environment } from '../../../environments/environment.development';
import { GeneroDTO } from '../generos';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.scss'
})
export class IndiceGenerosComponent {
  generoService = inject(GenerosService)
  generos!: GeneroDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones']

  constructor() {
    this.generoService.obtenerTodos().subscribe(generos=> {
      this.generos = generos;
    })
    
  }

}
