import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GeneroCreacionDTO, GeneroDTO } from '../generos';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { IndiceGenerosComponent } from "../indice-generos/indice-generos.component";

@Component({
  selector: 'app-formulario-genero',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, ListadoGenericoComponent, IndiceGenerosComponent],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.scss'
})
export class FormularioGeneroComponent implements OnInit{
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }
  @Input()
  modelo?: GeneroDTO;


  @Output()
  posteoFormulario = new EventEmitter<GeneroCreacionDTO>();

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    nombre: ['', {validators: [Validators.required, primeraLetraMayuscula(), Validators.maxLength(50)]}]

  })

  obtenerErrorCampoNombre(): string{
    let nombre = this.form.controls.nombre;
    if (nombre.hasError('required')){
      return "El campo nombre es requerido";
    }

    if (nombre.hasError('maxlength')){
      return `El campo nombre no puede tener más de ${nombre.getError('maxlength').requiredLength} caracteres`;
    }

    if (nombre.hasError('primeraLetraMayuscula')){
      return nombre.getError('primeraLetraMayuscula').mensaje
    }
    return "";
  }

  guardarCambios(){

    if (!this.form.valid){
      return;
    }

    const genero = this.form.value as GeneroCreacionDTO;
    this.posteoFormulario.emit(genero);

  }

}
