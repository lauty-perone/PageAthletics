import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from '../models/Torneo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TournamentsService {

  private apiUrl = 'https://localhost:44379/api/torneo'; 

  constructor(private http: HttpClient) {}

    // Obtener todos los torneos
    getTorneos(): Observable<Tournament[]> {
        return this.http.get<Tournament[]>(this.apiUrl);
    }

    // Crear un nuevo torneo
    createTorneo(torneo: Tournament): Observable<Tournament> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

        return this.http.post<Tournament>(this.apiUrl, torneo, {headers});
  }

}