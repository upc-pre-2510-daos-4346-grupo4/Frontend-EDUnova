export class Curso {
  id: number;
  nombre: string;
  descripcion: string;
  instructor: string;
  duracion: string;
  precio: number;
  categoria: string;
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  rating: number;
  totalEstudiantes: number;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.instructor = '';
    this.duracion = '';
    this.precio = 0;
    this.categoria = '';
    this.nivel = 'Principiante';
    this.rating = 0;
    this.totalEstudiantes = 0;
  }
}