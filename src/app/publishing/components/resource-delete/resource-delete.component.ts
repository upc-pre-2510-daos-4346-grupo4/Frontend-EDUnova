import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Resource} from '../../model/resource.entity';
import {Course} from '../../model/course.entity';
import {ResourcesService} from '../../services/resources.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-resource-delete',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './resource-delete.component.html',
  styleUrl: './resource-delete.component.css'
})
export class ResourceDeleteComponent {
  // Attributes
  selectedResource: Resource; // Replace 'any' with the actual type of your resource
  @Output() resourceDeleted: EventEmitter<Resource> = new EventEmitter<Resource>();

  //Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private resourcesService: ResourcesService) {
    this.selectedResource = data?.resource ? { ...data.resource } : new Resource();
  }

  // Private methods
  // CRUD Actions
  private deleteResource(): void {
    this.resourcesService.delete(this.selectedResource.id)
      .subscribe((response: any) => {
        this.resourceDeleted.emit(this.selectedResource);
      });
  }

  // Event Handlers
  onDelete(): void {
    this.deleteResource();
  }

}
