import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Agregue esto

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- ¡Agregue RouterModule aquí!
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date().getFullYear();
}
