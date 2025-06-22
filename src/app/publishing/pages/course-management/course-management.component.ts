import { Component } from '@angular/core';
import {CourseListComponent} from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-course-management',
  imports: [
    CourseListComponent
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {

}
