import {Component, Input, OnInit} from '@angular/core';
import {Objective} from '../../model/objective.entity';
import {ObjectivesService} from '../../services/objectives.service';
import {MatListModule} from '@angular/material/list';
import {NgClass, NgForOf, NgIf} from '@angular/common';
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
import {TranslatePipe} from '@ngx-translate/core';
import {ObjectiveCreateAndEditComponent} from '../objective-create-and-edit/objective-create-and-edit.component';
import {TopicCreateAndEditComponent} from '../topic-create-and-edit/topic-create-and-edit.component';
import {ObjectiveDeleteComponent} from '../objective-delete/objective-delete.component';


@Component({
  selector: 'app-objective-list',
  imports: [MatListModule, NgForOf, MatCardTitle, MatCardHeader,
    MatCard, MatCardActions, MatButton, MatCardSubtitle,
    MatExpansionPanelDescription, MatExpansionPanelTitle,
    MatExpansionPanelHeader, MatExpansionPanel, MatAccordion, MatPaginator, TranslatePipe, MatCardContent, ObjectiveCreateAndEditComponent, NgIf, TopicCreateAndEditComponent, ObjectiveDeleteComponent, NgClass],
  templateUrl: './objective-list.component.html',
  styleUrl: './objective-list.component.css'
})
export class ObjectiveListComponent implements OnInit {
  //Paginator
  pageSize = 2;
  currentPage = 0;
  paginatedObjectives: Objective[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Attributes
  @Input() topicId!: string; // Receives the topicId
  objectiveData: Objective;
  objectiveList: Objective[];
  isEditMode: boolean;
  isDeleteMode: boolean;

  // Constructor
  constructor(private objectiveService: ObjectivesService) {
    this.isEditMode = false;
    this.isDeleteMode = false;
    this.objectiveData = {} as Objective;
    this.objectiveList = [];
  }
  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.objectiveData = {} as Objective;
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

  // Handlers
  onEditObjective(objective: Objective): void {
    this.isEditMode = true;
    this.objectiveData = { ...objective }; // Create a copy of the objective to edit
  }

  onDeleteObjective(objective: Objective): void {
    this.isDeleteMode = true;
    this.objectiveData = { ...objective }; // Create a copy of the objective to delete
  }

  onObjectiveAdded(objective: Objective): void {
    this.objectiveList.push(objective);
    this.updatePaginatedObjectives();
    this.resetEditState();
  }
  onObjectiveUpdated(objective: Objective): void {
    this.objectiveList = this.objectiveList.map((obj: Objective) => {
      if (obj.id === objective.id) {
        return objective; // Update the existing objective
      }
      return obj; // Return the unchanged objective
    });
    this.updatePaginatedObjectives();
    this.resetEditState();
  }

  onObjectiveDeleted(objective: Objective): void {
    this.objectiveList = this.objectiveList.filter((obj: Objective) => obj.id !== objective.id);
    // Calcular el número total de páginas después de borrar
    const totalPages = Math.ceil(this.objectiveList.length / this.pageSize);
    if (this.currentPage >= totalPages && this.currentPage > 0) {
      this.currentPage = totalPages - 1;
      if (this.paginator) {
        this.paginator.pageIndex = this.currentPage;
      }
    }
    this.updatePaginatedObjectives();
    this.isDeleteMode = false;
    this.objectiveData = {} as Objective;
  }

  onCancelEdit(): void {
    this.resetEditState();
  }

  onCancelDelete(): void {
    this.isDeleteMode = false;
    this.objectiveData = {} as Objective; // Reset the objective data
  }



  // Lifecycle Hooks
  ngOnInit(): void {
    this.pageSize = 2;
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
    this.pageSize = event.pageSize; // Actualiza el pageSize según la selección del usuario
    this.updatePaginatedObjectives();
  }

}
