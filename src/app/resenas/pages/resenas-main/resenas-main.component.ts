// resenas/pages/resenas-main/resenas-main.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCursosComponent } from '../../components/curso-list/lista-cursos/lista-cursos.component';
import { ListaResenasComponent } from '../resena-management/lista-resenas.component';
import { Curso } from '../../model/curso.entity';

@Component({
  selector: 'app-resenas-main',
  standalone: true,
  imports: [
    CommonModule,
    ListaCursosComponent,
    ListaResenasComponent
  ],
  template: `
    <div class="resenas-main-container">
      <header class="resenas-header">
        <h1>Sistema de Reseñas de Cursos</h1>
        <p>Explora cursos y comparte tu experiencia</p>
      </header>

      <!-- Vista de cursos -->
      <app-lista-cursos 
        *ngIf="vistaActual === 'cursos'"
        (cursoSeleccionado)="irAResenas($event)">
      </app-lista-cursos>

      <!-- Vista de reseñas -->
      <app-lista-resenas 
        *ngIf="vistaActual === 'resenas'"
        [cursoSeleccionado]="cursoActual"
        (volverACursosEvent)="volverACursos()">
      </app-lista-resenas>
    </div>
  `,
  styles: [`
    .resenas-main-container {
      min-height: 100vh;
      background: #f5f3f0;
    }

    .resenas-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 40px 20px;
      margin-bottom: 0;
    }

    .resenas-header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
      font-weight: 600;
    }

    .resenas-header p {
      margin: 0;
      font-size: 18px;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .resenas-header h1 {
        font-size: 24px;
      }
      
      .resenas-header p {
        font-size: 16px;
      }
    }
  `]
})
export class ResenasMainComponent {
  vistaActual: 'cursos' | 'resenas' = 'cursos';
  cursoActual: Curso | null = null;

  irAResenas(curso: Curso): void {
    this.cursoActual = curso;
    this.vistaActual = 'resenas';
  }

  volverACursos(): void {
    this.vistaActual = 'cursos';
    this.cursoActual = null;
  }
}