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
@Component({
  selector: 'app-course-delete',
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    FormsModule,
    MatInput,
    MatRadioButton,
    MatOption,
    MatSelect,
    MatRadioGroup
  ],
  templateUrl: './course-delete.component.html',
  styleUrl: './course-delete.component.css'
})
export class CourseDeleteComponent {
  // Attributes
  selectCourse:Course;
  @Output() courseDeleted: EventEmitter<Course> = new EventEmitter<Course>();

  //Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseService: CoursesService) {
    this.selectCourse = data?.course ? { ...data.course } : new Course();
  }

  //Private methods

  // CRUD Actions
  private deleteCourse(): void {
    this.courseService.delete(this.selectCourse.id)
      .subscribe((response: any) => {
        this.courseDeleted.emit(this.selectCourse);
      });
  }

  // Event Handlers
  onDelete(): void {
    this.deleteCourse();
  }

}
