import {Component, EventEmitter, Input, Output, ViewChild, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule, NgForm} from '@angular/forms';
import {Course} from '../../model/course.entity';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CoursesService} from '../../services/courses.service';
import {Topic} from '../../model/topic.entity';
import {TopicsService} from '../../services/topics.service';
import {Objective} from '../../model/objective.entity';
import {ObjectivesService} from '../../services/objectives.service';
import {Resource} from '../../model/resource.entity';
import {ResourcesService} from '../../services/resources.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-course-delete',
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
  ],
  templateUrl: './course-delete.component.html',
  styleUrl: './course-delete.component.css'
})
export class CourseDeleteComponent {
  // Attributes
  selectedCourse:Course;
  @Output() courseDeleted: EventEmitter<Course> = new EventEmitter<Course>();

  selectedTopics: Topic[] = [];
  selectedObjectives: Objective[] = [];
  selectedResources: Resource[] = [];

  //Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseService: CoursesService,
              private topicsService: TopicsService,
              private objectivesService: ObjectivesService,
              private resourcesService: ResourcesService) {
    this.selectedCourse = data?.course ? { ...data.course } : new Course();
    //this.getAllTopicsByCourseId();
    //this.getAllObjectivesByTopicId();
    //this.getAllResourcesByTopicId();
  }

  //Private methods

  // CRUD Actions

  private getAllTopicsByCourseId(): void {
    this.topicsService.getAll().subscribe(
      (response:any) => {
        this.selectedTopics = response.filter((topic: any) => topic.courseId === this.selectedCourse.id);
      }
    );
  }

  private getAllObjectivesByTopicId(): void {
    this.objectivesService.getAll().subscribe(
      (response:any) => {
        this.selectedObjectives = response.filter((objective: any) =>
          this.selectedTopics.some(topic => topic.id === objective.topicId));
      }
    );
  }

  private getAllResourcesByTopicId(): void {
    this.resourcesService.getAll().subscribe(
      (response:any) => {
        this.selectedResources = response.filter((resource: any) =>
          this.selectedTopics.some(topic => topic.id === resource.topicId));
      }
    );
  }

  private deleteCourse(): void {
    if (!this.selectedCourse || !this.selectedCourse.id) {
      console.error('selectedCourse no es válido');
      return;
    }
    this.courseService.delete(this.selectedCourse.id).subscribe(
      () => {
        this.courseDeleted.emit(this.selectedCourse);
      }
    );
  }
  private deleteTopics(): void {
    this.selectedTopics.forEach(
      (topic: Topic) => {
        this.topicsService.delete(topic.id).subscribe(
          (response: any) => {
            console.log(`Topic with ID ${topic.id} deleted successfully.`);
          }
        );
      }
    )
  }
  private deleteObjectives(): void {
    this.selectedObjectives.forEach(
      (objective: Objective) => {
        this.objectivesService.delete(objective.id).subscribe(
          (response: any) => {
            console.log(`Objective with ID ${objective.id} deleted successfully.`);
          }
        );
      }
    )
  }
  private deleteResources(): void {
    this.selectedResources.forEach(
      (resource: Resource) => {
        this.resourcesService.delete(resource.id).subscribe(
          (response: any) => {
            console.log(`Resource with ID ${resource.id} deleted successfully.`);
          }
        );
      }
    )
  }


  // Event Handlers
  onDelete(): void {
    //this.deleteResources();
    //this.deleteObjectives();
    //this.deleteTopics();
    this.deleteCourse();
  }

}
