import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { generoDTO, generoCreacionDTO } from 'src/app/generos/genero';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';


@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private router: Router, 
    private cinesService: CinesService,
    private activatedRoute: ActivatedRoute ) { }

  modelo: cineDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //  alert(params.id);
      this.cinesService.obtenerPorId(params.id)
      .subscribe(cine => {
        this.modelo = cine;
      },() => this.router.navigate(['/cines']) )

      });
  }

  guardarCambios(cine: cineCreacionDTO){
    // ... guardar los cambios
    this.cinesService.editar(this.modelo.id, cine)
    .subscribe(() => {
      this.router.navigate(['/cines']);
    }, error => this.errores = parsearErroresAPI(error)
    );
  }

}
