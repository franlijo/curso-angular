import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.scss'
})
export class IndiceGenerosComponent {
  generoService = inject(GenerosService)

  constructor() {
    this.generoService.obtenerTodos().subscribe(generos=> {
      console.log(generos);
    })
    
  }

}
