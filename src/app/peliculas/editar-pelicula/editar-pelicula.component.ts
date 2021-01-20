import { Component, OnInit } from '@angular/core';
import { PeliculaDTO, PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MultipleSelectorModel } from '../../utilidades/selector-multiple/MultipleSelectorModel';
import { actorPeliculaDTO } from '../../actores/actor';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService,
    private activateRoute: ActivatedRoute ,
    private router: Router) { }  // router con este metodo puedo redirigir la peticion

  modelo: PeliculaDTO;
  generosSeleccionados: MultipleSelectorModel[];
  generosNoSeleccionados: MultipleSelectorModel[];

  cinesSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];

  actoresSeleccionados: actorPeliculaDTO[];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.peliculasService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        this.modelo = peliculaPutGet.pelicula;

        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
  
        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(cines => {
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });
        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(cines => {
          return <MultipleSelectorModel>{llave: cines.id, valor: cines.nombre}
        });

        this.actoresSeleccionados = peliculaPutGet.actores;

      });
    })
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.editar(this.modelo.id, pelicula)
    .subscribe(() => this.router.navigate(['/pelicula/' + this.modelo.id]));
  }
}
