import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- IMPORTANTE


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false; // <--- ¡ESTA LÍNEA ES LA CLAVE!
}
