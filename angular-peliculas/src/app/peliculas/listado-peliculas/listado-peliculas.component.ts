import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listado-peliculas',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, ListadoGenericoComponent, MatButtonModule, MatIconModule],
  templateUrl: './listado-peliculas.component.html',
  styleUrl: './listado-peliculas.component.scss'
})
export class ListadoPeliculasComponent implements OnInit {
  ngOnInit(): void {
    
  }
  @Input({required: true})
  peliculas! : any[];

  
}


