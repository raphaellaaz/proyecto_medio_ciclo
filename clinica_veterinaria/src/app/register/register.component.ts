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
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  id: string = '';
  names: string = '';
  phone: string = '';
  direction: string = '';
  email: string = '';
  password: string = '';
  secondpassword: string = '';

  constructor(private userService: ApiVeterinariaService, private router: Router, private snackBar: MatSnackBar) { }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error' | 'info' = 'success'): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: tipo === 'error' ? ['mat-toolbar', 'mat-warn'] : ['mat-toolbar', 'mat-primary']
    };

    this.snackBar.open(mensaje, 'Cerrar', config);
  }

  signin() {
    const userDetails = {
      id: this.id,
      names: this.names,
      phone: this.phone,
      direction: this.direction,
      email: this.email,
      password: this.password,
      //secondpassword: this.secondpassword
    };


    this.userService.addUser(userDetails).subscribe(
      (response) => {
        this.mostrarNotificacion('Registro exitoso','success');
        console.log('Registro exitoso', response);

        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error durante el registro', error);
        this.mostrarNotificacion('Error durante el registro','error');
      }
    );
  }
}
