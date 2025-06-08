import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TournamentsService } from '../../services/tournaments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tournament } from '../../models/Torneo';
import { CreateTournamentComponent } from '../create-tournament/create-tournament.component';

@Component({
  selector: 'app-edit-tournament',
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
  templateUrl: '../create-tournament/create-tournament.component.html',
  styleUrl: '../create-tournament/create-tournament.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTournamentComponent {
  
  torneoForm : FormGroup;

  pruebasDisponibles: string[] = [
    '60','80','100','200', '300','400','600','800', '1500', '3000','5000', '10000',
     '3000 C/OBS',
    'Relevos 4x100', 'Relevos 4x400', 'Salto en largo', 'Salto en alto',
    'Salto con garrocha', 'Bala', 'Disco', 'Jabalina','Martillo', '100 C/V',
    '110 C/V','295 C/V','400 C/V' 
  ];

  carriles: number[] = [ 6 , 8, 9 ]
  
  torneoId!: number;
  selectedTournament!: Tournament;
  editar: boolean = true;

  constructor(private fb: FormBuilder, private tournamentService: TournamentsService,
      private route: ActivatedRoute,private snackBar: MatSnackBar) 
  {
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
    const torneo: Tournament = { ...this.selectedTournament, ...this.torneoForm.getRawValue() };

    console.log("Datos enviados:", torneo);

    this.tournamentService.actualizarTorneo(torneo).subscribe({
      next: () => {
              this.snackBar.open('✅ Torneo actualizado con éxito!', 'Cerrar', { duration: 3000 });
              this.torneoForm.reset();
            },
      error: (err) => this.snackBar.open('❌ Error al actualizar el torneo', 'Cerrar', { duration: 3000 })
    });
}

  ngOnInit(): void {
  this.torneoId = Number(this.route.snapshot.paramMap.get('idTorneo'));

    this.tournamentService.getTorneoPorId(this.torneoId).subscribe(torneo => {
      this.selectedTournament = torneo;
      this.torneoForm.patchValue(torneo); // Cargar los datos en el formulario
    });
  }
} 

