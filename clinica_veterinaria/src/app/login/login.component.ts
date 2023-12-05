export interface LoginResponse {
  valid: boolean;
}

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
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string='';
  password: string='';

  constructor(private apiService: ApiVeterinariaService, private router: Router, private snackBar: MatSnackBar) {}

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error' | 'info' = 'success'): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: tipo === 'error' ? ['mat-toolbar', 'mat-warn'] : ['mat-toolbar', 'mat-primary']
    };

    this.snackBar.open(mensaje, 'Cerrar', config);
  }

  login() {
    // Llama a la función del servicio para verificar las credenciales
    this.apiService.checkCredentials(this.email, this.password).subscribe(
      (response: LoginResponse) => {
        // Si las credenciales son válidas, redirige a otra página
        if (response && response.valid) {
          this.mostrarNotificacion('ingreso Correcto',"success");
          this.router.navigate(['/mascota']); // Reemplaza con la ruta deseada
        } else {
          console.log('Credenciales inválidas');
        }
      },
      (error) => {
        this.mostrarNotificacion('Error al verificar las credenciales','error')
        console.error('Error al verificar las credenciales', error);
      }
    );
  }

  toRegister(){
    this.router.navigate(['/register']);
  }
  toRecup(){
    this.router.navigate(['/recover']);
  }
}
