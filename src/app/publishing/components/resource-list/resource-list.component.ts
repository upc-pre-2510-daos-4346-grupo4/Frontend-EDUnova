import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {NgForOf} from '@angular/common';
import {Resource} from '../../model/resource.entity';
import {ResourcesService} from '../../services/resources.service';
import {
  MatCard,
  MatCardActions, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {YouTubePlayer} from '@angular/youtube-player';
import {MatButton, MatFabButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ResourceCreateAndEditComponent} from '../resource-create-and-edit/resource-create-and-edit.component';
import {MatPaginator} from '@angular/material/paginator';
import {CourseDeleteComponent} from '../course-delete/course-delete.component';
import {Course} from '../../model/course.entity';
import {ResourceDeleteComponent} from '../resource-delete/resource-delete.component';

@Component({
  selector: 'app-resource-list',
  imports: [
    YouTubePlayer,
    NgForOf,
    MatCard,
    MatCardActions,
    MatButton,
    TranslatePipe,
    MatCardSubtitle,
    MatCardTitle,
    MatFabButton,
    MatIcon,
    MatPaginator
  ],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css'
})
export class ResourceListComponent implements OnInit{
  // Dialog
  readonly dialog = inject(MatDialog);

  openDialog(isEditMode: boolean, resource?: Resource): void {
    const dialogRef = this.dialog.open(ResourceCreateAndEditComponent, {
      data: {
        topicId: this.topicId,
        resource: resource ? { ...resource } : new Resource(),
        editMode: isEditMode
      }
    });

    // Subscribe to child events
    const instance = dialogRef.componentInstance;
    if (instance) {
      instance.resourceAdded.subscribe((newResource: Resource) => this.onResourceAdded(newResource));
      instance.resourceUpdated.subscribe((updatedResource: Resource) => this.onResourceUpdated(updatedResource));
    }

    dialogRef.afterClosed().subscribe(result => {
      this.updatePaginatedResources();
    });
  }
  openDeleteDialog(resource: Resource): void {
    const dialogRef = this.dialog.open(
      // Import dinámico para evitar problemas de dependencias circulares
      ResourceDeleteComponent,
      {
        data: {
          resource:resource
        }
      }
    );

    const instance = dialogRef.componentInstance;
    if (instance) {
      instance.resourceDeleted.subscribe((selectedResource: Resource) => this.onResourceDeleted(selectedResource));
    }

    dialogRef.afterClosed().subscribe(() => {
      this.updatePaginatedResources();
    });
  }

  // Attributes
  @Input() topicId!: string; // Receives the topicId
  resourceData: Resource;
  resourceList: Resource[];
  isEditMode: boolean;
  paginatedResources: Resource[];
  pageSize = 1;
  currentPage = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Constructor
  constructor(private resourcesService: ResourcesService) {
    this.isEditMode = false;
    this.resourceData = {} as Resource;
    this.resourceList = [];
    this.paginatedResources = [];
  }

  // CRUD Actions
  public getAllResources(): void {
    this.resourcesService.getAll()
      .subscribe((response: any) => {
        this.resourceList = response.filter((resource: Resource) => resource.topicId === this.topicId);
        this.updatePaginatedResources();
      });
  }

  updatePaginatedResources(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedResources = this.resourceList.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedResources();
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    this.getAllResources();
  }

  //Handle resource addition
  onResourceAdded(newResource: Resource): void {
    this.resourceList.push(newResource);
    this.updatePaginatedResources();
  }

  onResourceUpdated(updatedResource: Resource): void {
    const index = this.resourceList.findIndex(resource => resource.id === updatedResource.id);
    if (index !== -1) {
      this.resourceList[index] = updatedResource;
      this.updatePaginatedResources();
    }
  }

  onResourceDeleted(deletedResource: Resource): void {
    this.resourceList = this.resourceList.filter(resource => resource.id !== deletedResource.id);
    // Si la página actual queda vacía y no es la primera, retrocede una página
    const totalPages = Math.ceil(this.resourceList.length / this.pageSize);
    if (this.currentPage >= totalPages && this.currentPage > 0) {
      this.currentPage = totalPages - 1;
      if (this.paginator) {
        this.paginator.pageIndex = this.currentPage;
      }
    }
    this.updatePaginatedResources();
  }

}
