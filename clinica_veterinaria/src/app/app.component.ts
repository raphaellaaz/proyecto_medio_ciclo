import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { PetInputComponent } from './pet-input/pet-input.component';

import { ApiVeterinariaService } from './api-veterinaria.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    PetInputComponent,
    HttpClientModule
  ],
  providers:[
    ApiVeterinariaService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'clinica_veterinaria';

  constructor(private apiService: ApiVeterinariaService) { } // Inyecta el servicio en el constructor

  ngOnInit(): void {
  }
}
