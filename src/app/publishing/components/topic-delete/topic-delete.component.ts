import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Topic} from '../../model/topic.entity';
import {TopicsService} from '../../services/topics.service';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {ObjectivesService} from '../../services/objectives.service';
import {ResourcesService} from '../../services/resources.service';
import {Objective} from '../../model/objective.entity';
import {Resource} from '../../model/resource.entity';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-topic-delete',
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon
  ],
  templateUrl: './topic-delete.component.html',
  styleUrl: './topic-delete.component.css'
})
export class TopicDeleteComponent {
  @Input() topic: Topic;

  @Output() topicDeleted: EventEmitter<Topic> = new EventEmitter<Topic>();
  @Output() deleteCanceled: EventEmitter<any> = new EventEmitter();

  selectedObjectives: Objective[] = [];
  selectedResources: Resource[] = [];


  constructor(private topicService: TopicsService,
              private objectivesService: ObjectivesService,
              private resourcesService: ResourcesService) {
    this.topic = new Topic;
    //this.getAllObjectivesByTopicId();
    //this.getAllResourcesByTopicId();
  }

  // Private methods


  private getAllObjectivesByTopicId(): void {
    this.objectivesService.getAll().subscribe(
      (response: any) => {
        this.selectedObjectives = response.filter((objective: any) => objective.topicId === this.topic.id);
      }
    );
  }

  private getAllResourcesByTopicId(): void {
    this.resourcesService.getAll().subscribe(
      (response: any) => {
        this.selectedResources = response.filter((resource: any) => resource.topicId === this.topic.id);
      }
    );
  }

  private deleteTopic(): void {
    if (!this.topic || !this.topic.id) {
      console.error('topic no es válido');
      return;
    }
    this.topicService.delete(this.topic.id).subscribe(
      () => {
        this.topicDeleted.emit(this.topic);
      }
    );
  }

  private deleteObjectives(): void {
    this.selectedObjectives.forEach((objective: Objective) => {
      this.objectivesService.delete(objective.id).subscribe();
    });
  }

  private deleteResources(): void {
    this.selectedResources.forEach((resource: Resource) => {
      this.resourcesService.delete(resource.id).subscribe();
    });
  }



  onSubmit(): void {
    //this.deleteObjectives();
    //this.deleteResources();
    this.deleteTopic();
  }

  onCancel(): void {
    this.deleteCanceled.emit();
  }

}

