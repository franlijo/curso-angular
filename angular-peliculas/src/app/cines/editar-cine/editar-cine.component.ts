import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { CineCreacionDTO, CineDTO } from '../cines';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CinesService } from '../cines.service';
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [FormularioCinesComponent, EditarEntidadComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.scss', 
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: CinesService}
  ]
})
export class EditarCineComponent {

  @Input({transform: numberAttribute})
  id!: number;

  formularioCines = FormularioCinesComponent;
  
  

}
