import {Component, Input, OnInit} from '@angular/core';
import {Objective} from '../../model/objective.entity';
import {ObjectivesService} from '../../services/objectives.service';
import {MatListModule} from '@angular/material/list';
import {NgForOf} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle,MatCardSubtitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';




@Component({
  selector: 'app-objective-list',
  imports: [MatListModule, NgForOf, MatCardTitle, MatCardHeader,
    MatCard, MatCardActions, MatButton, MatCardSubtitle,
    MatExpansionPanelDescription, MatExpansionPanelTitle,
    MatExpansionPanelHeader, MatExpansionPanel, MatAccordion, MatPaginator],
  templateUrl: './objective-list.component.html',
  styleUrl: './objective-list.component.css'
})
export class ObjectiveListComponent implements OnInit {
  //Paginator
  pageSize = 5;
  currentPage = 0;
  paginatedObjectives: Objective[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Attributes
  @Input() topicId!: number; // Receives the topicId
  objectiveData: Objective;
  objectiveList: Objective[];
  isEditMode: boolean;

  // Constructor
  constructor(private objectiveService: ObjectivesService) {
    this.isEditMode = false;
    this.objectiveData = {} as Objective;
    this.objectiveList = [];
  }

  // CRUD Actions
  private getAllObjectives(): void {
    this.objectiveService.getAll()
      .subscribe((response: any) => {
        this.objectiveList = response.filter((objective: Objective) => objective.topicId === this.topicId);
        console.log(this.objectiveList);
        this.updatePaginatedObjectives();
      });
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    this.getAllObjectives();
  }

  //Paginator functions
  updatePaginatedObjectives(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedObjectives = this.objectiveList.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedObjectives();
  }

}
