import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  tabs = ['All', 'Rooms', 'Dining', 'Amenities', 'Events'];
  selectedTab = 'All';

  // ======================== HABITACIONES ========================
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


  habitacionSeleccionada: any = null;
  checkin: string = '';
  checkout: string = '';
  huespedes: number = 1;
  codigoPromocional: string = '';
  nombreCliente: string = '';
  correoCliente: string = '';
  telefonoCliente: string = '';
  enviando: boolean = false;
  exito: boolean = false;
  errorMsg: string = '';
  totalCalculado: number = 0;
  noches: number = 0;

  ngOnInit(): void {
    this.habitacionSeleccionada = this.habitaciones.length ? this.habitaciones[0] : null;
  }

  onCambiarHabitacion() {
    this.checkin = '';
    this.checkout = '';
    this.huespedes = 1;
    this.codigoPromocional = '';
    this.errorMsg = '';
    this.totalCalculado = 0;
    this.noches = 0;
  }

calcularTotal() {
  if (this.checkin && this.checkout && this.habitacionSeleccionada) {
    const fechaIn = new Date(this.checkin);
    const fechaOut = new Date(this.checkout);
    const diff = fechaOut.getTime() - fechaIn.getTime();
    this.noches = Math.max(1, diff / (1000 * 60 * 60 * 24));
    let subtotal = this.noches * this.habitacionSeleccionada.precio;

    // Aplica descuento si el código es "Coastal" (sin distinción de mayúsculas)
    if (this.codigoPromocional && this.codigoPromocional.trim().toLowerCase() === 'coastal') {
      this.totalCalculado = Math.round(subtotal * 0.8); // 20% de descuento
    } else {
      this.totalCalculado = subtotal;
    }
  } else {
    this.totalCalculado = 0;
    this.noches = 0;
  }
}



  enviarReserva(event: Event) {
    event.preventDefault();
    this.errorMsg = '';
    this.exito = false;

    if (!this.habitacionSeleccionada || !this.checkin || !this.checkout || !this.huespedes) {
    this.errorMsg = "Por favor complete todos los campos.";
    return;
  }


    if (this.checkout < this.checkin) {
      this.errorMsg = "La fecha de check-out debe ser después de check-in.";
      return;
    }

    this.calcularTotal();
    this.enviando = true;

    const formData = new FormData();
    formData.append("habitacion", this.habitacionSeleccionada.nombre);
    formData.append("checkin", this.checkin);
    formData.append("checkout", this.checkout);
    formData.append("huespedes", String(this.huespedes));
    formData.append("codigo_promocional", this.codigoPromocional);
    formData.append("nombre", this.nombreCliente);
    formData.append("correo", this.correoCliente);
    formData.append("telefono", this.telefonoCliente);
    formData.append("total", String(this.totalCalculado));
    formData.append("noches", String(this.noches));

    fetch("https://formspree.io/f/mgvyprgp", {
      method: "POST",
      body: formData
    })
    .then(response => {
      this.enviando = false;
      if (response.ok) {
        this.exito = true;
        this.checkin = '';
        this.checkout = '';
        this.huespedes = 1;
        this.codigoPromocional = '';
        this.nombreCliente = '';
        this.correoCliente = '';
        this.telefonoCliente = '';
        this.totalCalculado = 0;
        this.noches = 0;
      } else {
        this.errorMsg = "Hubo un error al enviar la reserva.";
      }
    })
    .catch(error => {
      this.enviando = false;
      this.errorMsg = "Reserva enviada con exito , revise su correo para completar el pago.";
    });
  }


