import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelDataService } from '../servicios/hotel-data';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  // --- Datos principales ---
  habitaciones: any[] = [];
  restaurantes: any[] = [];
  autos: any[] = [];

  // --- Selección actual ---
  habitacionSeleccionada: any = null;
  restauranteSeleccionado: any = null;
  autoSeleccionado: any = null;

  // --- MODELOS DE HABITACIÓN ---
  nombreCliente = '';
  correoCliente = '';
  telefonoCliente = '';
  checkin = '';
  checkout = '';
  comentariosCliente = '';
  facturaGenerada: string | null = null;
  totalCalculado = 0;
  noches = 0;
  tarjetaNombreCliente = '';
  tarjetaNumeroCliente = '';
  cvvCliente = '';

  // --- MODELOS DE RESTAURANTE ---
  nombreRestaurante = '';
  correoRestaurante = '';
  telefonoRestaurante = '';
  checkinRestaurante = '';
  horaRestaurante = '';
  comentariosRestaurante = '';
  tarjetaNombreRestaurante = '';
  tarjetaNumeroRestaurante = '';
  cvvRestaurante = '';

  // --- MODELOS DE AUTO ---
  nombreAuto = '';
  correoAuto = '';
  telefonoAuto = '';
  checkinAuto = '';
  checkoutAuto = '';
  comentariosAuto = '';
  facturaAuto: string | null = null;
  totalAuto = 0;
  diasAuto = 0;
  tarjetaNombreAuto = '';
  tarjetaNumeroAuto = '';
  cvvAuto = '';

  // --- MODELOS DE VUELO ---
  nombreVuelo = '';
  correoVuelo = '';
  telefonoVuelo = '';
  origenVuelo = '';
  destinoVuelo = '';
  fechaSalidaVuelo = '';
  fechaRegresoVuelo = '';
  pasajerosVuelo = 1;
  cargandoVuelo = false;


  constructor(private hotelData: HotelDataService) {}

  ngOnInit(): void {
    this.habitaciones = this.hotelData.habitaciones;
    this.restaurantes = this.hotelData.restaurantes;
    this.autos = this.hotelData.autos;

    this.habitacionSeleccionada = this.habitaciones.length ? this.habitaciones[0] : null;
    this.restauranteSeleccionado = this.restaurantes.length ? this.restaurantes[0] : null;
    this.autoSeleccionado = this.autos.length ? this.autos[0] : null;
  }

  // ======= HABITACIONES =======
  onCambiarHabitacion() {
    this.facturaGenerada = null;
    this.noches = 0;
    this.totalCalculado = 0;
    this.checkin = '';
    this.checkout = '';
    this.comentariosCliente = '';
    this.nombreCliente = '';
    this.correoCliente = '';
    this.telefonoCliente = '';
    this.tarjetaNombreCliente = '';
    this.tarjetaNumeroCliente = '';
    this.cvvCliente = '';
  }

  private calcularDatosReservaHabitacion() {
    const checkInDate = new Date(this.checkin);
    const checkOutDate = new Date(this.checkout);
    this.noches = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
    this.totalCalculado = this.noches * this.habitacionSeleccionada.precio;

    if (!this.facturaGenerada) {
      const facturaId = Math.floor(Math.random() * 9000000) + 1000000;
      this.facturaGenerada = 'CHF-' + facturaId;
    }
  }

  generarFactura(habitacion: any) {
    this.calcularDatosReservaHabitacion();

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Coastal Haven Florida', 20, 20);
    doc.setFontSize(12);
    doc.text(`Factura No: ${this.facturaGenerada}`, 20, 30);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 20, 38);
    doc.text(`Cliente: ${this.nombreCliente}`, 20, 48);
    doc.text(`Correo: ${this.correoCliente}`, 20, 56);
    doc.text(`Teléfono: ${this.telefonoCliente}`, 20, 64);
    doc.text(`Habitación: ${habitacion.nombre}`, 20, 76);
    doc.text(`Precio por noche: $${habitacion.precio}`, 20, 84);
    doc.text(`Check-in: ${this.checkin}`, 20, 92);
    doc.text(`Check-out: ${this.checkout}`, 20, 100);
    doc.text(`Noches: ${this.noches}`, 20, 108);
    doc.setFontSize(14);
    doc.text(`Total: $${this.totalCalculado}`, 20, 120);
    doc.setFontSize(11);
    doc.text('Método de pago: Tarjeta de crédito (simulado)', 20, 130);
    doc.text('Gracias por su preferencia.', 20, 145);
    doc.save(`${this.facturaGenerada}.pdf`);
  }

  enviarReservaPorCorreo(habitacion: any) {
    this.calcularDatosReservaHabitacion();
    const formData = new FormData();
    formData.append("nombre", this.nombreCliente);
    formData.append("correo", this.correoCliente);
    formData.append("telefono", this.telefonoCliente);
    formData.append("tarjeta_nombre", this.tarjetaNombreCliente);
    formData.append("tarjeta_numero", this.tarjetaNumeroCliente);
    formData.append("cvv", this.cvvCliente);
    formData.append("checkin", this.checkin);
    formData.append("checkout", this.checkout);
    formData.append("habitacion", habitacion.nombre);
    formData.append("factura", this.facturaGenerada ?? '');
    formData.append("total", String(this.totalCalculado));
    formData.append("noches", String(this.noches));
    formData.append("comentarios", this.comentariosCliente);

    fetch("https://formspree.io/f/mgvyprgp", {
      method: "POST",
      body: formData
    }).then(response => {
      if (response.status === 200 || response.status === 302) {
        alert("Reserva enviada a Infinix correctamente ✅");
        this.onCambiarHabitacion();
      } else {
        alert("Error al enviar la reserva ❌");
      }
    }).catch(error => {
      console.error("Error:", error);
      alert("Solicitud recibida , en breves instantes recibira la confirmacion a su correo electronicao .");
    });
  }

  actualizarCheckOutMin() {
    if (this.checkout < this.checkin) {
      this.checkout = this.checkin;
    }
  }

  // ======= RESTAURANTES =======
  onCambiarRestaurante() {
    this.checkinRestaurante = '';
    this.horaRestaurante = '';
    this.comentariosRestaurante = '';
    this.nombreRestaurante = '';
    this.correoRestaurante = '';
    this.telefonoRestaurante = '';
    this.tarjetaNombreRestaurante = '';
    this.tarjetaNumeroRestaurante = '';
    this.cvvRestaurante = '';
  }

  enviarReservaPorCorreoRestaurante(restaurante: any) {
    const formData = new FormData();
    formData.append("nombre", this.nombreRestaurante);
    formData.append("correo", this.correoRestaurante);
    formData.append("telefono", this.telefonoRestaurante);
    formData.append("tarjeta_nombre", this.tarjetaNombreRestaurante);
    formData.append("tarjeta_numero", this.tarjetaNumeroRestaurante);
    formData.append("cvv", this.cvvRestaurante);
    formData.append("fecha_reserva", this.checkinRestaurante);
    formData.append("hora", this.horaRestaurante);
    formData.append("restaurante", restaurante.nombre);
    formData.append("comentarios", this.comentariosRestaurante);

    fetch("https://formspree.io/f/mgvyprgp", {
      method: "POST",
      body: formData
    }).then(response => {
      if (response.status === 200 || response.status === 302) {
        alert("Reserva de restaurante enviada correctamente ✅");
        this.onCambiarRestaurante();
      } else {
        alert("Error al enviar la reserva de restaurante ❌");
      }
    }).catch(error => {
      console.error("Error:", error);
      alert("Solicitud recibida , en breves instantes recibira la confirmacion a su correo electronicao .");
    });
  }

  // ======= AUTOS =======
  onCambiarAuto() {
    this.checkinAuto = '';
    this.checkoutAuto = '';
    this.comentariosAuto = '';
    this.nombreAuto = '';
    this.correoAuto = '';
    this.telefonoAuto = '';
    this.facturaAuto = null;
    this.totalAuto = 0;
    this.diasAuto = 0;
    this.tarjetaNombreAuto = '';
    this.tarjetaNumeroAuto = '';
    this.cvvAuto = '';
  }

  private calcularDatosReservaAuto() {
    const checkInDate = new Date(this.checkinAuto);
    const checkOutDate = new Date(this.checkoutAuto);
    this.diasAuto = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
    this.totalAuto = this.diasAuto * this.autoSeleccionado.precio;

    if (!this.facturaAuto) {
      const facturaId = Math.floor(Math.random() * 9000000) + 1000000;
      this.facturaAuto = 'CHF-' + facturaId;
    }
  }

  generarFacturaAuto(auto: any) {
    this.calcularDatosReservaAuto();

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Coastal Haven Florida', 20, 20);
    doc.setFontSize(12);
    doc.text(`Factura No: ${this.facturaAuto}`, 20, 30);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 20, 38);
    doc.text(`Cliente: ${this.nombreAuto}`, 20, 48);
    doc.text(`Correo: ${this.correoAuto}`, 20, 56);
    doc.text(`Teléfono: ${this.telefonoAuto}`, 20, 64);
    doc.text(`Auto: ${auto.modelo}`, 20, 76);
    doc.text(`Precio por día: $${auto.precio}`, 20, 84);
    doc.text(`Fecha de retiro: ${this.checkinAuto}`, 20, 92);
    doc.text(`Fecha de devolución: ${this.checkoutAuto}`, 20, 100);
    doc.text(`Días: ${this.diasAuto}`, 20, 108);
    doc.setFontSize(14);
    doc.text(`Total: $${this.totalAuto}`, 20, 120);
    doc.setFontSize(11);
    doc.text('Método de pago: Tarjeta de crédito (simulado)', 20, 130);
    doc.text('Gracias por su preferencia.', 20, 145);
    doc.save(`${this.facturaAuto}.pdf`);
  }

  enviarReservaPorCorreoAuto(auto: any) {
    this.calcularDatosReservaAuto();
    const formData = new FormData();
    formData.append("nombre", this.nombreAuto);
    formData.append("correo", this.correoAuto);
    formData.append("telefono", this.telefonoAuto);
    formData.append("tarjeta_nombre", this.tarjetaNombreAuto);
    formData.append("tarjeta_numero", this.tarjetaNumeroAuto);
    formData.append("cvv", this.cvvAuto);
    formData.append("fecha_retiro", this.checkinAuto);
    formData.append("fecha_devolucion", this.checkoutAuto);
    formData.append("auto", auto.modelo);
    formData.append("factura", this.facturaAuto ?? '');
    formData.append("total", String(this.totalAuto));
    formData.append("dias", String(this.diasAuto));
    formData.append("comentarios", this.comentariosAuto);

    fetch("https://formspree.io/f/mgvyprgp", {
      method: "POST",
      body: formData
    }).then(response => {
      if (response.status === 200 || response.status === 302) {
        alert("Reserva de auto enviada correctamente ✅");
        this.onCambiarAuto();
      } else {
        alert("Error al enviar la reserva de auto ❌");
      }
    }).catch(error => {
      console.error("Error:", error);
      alert("Solicitud recibida , en breves instantes recibira la confirmacion a su correo electronicao .");
    });
  }


  // ======= VUELOS =======
 // ======= VUELOS =======



