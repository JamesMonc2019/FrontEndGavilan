import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { primeraLetraMayuscula } from '../../utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';
import { GeneroService } from '../genero.service';

@Component({
  selector: 'app-crear-generos',
  templateUrl: './crear-generos.component.html',
  styleUrls: ['./crear-generos.component.css']
})
export class CrearGenerosComponent  {
  errores: string[] = [];

  constructor(private router: Router, private generoServices: GeneroService ) { }

  guardarCambios(genero: generoCreacionDTO){
    //... guardar los cambios
    this.generoServices.crear(genero).subscribe(() => {
      this.router.navigate(['/generos']);
    }, 
    (error) => this.errores = parsearErroresAPI(error)
    );        
  }
}
