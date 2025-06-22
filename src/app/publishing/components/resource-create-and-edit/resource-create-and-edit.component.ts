import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Resource} from '../../model/resource.entity';
import {Course} from '../../model/course.entity';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import {CoursesService} from '../../services/courses.service';
import {ResourcesService} from '../../services/resources.service';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-resource-create-and-edit',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatFormField,
    MatDialogActions,
    MatInput,
    MatButton,
    MatDialogClose,
    NgClass,
    MatLabel,
    NgIf
  ],
  templateUrl: './resource-create-and-edit.component.html',
  styleUrl: './resource-create-and-edit.component.css'
})
export class ResourceCreateAndEditComponent {

  // Attributes
  topicId: string;
  newResource: Resource; // Replace 'any' with the actual type of your resource
  editMode: boolean = false;
  showIncompleteError = false;
  @Output() resourceAdded: EventEmitter<Resource> = new EventEmitter<Resource>();
  @Output() resourceUpdated: EventEmitter<Resource> = new EventEmitter<Resource>();

  // Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private resourcesService: ResourcesService, private dialogRef: MatDialogRef<ResourceCreateAndEditComponent>) {
    this.topicId = data?.topicId ?? '';
    this.newResource = data?.resource ? { ...data.resource } : new Resource();
    this.editMode = data?.editMode ?? false;
  }

  // Private methods

  // CRUD Actions
  private createResource(): void {
    this.resourcesService.create(this.newResource)
      .subscribe((response: any) => {
        this.resourceAdded.emit(response);
      });
  }

  private updateResource(): void {
    this.resourcesService.update(this.newResource.id, this.newResource)
      .subscribe((response: any) => {
        this.resourceUpdated.emit(response);
      });
  }

  // Event handlers
  onSubmit(): void {
    this.newResource.topicId = this.topicId;

    const isEmpty =
      !this.newResource.title || this.newResource.title.trim() === '' ||
      !this.newResource.description || this.newResource.description.trim() === '' ||
      !this.newResource.youtubeId || this.newResource.youtubeId.trim() === '';

    if (isEmpty) {
      this.showIncompleteError = true;
      return;
    }
    this.showIncompleteError = false;

    if (this.editMode) {
      this.updateResource();
    } else {
      this.createResource();
    }
    this.dialogRef.close(true);
  }


}
