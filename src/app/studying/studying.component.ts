import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-studying',
  standalone: true,
  templateUrl: './studying.component.html',
  styleUrl: './studying.component.css',
  imports: [
    CommonModule,
    NgFor,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ]
})
export class StudyingComponent implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  @ViewChild('topicDialog') topicDialog!: any;

  selectedTabIndex = 0;
  courses: any[] = [];
  topics: any[] = [];
  completedTopics: any[] = [];
  purchasedCourses: any[] = [];

  currentUserId = 1; // SIMULACION DE USUARIO CON ID 1

  pageSize = 4;
  currentPage = 0;
  paginatedCourses: any[] = [];

  get filteredCourses() {
    const userCourseIds = this.purchasedCourses.map(pc => Number(pc.courseId));
    const completedTopicIds = this.completedTopics.map(c => Number(c.topicId));

    const filtered = this.courses
      .filter(course => userCourseIds.includes(Number(course.id)))
      .filter(course => {
        const courseTopicIds = this.topics
          .filter(t => Number(t.courseId) === Number(course.id))
          .map(t => Number(t.id));
        const isCompleted = courseTopicIds.every(tid => completedTopicIds.includes(tid));
        return this.selectedTabIndex === 0 ? !isCompleted : isCompleted;
      });

    return filtered;
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.http.get(`${environment.serverBasePath}/courses`).subscribe((res: any) => this.courses = res);
    this.http.get(`${environment.serverBasePath}/topics`).subscribe((res: any) => this.topics = res);
    this.http.get(`${environment.serverBasePath}/purchasedCourses?userId=${this.currentUserId}`)
      .subscribe((res: any) => {
        this.purchasedCourses = res;
        this.http.get(`${environment.serverBasePath}/completedTopics`).subscribe((ct: any) => {
          this.completedTopics = ct;
          this.paginateCourses();
        });
      });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateCourses();
  }

  paginateCourses() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCourses = this.filteredCourses.slice(start, end);
  }

  getInstructorName(creatorId: number): string {
    return creatorId === 1 ? 'Carlos Ramírez' : 'Instructor desconocido';
  }

  getTopicsByCourse(courseId: number) {
    return this.topics
      .filter(topic => Number(topic.courseId) === Number(courseId))
      .sort((a, b) => a.position - b.position);
  }

  openTopicDialog(topic: any, courseId: number): void {
    const purchased = this.purchasedCourses.find(pc => Number(pc.courseId) === Number(courseId));
    if (!purchased) return;

    const dialogRef = this.dialog.open(this.topicDialog, {
      data: {
        ...topic,
        purchasedCourseId: purchased.id
      },
      width: '80vw',
      height: '80vh'
    });
  }

  markTopicCompleted(topic: any) {
    if (!topic.purchasedCourseId) return;

    const body = {
      purchasedCourseId: topic.purchasedCourseId,
      topicId: topic.id
    };

    const alreadyCompleted = this.completedTopics.some(
      c => Number(c.topicId) === Number(topic.id) && Number(c.purchasedCourseId) === Number(topic.purchasedCourseId)
    );

    if (alreadyCompleted) {
      this.dialog.closeAll();
      return;
    }

    this.http.post(`${environment.serverBasePath}/completedTopics`, body).subscribe(() => {
      this.loadAllData();
      this.dialog.closeAll();
    });
  }
}
