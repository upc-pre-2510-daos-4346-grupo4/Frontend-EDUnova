import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResenasService } from '../../services/resenas.service';
import { CursosService } from '../../services/cursos.service';
import { TarjetaResenaComponent } from '../../components/resena-list/tarjeta-resena/tarjeta-resena.component';
import { EscribirResenaComponent } from '../../components/resena-create-and-edit/escribir-resena/escribir-resena.component';
import { Resena } from '../../model/resena.entity';
import { Curso } from '../../model/curso.entity';

@Component({
  selector: 'app-lista-resenas',
  standalone: true,
  imports: [
    CommonModule, 
    TarjetaResenaComponent,
    EscribirResenaComponent
  ],
  template: `
    <div class="contenedor-resenas">
      <div class="header-navegacion">
        <button (click)="volverACursos()">
          ← Volver a cursos
        </button>
      </div>

      <div class="resumen-curso">
        <h2>{{ cursoSeleccionado?.nombre }}</h2>
        <div class="rating-resumen">
          <div class="estrellas-grandes">
            <span *ngFor="let estrella of obtenerEstrellasPromedio()" class="estrella">★</span>
            <span class="rating-numero">{{ promedioEstrellas }}</span>
          </div>
          <p class="texto-resumen">Basado en {{ totalResenas }} reseñas</p>
        </div>
        <button (click)="mostrarFormulario = !mostrarFormulario">
          {{ mostrarFormulario ? 'Ocultar' : 'Escribir reseña' }}
        </button>
      </div>

      <app-escribir-resena 
        *ngIf="mostrarFormulario"
        [cursoSeleccionado]="cursoSeleccionado">
      </app-escribir-resena>

      <div class="seccion-resenas">
        <h3>Todas las reseñas</h3>
        
        <div *ngIf="resenas.length === 0" class="sin-resenas">
          <div class="mensaje-sin-resenas">
            <p>Aún no hay reseñas para este curso. ¡Sé el primero en escribir una!</p>
          </div>
        </div>
        
        <div class="grid-resenas">
          <app-tarjeta-resena 
            *ngFor="let resena of resenas" 
            [resena]="resena">
          </app-tarjeta-resena>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contenedor-resenas {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f3f0;
      min-height: 100vh;
    }
    
    .header-navegacion {
      margin-bottom: 20px;
    }
    
    .header-navegacion button {
      background: #e8e3dc;
      border: 1px solid #d4c5b0;
      color: #5d4e37;
      padding: 10px 15px;
      cursor: pointer;
    }
    
    .header-navegacion button:hover {
      background: #d4c5b0;
    }
    
    .resumen-curso {
      background: #e8e3dc;
      border: 1px solid #d4c5b0;
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .resumen-curso h2 {
      color: #5d4e37;
      margin: 0 0 16px 0;
      font-size: 24px;
    }
    
    .rating-resumen {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .estrellas-grandes {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      margin-bottom: 8px;
    }
    
    .estrella {
      color: #ffa500;
      font-size: 24px;
    }
    
    .rating-numero {
      font-size: 20px;
      font-weight: bold;
      color: #5d4e37;
      margin-left: 8px;
    }
    
    .texto-resumen {
      color: #8b7355;
      margin: 0;
      font-size: 14px;
    }
    
    .resumen-curso button {
      background: #8b7355;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      width: 100%;
    }
    
    .resumen-curso button:hover {
      background: #5d4e37;
    }
    
    .seccion-resenas h3 {
      color: #5d4e37;
      margin-bottom: 20px;
      font-size: 20px;
    }
    
    .sin-resenas {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .mensaje-sin-resenas {
      background: #e8e3dc;
      border: 1px solid #d4c5b0;
      padding: 20px;
    }
    
    .mensaje-sin-resenas p {
      color: #8b7355;
      margin: 0;
    }
    
    .grid-resenas {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    
    @media (max-width: 768px) {
      .grid-resenas {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ListaResenasComponent implements OnInit, OnChanges {
  @Input() cursoSeleccionado: Curso | null = null;
  @Output() volverACursosEvent = new EventEmitter<void>();

  resenas: Resena[] = [];
  promedioEstrellas: number = 0;
  totalResenas: number = 0;
  mostrarFormulario: boolean = false;

  constructor(
    private resenasService: ResenasService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.cargarResenas();
  }

  ngOnChanges(): void {
    this.cargarResenas();
  }

  cargarResenas(): void {
    if (this.cursoSeleccionado) {
      // Suscribirse a los cambios en tiempo real
      this.resenasService.resenas$.subscribe(todasLasResenas => {
        this.resenas = todasLasResenas.filter(resena => resena.cursoId === this.cursoSeleccionado!.id);
        this.promedioEstrellas = this.resenasService.calcularPromedioEstrellasPorCurso(this.cursoSeleccionado!.id);
        this.totalResenas = this.resenas.length;
      });
    }
  }

  obtenerEstrellasPromedio(): number[] {
    const estrellas = Math.round(this.promedioEstrellas);
    return Array(estrellas).fill(0);
  }

  volverACursos(): void {
    this.volverACursosEvent.emit();
  }
}