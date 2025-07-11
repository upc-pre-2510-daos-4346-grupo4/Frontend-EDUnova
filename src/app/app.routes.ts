import { Routes } from '@angular/router';

import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {CourseManagementComponent} from './publishing/pages/course-management/course-management.component';
import { TopicManagementComponent } from './publishing/pages/topic-management/topic-management.component';
import { StudyingComponent } from './studying/studying.component';
import { ProfilePageComponent } from './presenting/pages/profile-page/profile-page.component';
import { authenticationGuard } from './iam/services/authentication.guard';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'publishing/courses', component: CourseManagementComponent, canActivate: [authenticationGuard] },
  { path: 'publishing/topics/:id', component: TopicManagementComponent, canActivate: [authenticationGuard] },
  { path: 'studying', component: StudyingComponent, canActivate: [authenticationGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authenticationGuard] },
  { path: 'sign-in', component:SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];
