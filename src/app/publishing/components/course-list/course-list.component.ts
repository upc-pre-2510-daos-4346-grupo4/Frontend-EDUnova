import { Component } from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import {Course} from '../../model/course.entity';
import {CoursesService} from '../../services/courses.service';
import { firstValueFrom } from 'rxjs';

// Card
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
//Accordion
import {signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

//Dialog
import {inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CourseCreateAndEditComponent} from '../course-create-and-edit/course-create-and-edit.component';
import {TopicListComponent} from '../topic-list/topic-list.component';

//paginator
import {MatPaginatorModule} from '@angular/material/paginator';
import {CourseDeleteComponent} from '../course-delete/course-delete.component';

@Component({
  selector: 'app-course-list',
  imports: [
    MatIconModule, MatTableModule, TranslateModule, MatCardModule,
    MatButtonModule, MatExpansionModule, NgForOf, MatButtonModule, MatDialogModule, TopicListComponent, MatPaginatorModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})

export class CourseListComponent implements OnInit{
  // Dialog
  readonly dialog = inject(MatDialog);

  openDialog(isEditMode:boolean, course?: Course): void {
    const dialogRef = this.dialog.open(CourseCreateAndEditComponent, {
      data: {
        userId: this.userId,
        course: course ? { ...course } : new Course(),
        editMode: isEditMode
      }
    });

    // Suscribirse a los eventos del hijo
    const instance = dialogRef.componentInstance;
    if (instance) {
      instance.courseAdded.subscribe((newCourse: Course) => this.onCourseAdded(newCourse));
      instance.courseUpdated.subscribe((newCourse: Course) => this.onCourseUpdated(newCourse));
    }

    dialogRef.afterClosed().subscribe(result => {
      this.updatePaginatedCourses();
    });
  }

  openDeleteDialog(course: Course): void {
    const dialogRef = this.dialog.open(
      // Import dinámico para evitar problemas de dependencias circulares
      CourseDeleteComponent,
      {
        data: {
          course:course
        }
      }
    );

    const instance = dialogRef.componentInstance;
    if (instance) {
      instance.courseDeleted.subscribe((selectedCourse: Course) => this.onCourseDeleted(selectedCourse));
    }

    dialogRef.afterClosed().subscribe(() => {
      this.updatePaginatedCourses();
    });
  }

  // Attributes
  //courseList: Course[];
  courseList: Course[];
  paginatedCourses: Course[];
  isEditMode: boolean;
  userId: number;



  //paginator
  pageSize = 1;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  // Constructor
  constructor(private courseService: CoursesService) {
    this.isEditMode = false;
    this.courseList = [];
    this.paginatedCourses= [];
    // Este es el user actual
    this.userId = 1;
  }

  // Private Methods

  // CRUD Actions

  private getAllCourses(): void {
    /*
    this.courseService.getAll()
      .subscribe((response: any) => {
        console.log(response);
        this.courseList = response.filter((course: any) => course.creatorId === this.userId);
        console.log(this.courseList); // Muestra los cursos filtrados en la consola
        this.updatePaginatedCourses();
      });
      */
     this.courseService.getAllByCreatorId(this.userId)
      .subscribe((response: any) => {
        console.log(response);
        this.courseList = response;
        console.log(this.courseList); // Muestra los cursos filtrados en la consola
        this.updatePaginatedCourses();
      });
  }




  // Event Handlers
  onCourseAdded(newCourse: Course): void {
    this.courseList.push(newCourse);
    this.updatePaginatedCourses();
  }

  onCourseUpdated(newCourse: Course): void {
    const index = this.courseList.findIndex(course => course.id === newCourse.id);
    if (index !== -1) {
      this.courseList[index] = { ...newCourse };
      this.updatePaginatedCourses();
    }
  }

  onCourseDeleted(selectedCourse: Course): void {
    this.courseList = this.courseList.filter(course => course.id !== selectedCourse.id);
    // Si la página actual queda vacía y no es la primera, retrocede una página
    const totalPages = Math.ceil(this.courseList.length / this.pageSize);
    if (this.currentPage >= totalPages && this.currentPage > 0) {
      this.currentPage = totalPages - 1;
      if (this.paginator) {
        this.paginator.pageIndex = this.currentPage;
      }
    }
    this.updatePaginatedCourses();
  }


  // Lifecycle Hooks
  ngOnInit(): void {
    this.getAllCourses();
  }

  //Paginator funcions
  updatePaginatedCourses(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCourses = this.courseList.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCourses();
  }

}
