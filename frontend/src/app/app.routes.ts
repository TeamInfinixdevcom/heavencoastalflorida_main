import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ContactoComponent } from './contacto/contacto.component';

    export const routes: Routes = [
    { path: '', component: InicioComponent }, // <-- Página principal
    { path: 'habitaciones', component: HabitacionesComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: 'reservar', component: ReservasComponent },
    { path: 'contacto', component: ContactoComponent }
    ];
