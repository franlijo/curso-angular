import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormularioGeneroComponent, MostrarErroresComponent, CrearEntidadComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.scss',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: GenerosService}
  ]
})
export class CrearGenerosComponent {
  formularioGeneros = FormularioGeneroComponent; 

 



}
