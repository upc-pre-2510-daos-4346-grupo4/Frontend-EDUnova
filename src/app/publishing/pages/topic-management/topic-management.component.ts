import {Component, OnInit} from '@angular/core';
import {ObjectiveListComponent} from '../../components/objective-list/objective-list.component';
import { ActivatedRoute } from '@angular/router';
import {ResourceListComponent} from '../../components/resource-list/resource-list.component';

@Component({
  selector: 'app-topic-management',
  imports: [
    ObjectiveListComponent,
    ResourceListComponent
  ],
  templateUrl: './topic-management.component.html',
  styleUrl: './topic-management.component.css'
})
export class TopicManagementComponent implements OnInit{
  topicId!: number; // Recibe el topicId

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.topicId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
