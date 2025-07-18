import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDataService } from '../servicios/hotel-data'; // ✅ correcto


@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  habitaciones: any[] = [];
  autos: any[] = [];
  restaurantes: any[] = [];

  habitacionSeleccionada: any = null;

  constructor(private hotelData: HotelDataService) {}

  ngOnInit(): void {
    this.habitaciones = this.hotelData.habitaciones;
    this.autos = this.hotelData.autos;
    this.restaurantes = this.hotelData.restaurantes;
  }

  abrirFormulario(habitacion: any) {
    this.habitacionSeleccionada = habitacion;
  }

  cerrarFormulario() {
    this.habitacionSeleccionada = null;
  }
}
