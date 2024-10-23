import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-indice-cine',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './indice-cine.component.html',
  styleUrl: './indice-cine.component.scss'
})
export class IndiceCineComponent {

}
