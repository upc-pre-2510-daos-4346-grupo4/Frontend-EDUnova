import {Component, EventEmitter, Input, Output, ViewChild, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule, NgForm} from '@angular/forms';
import {Course} from '../../model/course.entity';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CoursesService} from '../../services/courses.service';
import {MatCard} from '@angular/material/card';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-course-create-and-edit',
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
    MatRadioGroup,
    MatLabel,
    NgClass,
    NgIf
  ],
  templateUrl: './course-create-and-edit.component.html',
  styleUrl: './course-create-and-edit.component.css'
})
export class CourseCreateAndEditComponent {
  // Attributes
  userId: number;
  newCourse:Course;
  editMode: boolean = false;
  showIncompleteError = false;
  @Output() courseAdded: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() courseUpdated: EventEmitter<Course> = new EventEmitter<Course>();


  //Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseService: CoursesService, private dialogRef: MatDialogRef<CourseCreateAndEditComponent>) {
    this.userId=data?.userId ?? 1;
    this.newCourse = data?.course ? { ...data.course } : new Course();
    this.editMode = data?.editMode ?? false;
  }

  // Private methods

  // CRUD Actions
  private createCourse(): void {
    this.courseService.create(this.newCourse)
      .subscribe((response: any) => {
        this.courseAdded.emit(response);
      });
  }

  private updateCourse(): void {
    this.courseService.update(this.newCourse.id,this.newCourse)
      .subscribe((response: any) => {
        this.courseUpdated.emit(response);
      });
  }


  // Event Handlers
  onSubmit(): void {
    this.newCourse.creatorId = this.userId;

    const isEmpty =
      !this.newCourse.name || this.newCourse.name.trim() === '' ||
      !this.newCourse.description || this.newCourse.description.trim() === '' ||
      !this.newCourse.category || this.newCourse.category.trim() === '' ||
      this.newCourse.price === undefined || this.newCourse.price === null || this.newCourse.price === 0 ||
      !this.newCourse.language || this.newCourse.language.trim() === '' ||
      !this.newCourse.difficulty || this.newCourse.difficulty.trim() === '' ||
      !this.newCourse.image || this.newCourse.image.trim() === '';

    if (isEmpty) {
      this.showIncompleteError = true;
      return;
    }
    this.showIncompleteError = false;

    if (this.editMode) {
      this.updateCourse();
    } else {
      this.createCourse();
    }
    // Cierra el diálogo solo si la validación fue exitosa
    this.dialogRef.close(true);
  }

}
