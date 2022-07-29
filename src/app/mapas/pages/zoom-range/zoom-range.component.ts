import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row {
      width: 400px;
      background-color: white;
      position: fixed;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      z-index: 999;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [ number, number ] = [ -75.921029433568, 45.28719674822362 ];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', () => {
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    })

    this.mapa.on('zoomend', () => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }
      
    })

    // Movimiento del mapa
    this.mapa.on('move', ( event ) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    })

  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ) {
    this.mapa.zoomTo( Number( valor ) );
  }

}