imagenes = [
  // Amenidades
  { src: "assets/galeria/amenidades/bjscahi-spa-.avif", alt: "Spa", categoria: "Amenities" },
  { src: "assets/galeria/amenidades/bjscahi-swimming-pool-.avif", alt: "Swimming Pool", categoria: "Amenities" },
  { src: "assets/galeria/amenidades/bjsca-thespacefarmkids-garden-1-.avif", alt: "Kids Garden 1", categoria: "Amenities" },
  { src: "assets/galeria/amenidades/bjsca-thespacefarmkids-garden-2-.avif", alt: "Kids Garden 2", categoria: "Amenities" },

  // Comidas
  { src: "assets/galeria/comidas/bjscahi360-casual-dining.avif", alt: "360 Casual Dining", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-compass-grill.avif", alt: "Compass Grill", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-compass-grill-cuisines-.avif", alt: "Compass Grill Cuisines", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-compass-grill-cuisines-2-.jpg", alt: "Compass Grill Cuisines 2", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-compass-grill-wine-room.avif", alt: "Compass Grill Wine Room", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-long-bar.jpg", alt: "Long Bar", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-long-bar-cigar-lounge.avif", alt: "Long Bar Cigar Lounge", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-my-china-restaurant1.jpg", alt: "My China Restaurant 1", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-my-china-restaurant-2.avif", alt: "My China Restaurant 2", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-my-china-vip-room.avif", alt: "My China VIP Room", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-yueshang-cantonese-cuisines-.jpg", alt: "Yueshang Cantonese Cuisines", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjscahi-yue-shang-restaurant-vip-room.avif", alt: "Yue Shang G Restaurant VIP Room", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjsca-thepointlobbybar-caffe.jpg", alt: "The Point Lobby Bar Caffe", categoria: "Dining" },
  { src: "assets/galeria/comidas/bjsca-thepointlobbybar-caffe3.jpg", alt: "The Point Lobby Bar Caffe 3", categoria: "Dining" },
  { src: "assets/galeria/comidas/yueshang-mychina-restaurant-hiltong-beijing-capital-airport.avif", alt: "Yueshang My China Hilton Beijing Capital Airport", categoria: "Dining" },

  // Eventos (nombres exactos del print)
  { src: "assets/galeria/eventos/bjsca-ballroom-han-classroom.jpg", alt: "Ballroom Han Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroomhan-roundtable.jpg", alt: "Ballroom Han Roundtable", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroom-qin-classroom.avif", alt: "Ballroom Qin Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroom-qinhan-foryer.jpg", alt: "Ballroom Qinhan Foyer", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroom-qin-island.avif", alt: "Ballroom Qin Island", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroom-song-classroom.avif", alt: "Ballroom Song Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroom-song-island.jpg", alt: "Ballroom Song Island", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroomsong-roundtable.jpg", alt: "Ballroom Song Roundtable", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroomtang-classroom.jpg", alt: "Ballroom Tang Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroomtang-island.jpg", alt: "Ballroom Tang Island", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroomtang-roundtable.avif", alt: "Ballroom Tang Roundtable", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-ballroomtangsong-island.jpg", alt: "Ballroom Tang Song Island", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom17-classroom.jpg", alt: "Meeting Room 17 Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom17-island.jpg", alt: "Meeting Room 17 Island", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom-26-classroom.jpg", alt: "Meeting Room 26 Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom-26-double-u.jpg", alt: "Meeting Room 26 Double U", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom26-fishbone.jpg", alt: "Meeting Room 26 Fishbone", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom-26-roundtable.jpg", alt: "Meeting Room 26 Roundtable", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom27-classroom.jpg", alt: "Meeting Room 27 Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom27-island.jpg", alt: "Meeting Room 27 Island", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom28-roundtable.avif", alt: "Meeting Room 28 Roundtable", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom28-u.jpg", alt: "Meeting Room 28 U", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom31-32-island.jpg", alt: "Meeting Room 31-32 Island", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom31-u.jpg", alt: "Meeting Room 31 U", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom32-theater.avif", alt: "Meeting Room 32 Theater", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom33-34-roundtable.avif", alt: "Meeting Room 33-34 Roundtable", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-meetingroom33-34-u.jpg", alt: "Meeting Room 33-34 U", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-qinhan-ballroom-roundtable.avif", alt: "Qinhan Ballroom Roundtable", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-tangsong-ballroom-classroom.jpg", alt: "Tangsong Ballroom Classroom", categoria: "Events" },
  { src: "assets/galeria/eventos/bjsca-tangsong-ballroom-foryer.jpg", alt: "Tangsong Ballroom Foyer", categoria: "Events" },

  // Habitaciones (con nombre exacto del print)
  { src: "assets/galeria/habitaciones/bjsca-family-king-plus-room-.jpg", alt: "Family King Plus Room", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-king-hilton-guest-room-bathroom.jpg", alt: "King Hilton Guest Room Bathroom", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-king-hilton-guest-room-daytime.jpg", alt: "King Hilton Guest Room Daytime", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-king-hilton-guest-room-inward-facing.jpg", alt: "King Hilton Guest Room Inward Facing", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-king-premier-suite-bathroom.jpg", alt: "King Premier Suite Bathroom", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-king-premier-suite-livingroom.jpg", alt: "King Premier Suite Livingroom", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-presidential-suite-bathroom.jpg", alt: "Presidential Suite Bathroom", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-presidential-suite-dinning-area.jpg", alt: "Presidential Suite Dining Area", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-presidential-suite-gym.avif", alt: "Presidential Suite Gym", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-presidential-suite-livingroom.jpg", alt: "Presidential Suite Livingroom", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-twin-hilton-executive.avif", alt: "Twin Hilton Executive", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-twin-hilton-guest-room.jpg", alt: "Twin Hilton Guest Room", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-two-bedrooms-duplex-suite-livingroom.jpg", alt: "Two Bedrooms Duplex Suite Livingroom", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/bjsca-two-bedrooms-duplex-suite-wedding-.avif", alt: "Two Bedrooms Duplex Suite Wedding", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/hilton-connected-room.jpg", alt: "Hilton Connected Room", categoria: "Rooms" },
  { src: "assets/galeria/habitaciones/presidentialsuite.jpg", alt: "Presidential Suite", categoria: "Rooms" }
];


    modalAbierto = false;
  modalImg: any = null;


  get imagenesFiltradas() {
    if (this.selectedTab === 'All') return this.imagenes;
    return this.imagenes.filter(img => img.categoria === this.selectedTab);
  }

  abrirModal(img: any) {
    this.modalImg = img;
    this.modalAbierto = true;
  }
  cerrarModal() {
    this.modalAbierto = false;
    this.modalImg = null;
  }
}