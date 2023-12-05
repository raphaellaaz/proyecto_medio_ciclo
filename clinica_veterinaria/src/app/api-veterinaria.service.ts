import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiVeterinariaService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  ///////////////////Metodos Adicionales///////////////////////
  checkCredentials(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, { email, password });
  }


  // Métodos para usuarios///////////////77777777777777777///////////////////////////////
  // api.service.ts


  getClient(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/clientes`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user);
  }

  updateUser(userId: number, password: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${userId}`, { password });
  }

  updatecredentials(email: string, password: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/updtcred/${email}`, { password });
  }


  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/${userId}`);
  }

  // Métodos para mascotas /////////////////////////////////////////////////////////////////
  getPets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pet`);
  }

  addPet(pet: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pet`, pet);
  }

  updatePet(petId: number, petData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/pet/${petId}`, petData);
  }

  deletePet(petId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/pet/${petId}`);
  }

  // Agrega métodos para agregar, actualizar y eliminar mascotas

  // Métodos para citas ///////////////////////////////////////////////////////////////////7
  getCita(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cita`);
  }


  addAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cita`, appointment);
  }

  updateAppointment(appointmentId: number, appointmentData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cita/${appointmentId}`, appointmentData);
  }

  deleteAppointment(appointmentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cita/${appointmentId}`);
  }
}