enviarReservaPorCorreoVuelo() {
  this.cargandoVuelo = true;

  const formData = new FormData();
  formData.append("nombre", this.nombreVuelo);
  formData.append("correo", this.correoVuelo);
  formData.append("telefono", this.telefonoVuelo);
  formData.append("origen", this.origenVuelo);
  formData.append("destino", this.destinoVuelo);
  formData.append("fecha_salida", this.fechaSalidaVuelo);
  formData.append("fecha_regreso", this.fechaRegresoVuelo);
  formData.append("pasajeros", String(this.pasajerosVuelo));

  fetch("https://formspree.io/f/mgvyprgp", {
    method: "POST",
    body: formData
  }).then(response => {
    if (response.ok) {
      this.limpiarVuelo();
      setTimeout(() => {
        window.location.href = "https://www.copaair.com/es-gs";
      }, 1800);
    } else {
      this.cargandoVuelo = false;
      alert("Error al enviar la reserva de vuelo ❌");
    }
  }).catch(error => {
    console.error("Error:", error);
    this.cargandoVuelo = false;
    alert("Solicitud recibida , en breves instantes recibira la confirmacion a su correo electronicao .");
  });
}

limpiarVuelo() {
  this.nombreVuelo = '';
  this.correoVuelo = '';
  this.telefonoVuelo = '';
  this.origenVuelo = '';
  this.destinoVuelo = '';
  this.fechaSalidaVuelo = '';
  this.fechaRegresoVuelo = '';
  this.pasajerosVuelo = 1;
  this.cargandoVuelo = false;
}
}