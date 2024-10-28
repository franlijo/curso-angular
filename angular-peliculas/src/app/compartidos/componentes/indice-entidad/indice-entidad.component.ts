import { Component, Input } from '@angular/core';
import { PaginacionDTO } from '../../modelos/PaginacionDTO';

@Component({
  selector: 'app-indice-entidad',
  standalone: true,
  imports: [],
  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.scss'
})
export class IndiceEntidadComponent<TDTO> {
  @Input({required: true})
  titulo!:string;

  @Input({required: true})
  rutaCrear!:string;

  @Input({required: true})
  rutaEditar!:string;

  @Input()
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  
  paginacion: PaginacionDTO = {pagina: 1, recordsPorPagina: 5};
  entidades!: TDTO[];

  cargarRegistros(){
    this.generosService.obtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<GeneroDTO[]>)=> {
      this.generos = respuesta.body as GeneroDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera,10);

    })
  }

}
