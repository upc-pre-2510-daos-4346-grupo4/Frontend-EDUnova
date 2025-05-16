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

@Component({
  selector: 'app-course-list',
  imports: [
    MatIconModule, MatTableModule,
    NgClass, TranslateModule, MatCardModule,
    MatButtonModule, MatExpansionModule, NgForOf, MatButtonModule, MatDialogModule, TopicListComponent, MatPaginatorModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})

export class CourseListComponent implements OnInit{
  // Dialog
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CourseCreateAndEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // Attributes
  courseData: Course;
  courseList: Course[];
  paginatedCourses: Course[];
  isEditMode: boolean;
  userId: Number;

  //paginator
  pageSize = 5;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  // Constructor
  constructor(private courseService: CoursesService) {
    this.isEditMode = false;
    this.courseData = {} as Course;
    this.courseList = [];
    this.paginatedCourses= [];
    // Este es el user actual
    this.userId = 1;
  }

  // CRUD Actions
  private getAllCourses(): void {
    this.courseService.getAll()
      .subscribe((response: any) => {
        this.courseList = response.filter((course: any) => course.creatorId === this.userId);
        console.log(this.courseList); // Muestra los cursos filtrados en la consola
        this.updatePaginatedCourses();
      });
  };


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
