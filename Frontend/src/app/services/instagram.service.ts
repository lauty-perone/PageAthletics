import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private accessToken = 'TU_ACCESS_TOKEN'; // Reemplázalo con tu token válido
  private instagramApiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${this.accessToken}`;

  constructor(private http: HttpClient) {}

  obtenerPublicaciones(): Observable<any> {
    return this.http.get<any>(this.instagramApiUrl);
  }
}
