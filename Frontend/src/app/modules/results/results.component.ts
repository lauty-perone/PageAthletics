import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Tournament } from '../../models/Torneo';
import { TournamentsService } from '../../services/tournaments.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-results',
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit {


tournaments: Tournament[] = [];

constructor(private tournamentService: TournamentsService, 
  private cdr: ChangeDetectorRef) 
  {
    
  }

  ngOnInit(): void {
    this.showTournaments();
  }

  showTournaments(){
    this.tournamentService.getTorneos().subscribe({
      next: (respuesta) => {
        this.tournaments = respuesta;
        this.cdr.markForCheck();
        console.log('Torneos obtenidos:', respuesta);
      },
      error: (error) => {
        console.error('Error al obtener torneos:', error);
      }
    });
  }

}
