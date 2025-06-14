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
  currentUserId = 1;
  currentUser: any;

  pageSize = 4;
  currentPage = 0;
  paginatedCourses: any[] = [];
  activeCourse: any = null;

  get filteredCourses() {
    if (!this.currentUser) return [];

    const purchased = (this.currentUser.purchasedCourses || []).map((id: any) => Number(id));
    const completed = this.currentUser.completedTopics || [];

    return this.courses
      .filter(course => purchased.includes(Number(course.id)))
      .filter(course => {
        const courseTopics = this.topics.filter(t => Number(t.courseId) === Number(course.id));
        const userCompletion = completed.find((c: any) => Number(c.courseId) === Number(course.id));
        const completedIds = (userCompletion?.topicIds || []).map((id: any) => Number(id));
        const isCompleted = courseTopics.every(t => completedIds.includes(Number(t.id)));
        return this.selectedTabIndex === 0 ? !isCompleted : isCompleted;
      });
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.http.get<any[]>(`${environment.serverBasePath}/courses`).subscribe(courses => {
      this.courses = courses;

      this.http.get<any[]>(`${environment.serverBasePath}/topics`).subscribe(topics => {
        this.topics = topics;

        this.http.get<any>(`${environment.serverBasePath}/users/${this.currentUserId}`).subscribe(user => {
          this.currentUser = user;
          this.paginateCourses();
        });
      });
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateCourses();
  }

  onTabChange() {
    this.currentPage = 0;
    this.paginateCourses();
  }

  paginateCourses() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCourses = this.filteredCourses.slice(start, end);
  }

  getInstructorName(creatorId: number): string {
    return creatorId === 1 ? 'Carlos Ramírez' : 'Instructor Desconocido';
  }

  getTopicsByCourse(courseId: number | null) {
    if (courseId === null) return [];
    return this.topics
      .filter(t => Number(t.courseId) === Number(courseId))
      .sort((a, b) => a.position - b.position);
  }

  openTopicDialog(topic: any, courseId: number): void {
    this.dialog.open(this.topicDialog, {
      data: {
        ...topic,
        courseId
      },
      width: '80vw',
      height: '80vh'
    });
  }

  markTopicCompleted(topic: any) {
    const courseId = Number(topic.courseId);
    const topicId = Number(topic.id);
  
    if (!this.currentUser?.completedTopics) {
      this.currentUser.completedTopics = [];
    }
  
    // Normaliza datos actuales a número para evitar duplicados por tipo
    this.currentUser.completedTopics.forEach((ct: any) => {
      ct.courseId = Number(ct.courseId);
      ct.topicIds = ct.topicIds.map((id: any) => Number(id));
    });
  
    // Busca si ya hay progreso guardado en ese curso
    let courseCompletion = this.currentUser.completedTopics.find((ct: any) => ct.courseId === courseId);
  
    // Evita duplicados
    if (courseCompletion?.topicIds.includes(topicId)) {
      this.dialog.closeAll();
      return;
    }
  
    // Añadir nuevo progreso
    if (!courseCompletion) {
      this.currentUser.completedTopics.push({ courseId, topicIds: [topicId] });
    } else {
      courseCompletion.topicIds.push(topicId);
    }
  
    // Envía la versión limpia al backend
    const updatedUser = {
      ...this.currentUser,
      completedTopics: this.currentUser.completedTopics.map((ct: any) => ({
        courseId: Number(ct.courseId),
        topicIds: ct.topicIds.map((id: any) => Number(id))
      }))
    };
  
    this.http.put(`${environment.serverBasePath}/users/${this.currentUserId}`, updatedUser).subscribe(() => {
      this.loadAllData();
      this.dialog.closeAll();
    });
  }

  isTopicCompleted(courseId: number, topicId: number): boolean {
    const courseCompletion = this.currentUser?.completedTopics?.find(
      (ct: any) => Number(ct.courseId) === Number(courseId)
    );
  
    return courseCompletion?.topicIds?.some((id: any) => Number(id) === Number(topicId)) || false;
  }
}
