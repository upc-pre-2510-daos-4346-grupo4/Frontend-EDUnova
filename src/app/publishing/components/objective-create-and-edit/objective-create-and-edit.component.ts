import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Objective} from '../../model/objective.entity';
import {Topic} from '../../model/topic.entity';
import {ObjectivesService} from '../../services/objectives.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-objective-create-and-edit',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    NgIf,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './objective-create-and-edit.component.html',
  styleUrl: './objective-create-and-edit.component.css'
})
export class ObjectiveCreateAndEditComponent {
  // Attributes
  @Input() objective: Objective;
  @Input() editMode: boolean = false;
  @Input() topicId!: string; // Receives the topicId
  @Output() objectiveAdded: EventEmitter<Objective> = new EventEmitter<Objective>();
  @Output() objectiveUpdated: EventEmitter<Objective> = new EventEmitter<Objective>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();

  constructor(private objectivesService: ObjectivesService) {
    this.objective = new Objective();
  }

  // Private methods
  private createObjective(): void {
    this.objective.topicId = this.topicId; // Set topicId for the new objective
    this.objectivesService.create(this.objective)
      .subscribe((response: any) => {
        this.objectiveAdded.emit(response);
      });
  }

  private updateObjective(): void {
    this.objectivesService.update(this.objective.id, this.objective)
      .subscribe((response: any) => {
        this.objectiveUpdated.emit(response);
      });
  }

  // Event Handlers
  onSubmit(): void {
    if (this.editMode) {
      this.updateObjective();
    } else {
      this.createObjective();
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
  }

}
