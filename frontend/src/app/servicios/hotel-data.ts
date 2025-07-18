import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelDataService {
  habitaciones = [
    {
      nombre: 'Habitación Deluxe',
      descripcion: 'Cama king size, vista al mar, jacuzzi privado, aire acondicionado, Wi-Fi gratis',
      precio: 120,
      imagenes: ['assets/habitaciones/deluxe1.png']
    },
    {
      nombre: 'Habitación Standard',
      descripcion: 'Cama queen size, vista jardín, aire acondicionado, Wi-Fi gratis',
      precio: 80,
      imagenes: ['assets/habitaciones/standard1.png']
    },
    {
      nombre: 'Suite Familiar',
      descripcion: 'Dos camas matrimoniales, baño amplio, cocina pequeña, balcón privado, TV por cable',
      precio: 170,
      imagenes: ['assets/habitaciones/suitefamiliar1.png']
    },
    {
      nombre: 'Bungalow Playa',
      descripcion: 'Cabaña independiente frente al mar, terraza privada, hamaca, acceso directo a la playa',
      precio: 250,
      imagenes: ['assets/habitaciones/bungalow1.png']
    }
  ];

  autos = [
    {
      marca: 'Miles',
      modelo: 'Sedán Clásico',
      descripcion: 'Aire acondicionado, 5 pasajeros, maletero grande.',
      imagen: 'assets/habitaciones/autos/sedan.png',
      precio: 39
    },
    {
      marca: 'Miles',
      modelo: 'SUV Chevrolet Trax 2014',
      descripcion: 'Ideal para familias y aventuras, 7 pasajeros, GPS incluido.',
      imagen: 'assets/habitaciones/autos/suv.png',
      precio: 59
    },
    {
      marca: 'Miles',
      modelo: 'Económico',
      descripcion: 'Eficiencia de combustible, fácil de estacionar.',
      imagen: 'assets/habitaciones/autos/economico.png',
      precio: 28
    }
  ];

  restaurantes = [
    {
      nombre: 'Sabores del Mar',
      descripcion: 'Especialidad en mariscos frescos y cocina internacional.',
      horario: '6:30am – 10:30pm',
      imagenes: ['assets/habitaciones/restaurantes/sabores1.png'],
      menuPdf: 'assets/habitaciones/restaurantes/menus/sabores.pdf'
    },
    {
      nombre: 'Café Paraíso',
      descripcion: 'Cafetería gourmet y repostería artesanal.',
      horario: '7am – 9pm',
      imagenes: ['assets/habitaciones/restaurantes/cafeparaiso1.png'],
      menuPdf: 'assets/habitaciones/restaurantes/menus/cafeparaiso.pdf'
    },
    {
      nombre: 'Pool Bar Oasis',
      descripcion: 'Cócteles, snacks y ambiente junto a la piscina.',
      horario: '10am – 8pm',
      imagenes: ['assets/habitaciones/restaurantes/poolbar1.png'],
      menuPdf: 'assets/habitaciones/restaurantes/menus/poolbar.pdf'
    }
  ];
}
