import { Component, OnInit } from '@angular/core';
import { generoDTO, generoCreacionDTO } from '../genero';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneroService } from '../genero.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private router: Router, 
    private generosServices: GeneroService,
    private activatedRoute: ActivatedRoute ) { }

  modelo: generoDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //  alert(params.id);
      this.generosServices.obtenerPorId(params.id)
      .subscribe(genero => {
        this.modelo = genero;
      },() => this.router.navigate(['/generos']) )

      });
  }

  guardarCambios(genero: generoCreacionDTO){
    // ... guardar los cambios
    this.generosServices.editar(this.modelo.id, genero)
    .subscribe(() => {
      this.router.navigate(['/generos']);
    }, error => this.errores = parsearErroresAPI(error)
    );
  }

  }

