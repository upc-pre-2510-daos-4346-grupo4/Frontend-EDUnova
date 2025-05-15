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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EDUnova-FrontEnd';

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  options = [
    { icon: 'home', path: '/home', title: 'Home'},
    { icon: 'info', path:'/about', title: 'About'}
  ];

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)']) // Observa el ancho de la pantalla
      .subscribe((response) => {  // Se suscribe a los cambios en el ancho de la pantalla
        if (response.matches) { // Si el ancho de la pantalla es menor a 1280px
          this.sidenav.mode = 'over'; // Se despliega sobre el contenido
          this.sidenav.close(); // Se cierra
        } else {
          this.sidenav.mode = 'side'; // Se despliega al lado del contenido
          this.sidenav.open();  // Se abre
        }
      });
  }
}
