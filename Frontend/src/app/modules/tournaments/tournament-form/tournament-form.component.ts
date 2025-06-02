import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Tournament } from '../../../models/Torneo';
import { TournamentsService } from '../../../services/tournaments.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentFormComponent implements OnInit{

  selectedTournament!: Tournament;
  torneoId!: number;
  formulario! : FormGroup

  constructor(private route: ActivatedRoute, private torneoService: TournamentsService) {
  }

  ngOnInit(): void {
    // Obtener el ID del torneo desde la URL
    this.torneoId = Number(this.route.snapshot.paramMap.get('idTorneo'));
    
    // Buscar los datos del torneo con ese ID
    this.torneoService.getTorneoPorId(this.torneoId).subscribe(torneo => {
      this.selectedTournament = torneo;
    });

    // Inicializar el FormGroup con los campos de la inscripción
    this.formulario = new FormGroup({
      pruebas: new FormControl([]), // Array para guardar las pruebas seleccionadas
      marcas: new FormControl({}) // Objeto para guardar las marcas ingresadas
    });
  }

  inscribirse() {
      console.log(this.formulario.value);
  }
  
  
} 
