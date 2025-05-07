import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentFormComponent {
  pruebas = [
    { nombre: '100 Metros', id: 'prueba100m' },
    { nombre: '400 Metros', id: 'prueba400m' },
    { nombre: 'Salto En Largo', id: 'pruebaSaltoLargo' },
    { nombre: 'Lanzamiento de Jabalina', id: 'pruebaJabalina' }
  ];

  inscripcionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario reactivo
    const group: any = {};
    this.pruebas.forEach((prueba) => {
      group[prueba.id] = new FormControl('', Validators.required);
    });
    this.inscripcionForm = this.fb.group(group);
  }

  onSubmit() {
    if (this.inscripcionForm.valid) {
      console.log('Datos de inscripción:', this.inscripcionForm.value);
      // Procesar datos, enviar al backend, etc.
    } else {
      console.error('El formulario contiene errores.');
    }
  }

  
} 
