import { Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { PetInputComponent } from './pet-input/pet-input.component';


export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'recover', component: RecoverComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'mascota', component: PetInputComponent},
];
