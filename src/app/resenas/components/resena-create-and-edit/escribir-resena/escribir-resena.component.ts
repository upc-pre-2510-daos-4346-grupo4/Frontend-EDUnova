// escribir-resena.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResenasService } from '../../../services/resenas.service';
import { Curso } from '../../../model/curso.entity';

@Component({
  selector: 'app-escribir-resena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="formulario-container">
      <h2>Escribir reseña</h2>
      
      <form (ngSubmit)="enviarResena()" #formulario="ngForm">
        <div class="campo">
          <label>Nombre:</label>
          <input type="text" 
                 [(ngModel)]="nuevaResena.nombre" 
                 name="nombre"
                 required>
        </div>

        <div class="campo">
          <label>Calificación:</label>
          <div class="estrellas">
            <span *ngFor="let i of [1,2,3,4,5]"
                  class="estrella"
                  [class.activa]="i <= nuevaResena.estrellas"
                  (click)="nuevaResena.estrellas = i">
              ★
            </span>
          </div>
        </div>

        <div class="campo">
          <label>Comentario:</label>
          <textarea [(ngModel)]="nuevaResena.comentario"
                    name="comentario"
                    required
                    rows="4">
          </textarea>
        </div>

        <button type="submit" 
                [disabled]="!formulario.valid || nuevaResena.estrellas === 0">
          Enviar reseña
        </button>
        
        <div *ngIf="mensajeExito" class="mensaje">
          ¡Reseña enviada!
        </div>
      </form>
    </div>
  `,
  styles: [`
    .formulario-container {
      background: #e8e3dc;
      padding: 20px;
      border: 1px solid #d4c5b0;
      margin: 20px 0;
    }
    
    h2 {
      color: #5d4e37;
      margin-bottom: 20px;
    }
    
    .campo {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      color: #5d4e37;
      margin-bottom: 5px;
    }
    
    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #d4c5b0;
      box-sizing: border-box;
    }
    
    .estrellas {
      display: flex;
      gap: 5px;
    }
    
    .estrella {
      font-size: 24px;
      color: #d4c5b0;
      cursor: pointer;
    }
    
    .estrella.activa {
      color: #ffa500;
    }
    
    button {
      background: #8b7355;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      width: 100%;
    }
    
    button:disabled {
      background: #d4c5b0;
    }
    
    .mensaje {
      background: #d4edda;
      color: #155724;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid #c3e6cb;
    }
  `]
})
export class EscribirResenaComponent {
  @Input() cursoSeleccionado: Curso | null = null;
  
  nuevaResena = {
    nombre: '',
    estrellas: 0,
    comentario: ''
  };
  
  mensajeExito = false;

  constructor(private resenasService: ResenasService) {}

  enviarResena(): void {
    if (this.cursoSeleccionado) {
      const resena = {
        ...this.nuevaResena,
        cursoId: this.cursoSeleccionado.id,
        fecha: new Date().toLocaleDateString('es-ES')
      };
      
      this.resenasService.agregarResena(resena);
      
      // Limpiar formulario
      this.nuevaResena = { nombre: '', estrellas: 0, comentario: '' };
      this.mensajeExito = true;
      
      setTimeout(() => {
        this.mensajeExito = false;
      }, 3000);
    }
  }
}