import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  private apiUrl = 'https://localhost:44379/api/persona'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  LeerTodo(cantidad: number, pagina:number, textoBusqueda: string){
    let parametros = new HttpParams();

    parametros = parametros.append('cantidad',cantidad);
    parametros = parametros.append('pagina',pagina);
    parametros = parametros.append('textoBusqueda',textoBusqueda);

    
    return this.http.get(this.apiUrl, { params : parametros});

}

  
}
