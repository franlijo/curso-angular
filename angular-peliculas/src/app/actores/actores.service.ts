import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorCreacionDTO, ActorDTO } from './actores';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor() { }
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/actores';

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, {params:queryParams, observe: 'response'});
  }

  public obtenerPorId(id:number): Observable<ActorDTO>
  {
    return this.http.get<ActorDTO>(`${this.urlBase}/${id})`);
  }

  public actualizar(id:number, actor: ActorCreacionDTO){
    const formData = this.construirFormData(actor);
    return this.http.put(`${this.urlBase}/${id})`, formData);
  }

  public crear(actor: ActorCreacionDTO){
    const formData = this.construirFormData(actor);
    return this.http.post(this.urlBase, formData);
  }

  public borrar (id:number){
    return this.http.delete(`${this.urlBase}/${id})`);
  }

  public construirFormData (actor: ActorCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', actor.nombre);

    // 2024-01-25T15:18:200
    formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]);
    
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }

    return formData;

  }

}
