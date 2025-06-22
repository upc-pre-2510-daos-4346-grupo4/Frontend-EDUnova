import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Topic} from '../../model/topic.entity';
import {TopicsService} from '../../services/topics.service';
import {MatDialogTitle} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {MatCard, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-topic-create-and-edit',
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    NgIf,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatLabel,
    MatIcon,
    NgClass
  ],
  templateUrl: './topic-create-and-edit.component.html',
  styleUrl: './topic-create-and-edit.component.css'
})
export class TopicCreateAndEditComponent {
  // Attributes
  @Input() topic: Topic;
  @Input() editMode: boolean = false;
  @Input() courseId!: string; // Recibe el dato courseId
  @Output() topicAdded: EventEmitter<Topic> = new EventEmitter<Topic>();
  @Output() topicUpdated: EventEmitter<Topic> = new EventEmitter<Topic>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();

  showIncompleteError = false;

  // Methods
  constructor(private topicService: TopicsService) {
    this.topic = new Topic;
  }

  // Private methods
  // CRUD Actions

  private createTopic(): void {
    this.topic.courseId = this.courseId; // Set courseId for the new topic
    this.topicService.create(this.topic)
      .subscribe((response: any) => {
        this.topicAdded.emit(response);
      });
  }

  private updateTopic(): void {
    this.topicService.update(this.topic.id, this.topic)
      .subscribe((response: any) => {
        this.topicUpdated.emit(response);
      });
  }

  // Event Handlers
  onSubmit(): void {
    // Validación de campos obligatorios
    const isEmpty =
      !this.topic.title || this.topic.title.trim() === '' ||
      !this.topic.description || this.topic.description.trim() === '';

    if (isEmpty) {
      this.showIncompleteError = true;
      return;
    }
    this.showIncompleteError = false;

    if (this.editMode) {
      this.updateTopic();
    } else {
      this.createTopic();
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
  }




}
