import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import imagenesHeroJson from '../../assets/inicio/inicio.json';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- ¡Así va!


@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule  // <-- ¡AGREGALO AQUÍ!
  ]
})

export class InicioComponent implements OnInit, OnDestroy {

  // ----------- TIPO DE CAMBIO INTERNACIONAL ----------- //
  divisas = [
    { codigo: 'USD', nombre: 'Dólar estadounidense', simbolo: '$' },
    { codigo: 'EUR', nombre: 'Euro', simbolo: '€' },
    { codigo: 'GBP', nombre: 'Libra esterlina', simbolo: '£' },
    { codigo: 'CRC', nombre: 'Colón costarricense', simbolo: '₡' }
  ];
  divisasBase = 'USD';
  tipoCambio: { [key: string]: number } = {};
  divisaActual = 0;
  intervalDivisa: any;
  

  // ----------- CARRUSEL PRINCIPAL ----------- //
  imagenes = [
    { url: 'assets/inicio/hotel-dia.jpg', alt: 'Hotel de día', caption: 'Hotel de día' },
    { url: 'assets/inicio/hotel-noche.jpg', alt: 'Hotel de noche', caption: 'Vive la magia nocturna' },
    { url: 'assets/inicio/gente-divirtiendose.jpg', alt: 'Diversión en la piscina', caption: 'Diversión para todos' }
  ];
  imagenActual = 0;
  intervalBanner: any;

  anterior() {
    this.imagenActual = (this.imagenActual - 1 + this.imagenes.length) % this.imagenes.length;
  }
  siguiente() {
    this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
  }
  irAImagen(i: number) {
    this.imagenActual = i;
  }

  // ----------- HERO CARRUSEL MOSAICO ----------- //
  imagenesHero: { src: string; alt: string }[] = [];
  imagenHeroActual = 0;
  imagenesPorVista = 3;
  animandoMosaico = false;
  transformMosaico = 'translateX(0)';
  intervalMosaico: any;

  get grupoImagenesHero() {
    const total = this.imagenesHero.length;
    let start = this.imagenHeroActual;
    let end = start + this.imagenesPorVista;
    if (end > total) {
      return [
        ...this.imagenesHero.slice(start, total),
        ...this.imagenesHero.slice(0, end - total)
      ];
    }
    return this.imagenesHero.slice(start, end);
  }

  anteriorHero() {
    this.deslizarHero(-1);
  }
  siguienteHero() {
    this.deslizarHero(1);
  }
  deslizarHero(direccion: 1 | -1) {
    this.animandoMosaico = true;
    const distancia = direccion * - (100 + 3.5 * 2) + 'vw';
    this.transformMosaico = `translateX(${distancia})`;

    setTimeout(() => {
      if (direccion === 1) {
        this.imagenHeroActual =
          (this.imagenHeroActual + this.imagenesPorVista) % this.imagenesHero.length;
      } else {
        this.imagenHeroActual =
          (this.imagenHeroActual - this.imagenesPorVista + this.imagenesHero.length) % this.imagenesHero.length;
      }
      this.animandoMosaico = false;
      this.transformMosaico = 'translateX(0)';
    }, 700);
  }
  irAImagenHero(i: number) {
    this.imagenHeroActual = i * this.imagenesPorVista % this.imagenesHero.length;
  }

  // ----------- MONEY EXCHANGE CAROUSEL ----------- //
  moneyExchangeImages = [
    { src: 'assets/inicio/centrodecambio/cambio1.jpg', alt: 'Sunset Exchange' },
    { src: 'assets/inicio/centrodecambio/cambio2.jpg', alt: 'Lobby Exchange Center' },
    { src: 'assets/inicio/centrodecambio/cambio3.jpg', alt: 'Tropical Cash' },
    { src: 'assets/inicio/centrodecambio/cambio4.jpg', alt: 'Premium Dollar Point' },
    { src: 'assets/inicio/centrodecambio/cambio5.jpg', alt: 'TravelMoney Express' }
  ];
  moneyExchangeIndex = 0;
  moneyExchangeInterval: any;

  // ----------- ZOOM DE IMÁGENES HERO (Opcional) ----------- //
  imagenZoom: string | null = null;
  pausarMosaico() {
    if (this.intervalMosaico) {
      clearInterval(this.intervalMosaico);
      this.intervalMosaico = null;
    }
  }
  reanudarMosaico() {
    if (!this.intervalMosaico) {
      this.intervalMosaico = setInterval(() => this.siguienteHero(), 3500);
    }
  }
  abrirZoom(img: { src: string; alt: string }) {
    this.imagenZoom = img.src;
    this.pausarMosaico();
  }
  cerrarZoom() {
    this.imagenZoom = null;
    this.reanudarMosaico();
  }

