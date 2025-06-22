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
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class StudyingComponent implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  @ViewChild('topicDialog') topicDialog!: any;
  @ViewChild('editCourseDialog') editCourseDialog!: any;
  @ViewChild('addTopicDialog') addTopicDialog!: any;

  newTopic: any = { title: '', description: '' };

  selectedTabIndex = 0;
  courses: any[] = [];
  topics: any[] = [];
  currentUserId = 1;

  pageSize = 4;
  currentPage = 0;
  paginatedCourses: any[] = [];

  learningProgress: any;

  ngOnInit(): void {
    this.loadAllData();
  }

  get filteredCourses() {
    if (!this.learningProgress) return [];

    const purchased = (this.learningProgress.purchasedCourses || []).map((id: any) => Number(id));

    const created = this.courses
      .filter(course => Number(course.creatorId) === Number(this.currentUserId))
      .map(course => Number(course.id));

    const allAccessibleCourses = [...new Set([...purchased, ...created])];

    const completed = this.learningProgress.completedTopics || [];

    return this.courses
      .filter(course => allAccessibleCourses.includes(Number(course.id)))
      .filter(course => {
        const courseTopics = this.topics.filter(t => Number(t.courseId) === Number(course.id));
        const userCompletion = completed.find((c: any) => Number(c.courseId) === Number(course.id));
        const completedIds = (userCompletion?.topicIds || []).map((id: any) => Number(id));
        const isCompleted = courseTopics.every(t => completedIds.includes(Number(t.id)));
        return this.selectedTabIndex === 0 ? !isCompleted : isCompleted;
      });
  }

  loadAllData() {
    this.http.get<any[]>(`${environment.serverBasePath}/courses`).subscribe(courses => {
      this.courses = courses;

      this.http.get<any[]>(`${environment.serverBasePath}/topics`).subscribe(topics => {
        this.topics = topics;

        this.http.get<any>(`${environment.serverBasePath}/learningProgress?userId=${this.currentUserId}`)
          .subscribe(progressArray => {
            this.learningProgress = progressArray[0];
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

    if (!this.learningProgress?.completedTopics) {
      this.learningProgress.completedTopics = [];
    }

    this.learningProgress.completedTopics.forEach((ct: any) => {
      ct.courseId = Number(ct.courseId);
      ct.topicIds = ct.topicIds.map((id: any) => Number(id));
    });

    let courseCompletion = this.learningProgress.completedTopics.find((ct: any) => ct.courseId === courseId);

    if (courseCompletion?.topicIds.includes(topicId)) {
      this.dialog.closeAll();
      return;
    }

    if (!courseCompletion) {
      this.learningProgress.completedTopics.push({ courseId, topicIds: [topicId] });
    } else {
      courseCompletion.topicIds.push(topicId);
    }

    const updatedProgress = {
      ...this.learningProgress,
      completedTopics: this.learningProgress.completedTopics.map((ct: any) => ({
        courseId: Number(ct.courseId),
        topicIds: ct.topicIds.map((id: any) => Number(id))
      }))
    };

    this.http.put(`${environment.serverBasePath}/learningProgress/${this.learningProgress.id}`, updatedProgress).subscribe(() => {
      this.loadAllData();
      this.dialog.closeAll();
    });
  }

  isTopicCompleted(courseId: number, topicId: number): boolean {
    const courseCompletion = this.learningProgress?.completedTopics?.find(
      (ct: any) => Number(ct.courseId) === Number(courseId)
    );

    return courseCompletion?.topicIds?.some((id: any) => Number(id) === Number(topicId)) || false;
  }

  isAuthor(course: any): boolean {
    return Number(course.creatorId) === this.currentUserId;
  }

  openEditCourseDialog(course: any): void {
    const dialogRef = this.dialog.open(this.editCourseDialog, {
      data: { ...course },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCourseEdit(result);
      }
    });
  }

  saveCourseEdit(courseData: any): void {
    const courseId = courseData.id;
    this.http.put(`${environment.serverBasePath}/courses/${courseId}`, courseData).subscribe(() => {
      this.loadAllData();
      this.dialog.closeAll();
    });
  }

  deleteTopic(topicId: number, courseId: number) {
    if (confirm('¿Estás seguro que deseas eliminar este tema?')) {
      this.http.delete(`${environment.serverBasePath}/topics/${topicId}`).subscribe(() => {
        if (this.learningProgress?.completedTopics) {
          const courseCompletion = this.learningProgress.completedTopics.find((c: any) => c.courseId === courseId);
          if (courseCompletion) {
            courseCompletion.topicIds = courseCompletion.topicIds.filter((id: number) => id !== topicId);
            this.http.put(`${environment.serverBasePath}/learningProgress/${this.learningProgress.id}`, this.learningProgress).subscribe(() => {
              this.loadAllData();
            });
          } else {
            this.loadAllData();
          }
        } else {
          this.loadAllData();
        }
      });
    }
  }

  openAddTopicDialog(courseId: number) {
    this.newTopic = { title: '', description: '' };
    this.dialog.open(this.addTopicDialog, {
      data: { courseId },
      width: '600px'
    });
  }

  confirmAddTopic(data: any) {
    const courseId = Number(data.courseId);
    const position = this.getTopicsByCourse(courseId).length + 1;

    const maxId = Math.max(0, ...this.topics.map(t => Number(t.id) || 0));
    const newId = (maxId + 1).toString();

    const newTopic = {
      id: newId,
      title: this.newTopic.title,
      description: this.newTopic.description,
      courseId: courseId,
      position
    };

    this.http.post(`${environment.serverBasePath}/topics`, newTopic).subscribe(() => {
      this.loadAllData();
      this.dialog.closeAll();
    });
  }
}
