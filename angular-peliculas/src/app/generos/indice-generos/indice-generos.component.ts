import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { environment } from '../../../environments/environment.development';
import { GeneroDTO } from '../generos';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2LoaderService, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.scss'
})
export class IndiceGenerosComponent {
  generosService = inject(GenerosService)
  generos!: GeneroDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones']
  
  cantidadTotalRegistros!:number;

  constructor() {
    this.cargarRegistros();
    
  }


  
  actualizarPaginacion(datos: PageEvent){
    this.paginacion= {pagina: datos.pageIndex +1, recordsPorPagina: datos.pageSize};
    this.cargarRegistros();
  }

  borrar(id: number){
    this.generosService.borrar(id)
      .subscribe(() => {
        this.paginacion.pagina= 1;
        this.cargarRegistros();
      })
  }

}
