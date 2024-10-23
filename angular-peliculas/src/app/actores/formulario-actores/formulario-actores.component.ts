import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ActorCreacionDTO } from '../actores';

@Component({
  selector: 'app-formulario-actores',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.scss'
})
export class FormularioActoresComponent {
  private formBuilder = inject(FormBuilder);

  @Output()
  posteoFormulario = new EventEmitter<ActorCreacionDTO>()

  form = this.formBuilder.group({
    nombre: ['', {
      validators: [Validators.required]
    }], 
    fechaNacimiento: new FormControl<Date | null>(null)
  })
  guardarCambios(){
    if (!this.form.valid){
      return;
    }
    const actor = this.form.value as ActorCreacionDTO;
    this.posteoFormulario.emit(actor);
  }

}
