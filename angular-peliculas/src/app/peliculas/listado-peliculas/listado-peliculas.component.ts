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

  AgregarPelicula(){
    this.peliculas.push({
      titulo: 'Inception', 
      fechaLanzamiento: new Date('2012-07-03'),
      precio: 500
    })
  }
  remover (pelicula: any){
    const indice = this.peliculas.findIndex((peliculaActual:any) => peliculaActual.titulo === pelicula.titulo);
    this.peliculas.splice(indice,1);
  }
}


