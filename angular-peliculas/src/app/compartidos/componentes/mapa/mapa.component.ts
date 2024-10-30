import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, MarkerOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Coordenada } from './coordenada';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements OnInit{

  ngOnInit(): void {
    this.capas= this.coordenadasIniciales.map(valor => {
      const marcador = marker([valor.latitud,valor.longitud], this.markerOptions);
      if (valor.texto){
        marcador.bindPopup(valor.texto, {autoClose:false, autoPan: false});

      }

      return marcador; 
    })
  }

  @Input()
  soloLectura = false; 

  @Input()
  coordenadasIniciales: Coordenada[] = [];

  @Output()
  coordenadaSeleccionada = new EventEmitter<Coordenada>();

  markerOptions: MarkerOptions = {
    icon: icon ({
      iconSize: [25,41]      ,
      iconAnchor: [13,41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadows.png'
    })
  }
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13 ,
    center: latLng(43.341485489997446, -8.411473966369075)
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent){

    if (this.soloLectura){
      return;
    }

    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;

    this.capas =[];
    this.capas.push(marker([latitud, longitud], this.markerOptions ));
    this.coordenadaSeleccionada.emit({latitud,longitud})
    
  }

}
