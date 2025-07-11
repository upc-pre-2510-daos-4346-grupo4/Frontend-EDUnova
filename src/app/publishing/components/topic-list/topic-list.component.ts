import { Component, Input } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {Topic} from '../../model/topic.entity';
import {TopicsService} from '../../services/topics.service';
import {MatAnchor, MatIconButton} from '@angular/material/button';
import { Router } from '@angular/router';
import {TopicCreateAndEditComponent} from '../topic-create-and-edit/topic-create-and-edit.component';
import {TopicDeleteComponent} from '../topic-delete/topic-delete.component';


@Component({
  selector: 'app-topic-list',
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, TranslateModule, MatAnchor, TopicCreateAndEditComponent, TopicDeleteComponent, NgIf, MatIconButton],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.css'
})
export class TopicListComponent implements OnInit, AfterViewInit {
  // Attributes
  @Input() courseId!: number; // Recibe el dato courseId
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'description', 'actions'];
  // Edit/Create Mode
  isEditMode: boolean;
  isDeleteMode: boolean;
  topicData: Topic;



  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private topicService: TopicsService, private router: Router) {
    this.isEditMode = false;
    this.isDeleteMode=false;
    this.topicData = new Topic;
    this.dataSource = new MatTableDataSource<any>();

  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.topicData = new Topic;
  }

  // CRUD Actions
  private getAllTopics(): void {
    this.topicService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response.filter((topic: any) => topic.courseId === this.courseId);
        console.log(this.dataSource.data);
      });
  }

  // Handler Methods
  onEditElement(element: Topic): void {
    this.isEditMode = true;
    this.topicData = { ...element }; // copia superficial
    this.isDeleteMode= false; // Aseguramos que el modo de eliminación esté desactivado
  }

  onDeleteElement(element: Topic): void {
    this.isDeleteMode = true;
    this.topicData = { ...element }; // copia superficial
  }

  onTopicAdded(newTopic: Topic): void {
    this.dataSource.data = [...this.dataSource.data, newTopic];
    this.resetEditState();
  }
  onTopicUpdated(updatedTopic: Topic): void {
    const index = this.dataSource.data.findIndex((topic: Topic) => topic.id === updatedTopic.id);
    if (index !== -1) {
      const updatedData = [...this.dataSource.data];
      updatedData[index] = updatedTopic;
      this.dataSource.data = updatedData;
    }
    this.resetEditState();
  }
  onTopicDeleted(deletedTopic: Topic): void {
    this.dataSource.data = this.dataSource.data.filter((topic: Topic) => topic.id !== deletedTopic.id);
    this.resetEditState();
    this.isDeleteMode= false;
  }
  onCancelEdit(): void {
    this.resetEditState();
  }

  onCancelDelete(): void {
    this.isDeleteMode= false;
    this.topicData = new Topic;
    this.isEditMode = false; // Reset edit mode after update
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
