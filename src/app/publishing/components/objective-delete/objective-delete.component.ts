import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Objective} from '../../model/objective.entity';
import {ObjectivesService} from '../../services/objectives.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-objective-delete',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatButton,
    MatCardSubtitle,
    MatIcon
  ],
  templateUrl: './objective-delete.component.html',
  styleUrl: './objective-delete.component.css'
})
export class ObjectiveDeleteComponent {
  @Input() objective: Objective;
  @Output() objectiveDeleted: EventEmitter<Objective> = new EventEmitter<Objective>();
  @Output() deleteCanceled: EventEmitter<any> = new EventEmitter();

  constructor(private objectivesService: ObjectivesService) {
    this.objective = new Objective();
  }

  // Private methods
  private deleteObjective(): void {
    this.objectivesService.delete(this.objective.id)
      .subscribe((response: any) => {
        this.objectiveDeleted.emit(this.objective);
      });
  }

  onSubmit(): void {
    this.deleteObjective();
  }

  onCancel(): void {
    this.deleteCanceled.emit();
  }


}
