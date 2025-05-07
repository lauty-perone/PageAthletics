import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./modules/header/header.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./modules/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    CommonModule,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PaginaAtletismoUNLP';

  showHeader : boolean= true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.showHeader = event.url !== '/login';
      }
    });
  }
}
