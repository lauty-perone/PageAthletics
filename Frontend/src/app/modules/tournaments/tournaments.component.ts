import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {  RouterModule } from '@angular/router';
import { Tournament } from '../../models/Torneo';
import { TournamentsService } from '../../services/tournaments.service';

@Component({
  selector: 'app-tournaments',
  imports: [
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentsComponent implements OnInit {
  

  tournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentsService, 
    private cdr: ChangeDetectorRef) 
    {
      
    }

  ngOnInit() {
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

  isInscripcionAbierta(tournament: Tournament): boolean {
    const hoy = new Date();
    return hoy >= new Date(tournament.fechaInicioInscripcion) && hoy <= new Date(tournament.fechaFinInscripcion);
  }
}
