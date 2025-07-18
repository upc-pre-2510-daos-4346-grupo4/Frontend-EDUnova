import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Objective} from '../../model/objective.entity';
import {Topic} from '../../model/topic.entity';
import {ObjectivesService} from '../../services/objectives.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

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
    MatCardSubtitle,
    MatLabel,
    NgClass,
    MatIcon
  ],
  templateUrl: './objective-create-and-edit.component.html',
  styleUrl: './objective-create-and-edit.component.css'
})
export class ObjectiveCreateAndEditComponent {
  // Attributes
  @Input() objective: Objective;
  @Input() editMode: boolean = false;
  @Input() topicId!: number; // Receives the topicId
  @Output() objectiveAdded: EventEmitter<Objective> = new EventEmitter<Objective>();
  @Output() objectiveUpdated: EventEmitter<Objective> = new EventEmitter<Objective>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();

  showIncompleteError = false;

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
    // Validación de campos obligatorios
    const isEmpty =
      !this.objective.title || this.objective.title.trim() === '' ||
      !this.objective.header || this.objective.header.trim() === '' ||
      !this.objective.mainParagraph || this.objective.mainParagraph.trim() === '' ||
      !this.objective.footer || this.objective.footer.trim() === '' ||
      !this.objective.conclusion || this.objective.conclusion.trim() === '';

    if (isEmpty) {
      this.showIncompleteError = true;
      return;
    }
    this.showIncompleteError = false;

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
