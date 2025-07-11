// services/cursos.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Curso } from '../model/curso.entity';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursosSubject = new BehaviorSubject<Curso[]>([
    {
      id: 1,
      nombre: 'Angular desde Cero',
      descripcion: 'Aprende Angular paso a paso desde lo básico',
      instructor: 'Carlos Rodríguez',
      duracion: '40 horas',
      precio: 89.99,
      categoria: 'Desarrollo Web',
      nivel: 'Principiante',
      rating: 4.8,
      totalEstudiantes: 1250
    },
    {
      id: 2,
      nombre: 'JavaScript Avanzado',
      descripcion: 'Domina JavaScript con ES6+ y async/await',
      instructor: 'María García',
      duracion: '35 horas',
      precio: 79.99,
      categoria: 'Programación',
      nivel: 'Avanzado',
      rating: 4.9,
      totalEstudiantes: 890
    },
    {
      id: 3,
      nombre: 'React Completo',
      descripcion: 'Construye aplicaciones modernas con React',
      instructor: 'Ana Martínez',
      duracion: '45 horas',
      precio: 99.99,
      categoria: 'Desarrollo Web',
      nivel: 'Intermedio',
      rating: 4.7,
      totalEstudiantes: 2100
    },
    {
      id: 4,
      nombre: 'Node.js y Express',
      descripcion: 'Desarrollo backend con Node.js y Express',
      instructor: 'Luis Hernández',
      duracion: '50 horas',
      precio: 94.99,
      categoria: 'Backend',
      nivel: 'Intermedio',
      rating: 4.6,
      totalEstudiantes: 760
    },
    {
      id: 5,
      nombre: 'Python para Principiantes',
      descripcion: 'Aprende Python desde cero con proyectos',
      instructor: 'Sofia López',
      duracion: '30 horas',
      precio: 69.99,
      categoria: 'Programación',
      nivel: 'Principiante',
      rating: 4.9,
      totalEstudiantes: 1800
    },
    {
      id: 6,
      nombre: 'Diseño UX/UI',
      descripcion: 'Diseña interfaces atractivas y funcionales',
      instructor: 'Diego Vargas',
      duracion: '25 horas',
      precio: 84.99,
      categoria: 'Diseño',
      nivel: 'Principiante',
      rating: 4.8,
      totalEstudiantes: 950
    }
  ]);

  cursos$ = this.cursosSubject.asObservable();

  constructor() { }

  obtenerCursos(): Curso[] {
    return this.cursosSubject.value;
  }

  obtenerCursoPorId(id: number): Curso | undefined {
    return this.cursosSubject.value.find(curso => curso.id === id);
  }

  filtrarCursosPorCategoria(categoria: string): Curso[] {
    if (categoria === 'Todos') {
      return this.cursosSubject.value;
    }
    return this.cursosSubject.value.filter(curso => curso.categoria === categoria);
  }

  obtenerCategorias(): string[] {
    const categorias = this.cursosSubject.value.map(curso => curso.categoria);
    return ['Todos', ...Array.from(new Set(categorias))];
  }
}