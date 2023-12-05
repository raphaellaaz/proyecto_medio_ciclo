import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ApiVeterinariaService } from '../api-veterinaria.service';
import { Router } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';


import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface Dueno {
  value: string;
  viewValue: string; /// Nombre de persobna cliente
}


@Component({
  selector: 'app-pet-input',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './pet-input.component.html',
  styleUrl: './pet-input.component.css'
})
export class PetInputComponent implements OnInit {

  duenos: Dueno[] = [];


  pet_name: string = "";
  pet_especie: string = '';
  pet_dueno: string = '';

  selectedUserId: string = '';
  pet_id: string = '';

  constructor(private apiService: ApiVeterinariaService, private router: Router, private snackBar: MatSnackBar) { }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error' | 'info' = 'success'): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: tipo === 'error' ? ['mat-toolbar', 'mat-warn'] : ['mat-toolbar', 'mat-primary']
    };

    this.snackBar.open(mensaje, 'Cerrar', config);
  }
  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.apiService.getClient().subscribe(
      (clientes) => {
        this.duenos = clientes
          .map((cliente) => ({
            value: cliente.idusuario,
            viewValue: cliente.nombre,
          }))
          .filter((cliente) => cliente.value && cliente.viewValue);

        console.log(this.duenos);
      },
      (error) => {
        console.error('Error al obtener clientes', error);
      }
    );
  }

  save_pet() {
    const numeroEnteroAleatorio: number = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    this.pet_id = numeroEnteroAleatorio.toString()
    console.log(this.pet_id);
    console.log(this.selectedUserId);
    if (this.selectedUserId === '') {
      this.mostrarNotificacion('Por favor, selecciona un usuario antes de guardar la mascota.','error')
      console.log('Por favor, selecciona un usuario antes de guardar la mascota.');
      return;
    }

    const petData = {
      pet_id: this.pet_id,
      pet_name: this.pet_name,
      pet_especie: this.pet_especie,
      iddueno: this.selectedUserId

    };

    this.apiService.addPet(petData).subscribe(
      (result) => {
        this.mostrarNotificacion('Mascota guardada con éxito','success')
        console.log('Mascota guardada con éxito', result);
      },
      (error) => {
        console.error('Error al guardar la mascota', error);
        this.mostrarNotificacion('No se ha podido realizar','error')
      }
    );
  }

  logout(){
    this.router.navigate(['/login']);
  }
}