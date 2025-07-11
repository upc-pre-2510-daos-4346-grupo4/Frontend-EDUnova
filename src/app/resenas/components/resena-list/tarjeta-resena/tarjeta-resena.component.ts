import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resena } from '../../../model/resena.entity';
@Component({
  selector: 'app-tarjeta-resena',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tarjeta-resena">
      <div class="header">
        <h3>{{ resena.nombre }}</h3>
        <span class="fecha">{{ resena.fecha }}</span>
      </div>
      
      <div class="estrellas">
        <span *ngFor="let estrella of obtenerEstrellas()" class="estrella">★</span>
      </div>
      
      <p class="comentario">{{ resena.comentario }}</p>
    </div>
  `,
  styles: [`
    .tarjeta-resena {
      background: #e8e3dc;
      border: 1px solid #d4c5b0;
      padding: 15px;
    }
    
    .header {
      margin-bottom: 10px;
    }
    
    h3 {
      color: #5d4e37;
      font-size: 16px;
      margin: 0 0 5px 0;
    }
    
    .fecha {
      color: #8b7355;
      font-size: 12px;
    }
    
    .estrellas {
      display: flex;
      gap: 2px;
      margin-bottom: 12px;
    }
    
    .estrella {
      color: #ffa500;
      font-size: 16px;
    }
    
    .comentario {
      color: #5d4e37;
      margin: 0;
      line-height: 1.4;
      font-size: 14px;
    }
  `]
})
export class TarjetaResenaComponent {
  @Input() resena!: Resena;

  obtenerEstrellas(): number[] {
    return Array(this.resena.estrellas).fill(0);
  }
}