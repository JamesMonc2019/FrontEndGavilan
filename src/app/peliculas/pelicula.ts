import { generoDTO } from '../generos/genero';
import { cineDTO } from '../cines/cine';
import { actorPeliculaDTO } from '../actores/actor';
export interface PeliculaCreacionDTO{
    titulo: string;
    resumen: string;
    enCines: boolean;
    fechaLanzamiento: Date;
    trailer: string;
    poster: File;
    generosIds: number[];
    actores: actorPeliculaDTO[];
    cinesIds: number[];
}

export interface PeliculaDTO{
    titulo: string;
    resumen: string;
    enCines: boolean;
    fechaLanzamiento: Date;
    trailer: string;
    poster: string;
}

export interface PeliculaPostGet {
    generos: generoDTO[];
    cines: cineDTO[];
}