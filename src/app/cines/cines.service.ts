import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO, cineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL  + 'cines' ;



  public crear(cine: cineCreacionDTO) {
    return this.http.post(this.apiURL, cine);
  }

  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    //RecordsPorPagina viene de mi WEB API
    params = params.append('RecordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<cineDTO[]>(this.apiURL, {observe: 'response', params});
    //{observe: 'response'} con este vinculo la paginación
  }
  
  public obtenerPorId(id: number): Observable<cineDTO>{
    return this.http.get<cineDTO>(`${this.apiURL}/${id}`);
  }


  public editar(id: number, cines: cineCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`, cines);
}
  /*
public crear(genero: generoCreacionDTO) {
  return this.http.post(this.apiURL, genero);
}

  }
  */
  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

}
