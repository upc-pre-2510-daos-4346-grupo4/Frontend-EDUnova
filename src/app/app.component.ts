import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { BreakpointObserver } from "@angular/cdk/layout";
import { TranslateService } from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";

import { FooterContentComponent } from './public/components/footer-content/footer-content.component';
import { TranslateModule } from "@ngx-translate/core";
import {AuthenticationSectionComponent} from './iam/components/authentication-section/authentication-section.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent,
    FooterContentComponent, TranslateModule, AuthenticationSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EDUnova-FrontEnd';

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  options = [
    { icon: 'home', path: '/home', title: 'home'},
    { icon: 'edit', path: '/publishing/courses', title: 'courseManagement'},
    { icon: 'school', path: '/studying', title: 'studying' },
    { icon: 'person', path: '/profile', title: 'profile' },
    { icon: 'info', path:'/about', title: 'about'},

  ];

  isSmallScreen = false;

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 900px)']) // Ajusta el breakpoint según necesidad
      .subscribe((response) => {
        this.isSmallScreen = response.matches;
        if (response.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        }
      });
  }
}
