//lista-cursos.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../../services/cursos.service';
import { Curso } from '../../../model/curso.entity';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contenedor-cursos">
      <div class="header-cursos">
        <h1>Catálogo de Cursos</h1>
        <p>Explora nuestros cursos disponibles</p>
      </div>

      <div class="grid-cursos">
        <div *ngFor="let curso of cursos" class="tarjeta-curso" (click)="seleccionarCurso(curso)">
          <div class="contenido-curso">
            <h3>{{ curso.nombre }}</h3>
            <div class="rating">
              <span *ngFor="let i of obtenerEstrellas(curso.rating)" class="estrella">★</span>
              <span class="rating-numero">{{ curso.rating }}</span>
            </div>
            <p class="descripcion">{{ curso.descripcion }}</p>
            <div class="info-curso">
              <span>{{ curso.instructor }}</span>
              <span>{{ curso.duracion }}</span>
            </div>
            <button class="boton-ver">Ver reseñas</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contenedor-cursos {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f3f0;
      min-height: 100vh;
    }
    
    .header-cursos {
      text-align: center;
      margin-bottom: 30px;
      color: #5d4e37;
    }
    
    .header-cursos h1 {
      font-size: 28px;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .header-cursos p {
      font-size: 16px;
      color: #8b7355;
    }
    
    .filtros {
      display: none;
    }
    
    .grid-cursos {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    
    .tarjeta-curso {
      background: #e8e3dc;
      border: 1px solid #d4c5b0;
      padding: 20px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .tarjeta-curso:hover {
      transform: translateY(-2px);
    }
    
    .contenido-curso h3 {
      margin: 0 0 8px 0;
      color: #5d4e37;
      font-size: 18px;
      font-weight: 500;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 12px;
    }
    
    .estrella {
      color: #ffa500;
      font-size: 16px;
    }
    
    .rating-numero {
      color: #5d4e37;
      font-weight: 500;
      margin-left: 4px;
    }
    
    .descripcion {
      color: #8b7355;
      font-size: 14px;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    
    .info-curso {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #8b7355;
      margin-bottom: 15px;
    }
    
    .boton-ver {
      width: 100%;
      background: #8b7355;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
    }
    
    .boton-ver:hover {
      background: #5d4e37;
    }
    
    @media (max-width: 768px) {
      .filtros {
        flex-direction: column;
        align-items: center;
      }
      
      .grid-cursos {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ListaCursosComponent implements OnInit {
  @Output() cursoSeleccionado = new EventEmitter<Curso>();

  cursos: Curso[] = [];

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursosService.cursos$.subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  seleccionarCurso(curso: Curso): void {
    this.cursoSeleccionado.emit(curso);
  }

  obtenerEstrellas(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}