import { Component, OnInit } from '@angular/core';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private seguridadServices: SeguridadService) { }

  ngOnInit(): void {
  }

  errores: string[] = [];

  registrar(credenciales: credencialesUsuario){
    this.seguridadServices.registrar(credenciales)
    .subscribe(respuesta => {
      console.log(respuesta);
    }, errores  => this.errores = parsearErroresAPI(errores));
  }
}
