import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../models/Torneo';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tournament',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './create-tournament.component.html',
  styleUrl: './create-tournament.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTournamentComponent {

  torneoForm: FormGroup;
  editar: boolean = false;

  pruebasDisponibles: string[] = [
    '60','80','100','200', '300','400','600','800', '1500', '3000','5000', '10000',
     '3000 C/OBS',
    'Relevos 4x100', 'Relevos 4x400', 'Salto en largo', 'Salto en alto',
    'Salto con garrocha', 'Bala', 'Disco', 'Jabalina','Martillo', '100 C/V',
    '110 C/V','295 C/V','400 C/V' 
  ];

  carriles: number[] = [ 6 , 8, 9 ]

  constructor(private fb: FormBuilder, private tournamentService: TournamentsService
    , private snackBar: MatSnackBar) {
    this.torneoForm = this.fb.group({
      name: [''],
      fechaTorneo: [''],
      lugar: [''],
      pruebas: [[]],
      fechaInicioInscripcion: [''],
      fechaFinInscripcion: [''],
      cantidadCarriles: [''],
      resultadosUrl: ['']
    });
  }

  guardar(): void {
    const torneo: Tournament = this.torneoForm.getRawValue();

    console.log("Datos:" , torneo)
    this.tournamentService.createTorneo(torneo).subscribe({
      next: () => {
              this.snackBar.open('✅ Torneo guardado con éxito!', 'Cerrar', { duration: 3000 });
              this.torneoForm.reset()
            },
      error: (err) => this.snackBar.open('❌ Error al guardar el torneo', 'Cerrar', { duration: 3000 })

    });
  }

} 

