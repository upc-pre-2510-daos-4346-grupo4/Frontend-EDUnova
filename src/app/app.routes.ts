import { Routes } from '@angular/router';

import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {CourseManagementComponent} from './publishing/pages/course-management/course-management.component';
import { TopicManagementComponent } from './publishing/pages/topic-management/topic-management.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'publishing/courses', component: CourseManagementComponent },
  { path: 'publishing/topics/:id', component: TopicManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];
