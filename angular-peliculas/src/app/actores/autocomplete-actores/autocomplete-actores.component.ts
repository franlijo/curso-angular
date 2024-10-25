import { Component, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { actorAutocompleteDTO } from '../actores';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-autocomplete-actores',
  standalone: true,
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule, DragDropModule],
  templateUrl: './autocomplete-actores.component.html',
  styleUrl: './autocomplete-actores.component.scss'
})
export class AutocompleteActoresComponent {
  control= new FormControl

  actores: actorAutocompleteDTO[]=[
    {id: 1, nombre: 'Tom Hollad', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tom_Holland_Bali_2019_1_%28cropped%29_%28cropped%29.jpg/220px-Tom_Holland_Bali_2019_1_%28cropped%29_%28cropped%29.jpg'},
    {id: 2, nombre: 'Tom Hanks', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg/220px-Tom_Hanks_at_the_Elvis_Premiere_2022.jpg'},
    {id: 3, nombre: 'Samuel L. Jackson', personaje: '', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/250px-SamuelLJackson.jpg'}
   ]

   actoresSeleccionados: actorAutocompleteDTO[] = [];


   columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones']; 

   @ViewChild(MatTable) table!: MatTable<actorAutocompleteDTO>;

   actorSeleccionado(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if (this.table!=undefined){
      this.table.renderRows();
    }

}

finalizarArrastre(event: CdkDragDrop<any>){
  const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);
  moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
  this.table.renderRows();

}

eliminar(actor: actorAutocompleteDTO){
  const indice = this.actoresSeleccionados.findIndex((a: actorAutocompleteDTO)=> a.id === actor.id);
  this.actoresSeleccionados.splice(indice,1);
  this.table.renderRows();


}
}