  // ----------- MODAL DE TARIFAS ESPECIALES ----------- //
  mostrarModal = false;

  // ----------- AUTOCOMPLETE DE CIUDADES ----------- //
  ciudadesMiami: string[] = [
    'Miami Beach',
    'Downtown Miami',
    'Coral Gables',
    'Sunny Isles Beach',
    'Aventura',
    'Bal Harbour',
    'Brickell',
    'Coconut Grove'
  ];
  ciudadesFiltradas: string[] = [];
  mostrarDropdown = false;
  destino: string = '';
  filtrarCiudades(valor: string) {
    if (valor) {
      this.ciudadesFiltradas = this.ciudadesMiami.filter(
        c => c.toLowerCase().includes(valor.toLowerCase())
      );
      this.mostrarDropdown = this.ciudadesFiltradas.length > 0;
    } else {
      this.ciudadesFiltradas = [];
      this.mostrarDropdown = false;
    }
  }
  seleccionarCiudad(ciudad: string) {
    this.destino = ciudad;
    this.mostrarDropdown = false;
  }
  ocultarDropdown() {
    setTimeout(() => this.mostrarDropdown = false, 180);
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // HERO MOSAICO
    this.imagenesHero = (imagenesHeroJson as any);

    // Carrusel principal
    this.intervalBanner = setInterval(() => this.siguiente(), 5000);

    // Mosaico hero
    this.intervalMosaico = setInterval(() => this.siguienteHero(), 3500);

    // Money Exchange carrusel
    this.moneyExchangeInterval = setInterval(() => {
      this.moneyExchangeIndex = (this.moneyExchangeIndex + 1) % this.moneyExchangeImages.length;
    }, 3500);

    // Tipo de cambio internacional
    this.cargarTipoCambio();

    // Animación automática de divisas
    this.intervalDivisa = setInterval(() => {
      this.divisaActual = (this.divisaActual + 1) % this.divisas.length;
    }, 3300);
  }

  ngOnDestroy() {
    clearInterval(this.intervalBanner);
    clearInterval(this.intervalMosaico);
    clearInterval(this.moneyExchangeInterval);
    clearInterval(this.intervalDivisa);
  }

  cargarTipoCambio() {
    this.http.get<any>('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,CRC')
      .subscribe(data => {
        this.tipoCambio['USD'] = 1;
        this.tipoCambio['EUR'] = data.rates.EUR;
        this.tipoCambio['GBP'] = data.rates.GBP;
        this.tipoCambio['CRC'] = data.rates.CRC;
      });
  }

  // En la clase InicioComponent
imagenesTourInterMiami = [
  {
    src: 'assets/inicio/tourstadio/miamistadiumlefft.jpg',
    alt: 'Entrada principal del estadio',
    titulo: 'Entrada VIP DRV PNK Stadium',
    desc: 'Acceso exclusivo a la zona VIP, donde inicia la experiencia del tour. Viví la emoción desde la puerta del estadio de Messi y el Inter Miami.'
  },
  {
    src: 'assets/inicio/tourstadio/miamistadiumrigth.jpg',
    alt: 'Tienda y balones Inter Miami',
    titulo: 'Souvenirs y Tienda Oficial',
    desc: 'Llevate recuerdos únicos, balones rosados y camisas del Inter Miami. ¡El lugar perfecto para una foto de colección!'
  },
  {
    src: 'assets/inicio/tourstadio/miamitour1.jpg',
    alt: 'Camerino Inter Miami',
    titulo: 'Zona de Camerinos',
    desc: 'Entrá a los camerinos donde Messi y las estrellas del club se preparan antes de cada partido. ¡Sentite parte del equipo!'
  },
  {
    src: 'assets/inicio/tourstadio/miamitour2.jpg',
    alt: 'Cancha y estadio Inter Miami',
    titulo: 'La Cancha y Experiencia VIP',
    desc: 'Pisá el césped, tomá fotos en la banca y mirá el estadio desde la perspectiva de los jugadores. ¡Vas a querer volver todos los años!'
  }
];

zoomTourAbierto: number | null = null;

abrirZoomTour(index: number) {
  this.zoomTourAbierto = index;
}
cerrarZoomTour() {
  this.zoomTourAbierto = null;
}
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
}


}
