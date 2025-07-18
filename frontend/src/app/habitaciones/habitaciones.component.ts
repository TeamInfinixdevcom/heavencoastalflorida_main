import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent {
  // ======= ARRAY DE HABITACIONES =======
  habitaciones = [
    {
      nombre: 'Habitación Deluxe',
      descripcion: 'Cama king size, vista al mar, jacuzzi privado, aire acondicionado, Wi-Fi gratis',
      precio: 120,
      imagenes: [
        'assets/habitaciones/deluxe1.png',
        'assets/habitaciones/deluxe2.png'
      ]
    },
    {
      nombre: 'Habitación Standard',
      descripcion: 'Cama queen size, vista jardín, aire acondicionado, Wi-Fi gratis',
      precio: 80,
      imagenes: [
        'assets/habitaciones/standard1.png',
        'assets/habitaciones/standard2.png'
      ]
    },
    {
      nombre: 'Suite Familiar',
      descripcion: 'Dos camas matrimoniales, baño amplio, cocina pequeña, balcón privado, TV por cable',
      precio: 170,
      imagenes: [
        'assets/habitaciones/suitefamiliar1.png',
        'assets/habitaciones/suitefamiliar2.png'
      ]
    },
    {
      nombre: 'Habitación Individual',
      descripcion: 'Cama individual, ideal para viajeros solitarios, baño privado, Wi-Fi gratis',
      precio: 60,
      imagenes: [
        'assets/habitaciones/individual1.png',
        'assets/habitaciones/individual2.png'
      ]
    },
    {
      nombre: 'Suite Nupcial',
      descripcion: 'Cama king size, decoración especial para parejas, jacuzzi, botella de vino de cortesía',
      precio: 200,
      imagenes: [
        'assets/habitaciones/nupcial1.png',
        'assets/habitaciones/nupcial2.png'
      ]
    },
    {
      nombre: 'Bungalow Playa',
      descripcion: 'Cabaña independiente frente al mar, terraza privada, hamaca, acceso directo a la playa',
      precio: 250,
      imagenes: [
        'assets/habitaciones/bungalow1.png',
        'assets/habitaciones/bungalow2.png'
      ]
    }
  ];

  // ======= BARRA DE RESERVAS =======
  mostrarModal: boolean = false;

  enviarFormReserva(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch('https://formspree.io/f/mgvyprgp', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('¡Reserva enviada! Pronto recibirá confirmación.');
          form.reset();
        } else {
          alert('Hubo un error al enviar la reserva. Inténtelo de nuevo.');
        }
      })
      .catch(() => {
        alert('No se pudo enviar la reserva. Por favor, revise su conexión.');
      });

    this.mostrarModal = false; // Cierra el modal si estaba abierto
  }

  // ======= MODAL DE HABITACIÓN Y CARRUSEL =======
  selectedHabitacion: any = null;
  selectedImagenIndex: number = 0;

  abrirModal(habitacion: any) {
    this.selectedHabitacion = habitacion;
    this.selectedImagenIndex = 0;
  }

  cerrarModal() {
    this.selectedHabitacion = null;
    this.selectedImagenIndex = 0;
  }

  siguienteImagen() {
    if (!this.selectedHabitacion) return;
    this.selectedImagenIndex = (this.selectedImagenIndex + 1) % this.selectedHabitacion.imagenes.length;
  }

  anteriorImagen() {
    if (!this.selectedHabitacion) return;
    this.selectedImagenIndex =
      (this.selectedImagenIndex - 1 + this.selectedHabitacion.imagenes.length) %
      this.selectedHabitacion.imagenes.length;
  }

  // ======= MODAL DE PROMOCIONES =======
  promoSeleccionada: any = null;

  abrirPromoModal(promo: any) {
    this.promoSeleccionada = promo;
  }

  cerrarPromoModal() {
    this.promoSeleccionada = null;
  }

  // ======= ARRAY DE PROMOCIONES =======
  promociones = [
    {
      nombre: 'Paquete Romántico',
      descripcion: 'Incluye cena privada, decoración especial y late check-out.',
      imagen: 'assets/habitaciones/promos/romantico.png',
      vigencia: 'Solo julio y agosto'
    },
    {
      nombre: 'Semana Familiar',
      descripcion: 'Niños gratis, desayuno incluido y acceso a todas las actividades.',
      imagen: 'assets/habitaciones/promos/familiar.png',
      vigencia: 'Hasta 30 de septiembre'
    },
    {
      nombre: 'Descuento Verano',
      descripcion: '20% de descuento en todas las habitaciones reservando aquí.',
      imagen: 'assets/habitaciones/promos/descuento.png',
      vigencia: 'Hasta agotar existencias'
    }
  ];

  // ======= AUTOS EN ALQUILER Y MODAL DE AUTO =======
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

  autoSeleccionado: any = null;

  abrirModalAuto(auto: any) {
    this.autoSeleccionado = auto;
  }

  cerrarModalAuto() {
    this.autoSeleccionado = null;
  }

  // ======= RESTAURANTES Y MODAL CON CARRUSEL =======
  restaurantes = [
    {
      nombre: 'Sabores del Mar',
      descripcion: 'Especialidad en mariscos frescos y cocina internacional.',
      descripcionLarga: 'Un ambiente elegante con vista al océano, platillos gourmet de mariscos, vinos seleccionados y un menú internacional variado.',
      horario: '6:30am – 10:30pm',
      
      imagenes: [
        'assets/habitaciones/restaurantes/sabores1.png',
        'assets/habitaciones/restaurantes/sabores2.png',
        'assets/habitaciones/restaurantes/sabores3.png'
      ],
        menuPdf: 'assets/habitaciones/restaurantes/menus/sabores.pdf'
    },
    {
      nombre: 'Café Paraíso',
      descripcion: 'Cafetería gourmet y repostería artesanal.',
      descripcionLarga: 'Un rincón acogedor para disfrutar café de especialidad, pastelería y brunchs durante todo el día.',
      horario: '7am – 9pm',
      imagenes: [
        'assets/habitaciones/restaurantes/cafeparaiso1.png',
       'assets/habitaciones/restaurantes/cafeparaiso2.png',
       'assets/habitaciones/restaurantes/cafeparaiso3.png'
      ],
        menuPdf: 'assets/habitaciones/restaurantes/menus/cafeparaiso.pdf'
    },
    {
      nombre: 'Pool Bar Oasis',
      descripcion: 'Cócteles, snacks y ambiente junto a la piscina.',
      descripcionLarga: 'Ideal para relajarse al sol, disfrutar coctelería creativa y snacks frescos con música chill.',
      horario: '10am – 8pm',
      imagenes: [
        'assets/habitaciones/restaurantes/poolbar1.png',
        'assets/habitaciones/restaurantes/poolbar2.png',
        'assets/habitaciones/restaurantes/poolbar3.png',
         ],
        menuPdf: 'assets/habitaciones/restaurantes/menus/poolbar.pdf'
    },
{
  nombre: 'Mundo Kids',
  descripcion: 'Restaurante temático para niños con menú divertido y saludable.',
  descripcionLarga: 'Un espacio colorido y seguro diseñado para los más pequeños, con platillos pensados para niños, opciones saludables, juegos interactivos y actividades creativas supervisadas por personal especializado.',
  horario: '11:00am – 8:00pm',
  imagenes: [
    'assets/habitaciones/restaurantes/kids1.png',
    'assets/habitaciones/restaurantes/kids2.png',
    'assets/habitaciones/restaurantes/kids3.png'
  ],
  menuPdf: 'assets/habitaciones/restaurantes/menus/mundokids.pdf'
},

{
  nombre: 'Hanami Sushi',
  descripcion: 'Auténtica experiencia japonesa y sushi de primera calidad.',
  descripcionLarga: 'Ambiente sofisticado con detalles orientales, mesas tradicionales y barra de sushi en vivo. Disfrute de sushi fresco, ramen, tempura y una cuidada selección de sake y tés japoneses.',
  horario: '12:00md – 11:00pm',
  imagenes: [
    'assets/habitaciones/restaurantes/hanami1.png',
    'assets/habitaciones/restaurantes/hanami2.png',
    'assets/habitaciones/restaurantes/hanami3.png'
  ],
  menuPdf: 'assets/habitaciones/restaurantes/menus/hanami.pdf'
},

  ];

  restauranteSeleccionado: any = null;
  restauranteImagenIndex: number = 0;

  abrirModalRestaurante(rest: any) {
    this.restauranteSeleccionado = rest;
    this.restauranteImagenIndex = 0;
  }

  cerrarModalRestaurante() {
    this.restauranteSeleccionado = null;
    this.restauranteImagenIndex = 0;
  }

  siguienteImagenRestaurante() {
    if (!this.restauranteSeleccionado) return;
    this.restauranteImagenIndex =
      (this.restauranteImagenIndex + 1) % this.restauranteSeleccionado.imagenes.length;
  }

  anteriorImagenRestaurante() {
    if (!this.restauranteSeleccionado) return;
    this.restauranteImagenIndex =
      (this.restauranteImagenIndex - 1 + this.restauranteSeleccionado.imagenes.length) %
      this.restauranteSeleccionado.imagenes.length;
  }
}
