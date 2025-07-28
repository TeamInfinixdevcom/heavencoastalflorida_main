import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],  // <-- ¡ESTO ES CLAVE!
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})


export class ContactoComponent {
  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  loading = false;
  success = false;
  error = false;

  // FAQs de ejemplo
  faqs = [
    {
      pregunta: '¿Puedo cancelar mi reservación sin costo?',
      respuesta: 'Sí, puedes cancelar hasta 48 horas antes de tu llegada sin ningún cargo.',
      open: false
    },
    {
      pregunta: '¿Aceptan mascotas en el hotel?',
      respuesta: 'Sí, aceptamos mascotas pequeñas. Consulta condiciones al reservar.',
      open: false
    },
    {
      pregunta: '¿Hay parqueo disponible?',
      respuesta: 'Sí, contamos con parqueo gratuito para nuestros huéspedes.',
      open: false
    }
  ];

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    this.success = false;
    this.error = false;

    // Configura aquí tu endpoint de Formspree
    const formspreeUrl = '"https://formspree.io/f/mgvyprgp"}';

    fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify(this.contacto)
    })
    .then(async (res) => {
      this.loading = false;
      if (res.ok) {
        this.success = true;
        form.resetForm();
      } else {
        this.error = true;
      }
    })
    .catch(() => {
      this.loading = false;
      this.error = true;
    });
  }

  toggleFaq(i: number) {
    this.faqs[i].open = !this.faqs[i].open;
    // Cierra los otros
    this.faqs.forEach((f, idx) => { if (idx !== i) f.open = false; });
  }
}
