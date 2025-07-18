import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent {
  imagenes = [
    { src: 'assets/galeria/Piscina_de_noche.png', alt: 'Imagen 1' },
    { src: 'assets/galeria/lobby.png', alt: 'Vista al lobby' },
    { src: 'assets/galeria/Habitación principal.png', alt: 'Habitación principal ' }
  ];
  modalOpen = false;
selectedImageSrc = '';
selectedImageAlt = '';

openModal(src: string, alt: string) {
  this.selectedImageSrc = src;
  this.selectedImageAlt = alt;
  this.modalOpen = true;
}

closeModal() {
  this.modalOpen = false;
}
openReservation() {
  // Aquí navegas a la sección de reservas o página de reservas
  // Ejemplo si usas router:
  // this.router.navigate(['/reservas']);
}


}
