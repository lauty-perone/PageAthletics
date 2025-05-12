import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InstagramService } from '../../services/instagram.service';

@Component({
  selector: 'app-news',
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {
  
  publicaciones: any[] = [];

  constructor(private instagramService : InstagramService){
  }
  
  posts = [
    {
      image: 'img/unlp.png',
      title: 'Primera Publicación',
      description: 'Esto es una breve descripción de la primera publicación.',
    },
    {
      image: 'img/largada.jpg',
      title: 'Segunda Publicación',
      description: 'Esto es una breve descripción de la segunda publicación.',
    },
    {
      image: 'img/front.jpg',
      title: 'Tercera Publicación',
      description: 'Esto es una breve descripción de la tercera publicación.',
    },
    {
      image: 'img/unlp.png',
      title: 'Cuarta Publicación',
      description: 'Esto es una breve descripción de la primera publicación.',
    },
    {
      image: 'img/largada.jpg',
      title: 'Quinta Publicación',
      description: 'Esto es una breve descripción de la segunda publicación.',
    },
    {
      image: 'img/front.jpg',
      title: 'Tercera Publicación',
      description: 'Esto es una breve descripción de la tercera publicación.',
    },
    {
      image: 'img/unlp.png',
      title: 'Cuarta Publicación',
      description: 'Esto es una breve descripción de la primera publicación.',
    },
    {
      image: 'img/largada.jpg',
      title: 'Quinta Publicación',
      description: 'Esto es una breve descripción de la segunda publicación.',
    },
    {
      image: 'img/largada.jpg',
      title: 'Quinta Publicación',
      description: 'Esto es una breve descripción de la segunda publicación.',
    }
  ];

  ngOnInit() {
    this.instagramService.obtenerPublicaciones().subscribe(data => {
      this.publicaciones = data.data;
    });
  }
}
