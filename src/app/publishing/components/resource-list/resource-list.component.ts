import {Component, Input, OnInit} from '@angular/core';
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
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {YouTubePlayer} from '@angular/youtube-player';
import {MatButton} from '@angular/material/button';
import {TopicListComponent} from '../topic-list/topic-list.component';

@Component({
  selector: 'app-resource-list',
  imports: [
    YouTubePlayer,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardTitle,
    TopicListComponent
  ],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css'
})
export class ResourceListComponent implements OnInit{
  // Attributes
  @Input() topicId!: number; // Receives the topicId
  resourceData: Resource;
  resourceList: Resource[];
  isEditMode: boolean;

  // Constructor
  constructor(private resourcesService: ResourcesService) {
    this.isEditMode = false;
    this.resourceData = {} as Resource;
    this.resourceList = [];
  }

  // CRUD Actions
  public getAllResources(): void {
    this.resourcesService.getAll()
      .subscribe((response: any) => {
        this.resourceList = response.filter((resource: Resource) => resource.topicId === this.topicId);
        console.log(this.resourceList);
      });
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    this.getAllResources();
  }

}
