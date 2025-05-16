import { Routes } from '@angular/router';

import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { StudyingComponent } from './studying/studying.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'studying', component: StudyingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
