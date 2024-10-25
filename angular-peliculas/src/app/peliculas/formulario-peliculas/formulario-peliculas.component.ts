import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { PeliculaDTO, PeliculasCreacionDTO } from '../peliculas';
import moment from 'moment';
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { SelectorMultipleComponent } from "../../compartidos/componentes/selector-multiple/selector-multiple.component";
import { AutocompleteActoresComponent } from "../../actores/autocomplete-actores/autocomplete-actores.component";
import { actorAutocompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-formulario-peliculas',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatDatepickerModule, InputImgComponent, SelectorMultipleComponent, AutocompleteActoresComponent],
  templateUrl: './formulario-peliculas.component.html',
  styleUrl: './formulario-peliculas.component.scss'
})
export class FormularioPeliculasComponent implements OnInit {
  ngOnInit(): void {
    if (this.modelo !== undefined)
      this.form.patchValue(this.modelo);
    
  }

  @Input({required:true})
  generosNoSeleccionados!: SelectorMultipleDTO[];

  @Input({required:true})
  generosSeleccionados!: SelectorMultipleDTO[];


  @Input({required:true})
  cinesNoSeleccionados!: SelectorMultipleDTO[];

  @Input({required:true})
  cinesSeleccionados!: SelectorMultipleDTO[];

  @Input({required: true})
  actoresSeleccionados!:actorAutocompleteDTO[];

  @Input()
  modelo?: PeliculaDTO;

  @Output()
  posteoFormulario = new EventEmitter<PeliculasCreacionDTO>();

  private formBuider = inject(FormBuilder);
  form = this.formBuider.group ({
    titulo:['',{validators: [Validators.required]}],
    fechaLanzamiento: new FormControl<Date | null>(null, {validators: [Validators.required]}),
    trailer: '',
    poster: new FormControl<File | string | null>(null)
  });

  archivoSeleccionado(file: File){
    this.form.controls.poster.setValue(file);

  }

  guardarCambios(){
    if (!this.form.valid){
      return;
    }

    const pelicula = this.form.value as PeliculasCreacionDTO;

    pelicula.fechaLanzamiento = moment(pelicula.fechaLanzamiento).toDate();

    const generosIds = this.generosSeleccionados.map(val => val.llave);
    
    pelicula.generosIds=generosIds;

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    pelicula.cinesIds=cinesIds;

    pelicula.actores= this.actoresSeleccionados;

    this.posteoFormulario.emit(pelicula);
  }

    obtenerErrorCampoTitulo(): string {
      let campo = this.form.controls.titulo;

      if (campo.hasError('required')){
        return 'el campo Título es requerido';
      }

      return '';
    }
  
    obtenerErrorCampoFechaLanzamiento(): string {
      let campo = this.form.controls.fechaLanzamiento;

      if (campo.hasError('required')){
        return 'el campo fecha lanzamiento es requerido';
      }

      return '';
    }
    
}
