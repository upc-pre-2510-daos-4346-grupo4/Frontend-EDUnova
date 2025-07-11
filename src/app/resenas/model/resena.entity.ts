export class Resena {
  id: number;
  nombre: string;
  fecha: string;
  estrellas: number;
  comentario: string;
  cursoId: number;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.fecha = '';
    this.estrellas = 0;
    this.comentario = '';
    this.cursoId = 0;
  }
}