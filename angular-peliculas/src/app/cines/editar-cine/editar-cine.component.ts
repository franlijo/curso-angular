import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { CineCreacionDTO, CineDTO } from '../cines';

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.scss'
})
export class EditarCineComponent {

  @Input({transform: numberAttribute})
  id!: number;
  
  cine: CineDTO = {id: 1, nombre: 'Acrópolis', latitud: 43.373564097139806, longitud: -8.425027258608846};
   

  guardarCambios(cine: CineCreacionDTO){
    console.log('editar cine', cine);
  }

}
