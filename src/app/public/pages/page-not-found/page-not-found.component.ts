import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [
    RouterLink
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  currentPath: string;

  constructor(private location: Location) {
    this.currentPath = location.path() || '/';
  }
}
