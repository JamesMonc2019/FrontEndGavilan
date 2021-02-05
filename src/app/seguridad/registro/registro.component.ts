import { Component, OnInit } from '@angular/core';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import { parsearErroresAPI } from '../../utilidades/utilidades';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private seguridadServices: SeguridadService,
    private router: Router ) { }

  ngOnInit(): void {
  }

  errores: string[] = [];

  registrar(credenciales: credencialesUsuario){
    this.seguridadServices.registrar(credenciales)
    .subscribe(respuesta => {
      this.seguridadServices.guardarToken(respuesta);
      this.router.navigate(['/']);
    }, errores  => this.errores = parsearErroresAPI(errores));
  }
}
