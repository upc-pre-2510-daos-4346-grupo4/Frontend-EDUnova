import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Topic} from '../../model/topic.entity';
import {TopicsService} from '../../services/topics.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-topic-delete',
  imports: [
    MatButton
  ],
  templateUrl: './topic-delete.component.html',
  styleUrl: './topic-delete.component.css'
})
export class TopicDeleteComponent {
  @Input() topic: Topic;

  @Output() topicDeleted: EventEmitter<Topic> = new EventEmitter<Topic>();
  @Output() deleteCanceled: EventEmitter<any> = new EventEmitter();


  constructor(private topicService: TopicsService) {
    this.topic = new Topic;
  }

  // Private methods
  private deleteTopic(): void {
    this.topicService.delete(this.topic.id)
      .subscribe((response: any) => {
        this.topicDeleted.emit(this.topic);
      });
  }

  onSubmit(): void {
    this.deleteTopic();
  }

  onCancel(): void {
    this.deleteCanceled.emit();
  }

}
