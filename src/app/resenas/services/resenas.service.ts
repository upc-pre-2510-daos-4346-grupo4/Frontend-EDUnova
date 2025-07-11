// services/resenas.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Resena } from '../model/resena.entity';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private resenasSubject = new BehaviorSubject<Resena[]>([
    {
      id: 1,
      nombre: 'Carlos Herrera',
      fecha: '15 de abril 2024',
      estrellas: 5,
      comentario: 'Excelente curso de Angular, muy recomendado. El instructor explica muy bien y los ejemplos son prácticos.',
      cursoId: 1
    },
    {
      id: 2,
      nombre: 'Ana García',
      fecha: '20 de marzo 2024',
      estrellas: 4,
      comentario: 'Muy buen curso de JavaScript, aunque hubo algunos conceptos que me costaron un poco.',
      cursoId: 2
    },
    {
      id: 3,
      nombre: 'Luis Martínez',
      fecha: '10 de marzo 2024',
      estrellas: 5,
      comentario: 'El curso de React superó mis expectativas. Definitivamente recomendado para quien quiera aprender.',
      cursoId: 3
    },
    {
      id: 4,
      nombre: 'María López',
      fecha: '5 de febrero 2024',
      estrellas: 5,
      comentario: 'Increíble curso de Angular. Ahora puedo crear aplicaciones completas por mi cuenta.',
      cursoId: 1
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      fecha: '28 de enero 2024',
      estrellas: 4,
      comentario: 'El curso de Python está muy bien estructurado. Perfecto para principiantes.',
      cursoId: 5
    }
  ]);

  resenas$ = this.resenasSubject.asObservable();

  constructor() { }

  obtenerResenas(): Resena[] {
    return this.resenasSubject.value;
  }

  agregarResena(resena: Omit<Resena, 'id'>): void {
    const resenas = this.resenasSubject.value;
    const nuevaResena: Resena = {
      ...resena,
      id: Math.max(...resenas.map(r => r.id), 0) + 1
    };
    this.resenasSubject.next([...resenas, nuevaResena]);
  }

  obtenerResenasPorCurso(cursoId: number): Resena[] {
    return this.resenasSubject.value.filter(resena => resena.cursoId === cursoId);
  }

  calcularPromedioEstrellasPorCurso(cursoId: number): number {
    const resenas = this.obtenerResenasPorCurso(cursoId);
    if (resenas.length === 0) return 0;
    
    const sumaEstrellas = resenas.reduce((suma, resena) => suma + resena.estrellas, 0);
    return Math.round((sumaEstrellas / resenas.length) * 10) / 10;
  }

  obtenerTotalResenasPorCurso(cursoId: number): number {
    return this.obtenerResenasPorCurso(cursoId).length;
  }

  calcularPromedioEstrellas(): number {
    const resenas = this.resenasSubject.value;
    if (resenas.length === 0) return 0;
    
    const sumaEstrellas = resenas.reduce((suma, resena) => suma + resena.estrellas, 0);
    return Math.round((sumaEstrellas / resenas.length) * 10) / 10;
  }

  obtenerTotalResenas(): number {
    return this.resenasSubject.value.length;
  }
}