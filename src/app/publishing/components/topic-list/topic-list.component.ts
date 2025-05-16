import { Component, Input } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {Topic} from '../../model/topic.entity';
import {TopicsService} from '../../services/topics.service';
import {MatAnchor} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topic-list',
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, TranslateModule, MatAnchor],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.css'
})
export class TopicListComponent implements OnInit, AfterViewInit {
  // Attributes
  @Input() courseId!: number; // Recibe el dato courseId
  topicData: Topic;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private topicService: TopicsService, private router: Router) {
    this.isEditMode = false;
    this.topicData = {} as Topic;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.topicData = {} as Topic;
  }

  // CRUD Actions
  private getAllTopics(): void {
    this.topicService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response.filter((topic: any) => topic.courseId === this.courseId);
        console.log(this.dataSource.data);
      });
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTopics();
  }

  // Other Link
  goToDetails(topicId: number): void {
    this.router.navigate([`/publishing/topics/${topicId}`]);
  }

}
