import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatIcon, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {
  ngOnInit(): void {
    this.maximoRatingArreglo = Array(this.maximoRating).fill(0);
  }
  @Input({required:true})
  maximoRating! : number;

  @Input()
  ratingSeleccionado = 0; 

  maximoRatingArreglo: any[] = []

  manejarMouseEnter(indice:number){
    this.ratingSeleccionado = indice + 1;
  }

  manejarMouseLeave(){
    this.ratingSeleccionado = 0;
  }

}
