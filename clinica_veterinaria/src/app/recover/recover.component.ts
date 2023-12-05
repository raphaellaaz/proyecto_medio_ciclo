import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiVeterinariaService } from '../api-veterinaria.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {
  email: string = "";
  oldpassword: string = "";
  newpassword: string = "";

  // recover.component.ts
  constructor(private apiService: ApiVeterinariaService, private router: Router, private snackBar: MatSnackBar) { }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error' | 'info' = 'success'): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: tipo === 'error' ? ['mat-toolbar', 'mat-warn'] : ['mat-toolbar', 'mat-primary']
    };

    this.snackBar.open(mensaje, 'Cerrar', config);
  }

  recover() {
    // Llama a la función del servicio para verificar las credenciales
    this.apiService.checkCredentials(this.email, this.oldpassword).subscribe(
      (response) => {
        // Si las credenciales son válidas, actualiza la contraseña
        if (response && response.valid) {
          this.apiService.updatecredentials(this.email, this.newpassword).subscribe(
            (result) => {
              this.mostrarNotificacion('Contraseña actualizada con éxito','success');
              console.log('Contraseña actualizada con éxito');
              // Puedes redirigir a otra página después de actualizar la contraseña
              // this.router.navigate(['/ruta-de-redireccion']); // Reemplaza con la ruta deseada
            },
            (error) => {
              console.error('Error al actualizar la contraseña', error);
              this.mostrarNotificacion('Error al actualizar la contraseña','error');
            }
          );
        } else {
          console.log('Credenciales inválidas');
          this.mostrarNotificacion('Credenciales inválidas','error');
        }
      },
      (error) => {
        console.error('Error al verificar las credenciales', error);
        this.mostrarNotificacion('Error al verificar las credenciales','error');
      }
    );
  }

  toLogin(){
    this.router.navigate(['/login']);
  }

}
