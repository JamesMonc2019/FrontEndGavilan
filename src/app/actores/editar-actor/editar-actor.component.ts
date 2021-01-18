import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO, actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  
  constructor(private router: Router, 
    private actoresServices: ActoresService,
    private activatedRoute: ActivatedRoute ) { }

  modelo: actorDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //  alert(params.id);
      this.actoresServices.obtenerPorId(params.id)
      .subscribe(actor => {
        this.modelo = actor;
      },() => this.router.navigate(['/actores']) )

      });
  }

  guardarCambios(actor: actorCreacionDTO){
    // ... guardar los cambios
    this.actoresServices.editar(this.modelo.id, actor)
    .subscribe(() => {
      this.router.navigate(['/actores']);
    }, error => this.errores = parsearErroresAPI(error)
    );
  }


}
