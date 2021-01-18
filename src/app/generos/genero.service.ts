import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generoDTO, generoCreacionDTO } from './genero';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL  + 'generos' ;

  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    //RecordsPorPagina biene de mi WEB API
    params = params.append('RecordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<generoDTO[]>(this.apiURL, {observe: 'response', params});
    //{observe: 'response'} con este vinculo la paginación
  }
public obtenerPorId(id: number): Observable<generoDTO>{
  return this.http.get<generoDTO>(`${this.apiURL}/${id}`);
}

public crear(genero: generoCreacionDTO) {
  return this.http.post(this.apiURL, genero);
}

public editar(id: number, genero: generoCreacionDTO){
  return this.http.put(`${this.apiURL}/${id}`, genero);
}

public borrar(id: number){
  return this.http.delete(`${this.apiURL}/${id}`);
}

}
