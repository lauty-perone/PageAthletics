import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCell, MatHeaderCell, MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  PersonaService } from '../../services/Persona.service';
import {  MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-athletes',
  imports: [
    MatTableModule,
    CommonModule,
    MatHeaderCell,
    MatCell,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormField,
    MatLabel,
    MatInputModule
    
  ],
  templateUrl: './athletes.component.html',
  styleUrl: './athletes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AthletesComponent implements OnInit{
  
  displayedColumns: string[] = ['name', 'fechaNacimiento', 'club'];
  dataSource = new MatTableDataSource<any>();

  textoBusqueda = '';
  
  cantidadTotal = 0;
  cantidadPorPagina = 10;
  numeroDePagina = 0;
  opcionesDePaginado: number[] = [1,5,10,25,100];

  constructor(private personaService: PersonaService) {}
  
  ngOnInit(){
    this.LeerTodo();
  }

  LeerTodo(){
    this.personaService.LeerTodo(this.cantidadPorPagina, this.numeroDePagina, this.textoBusqueda )
      .subscribe((respuesta: any) => { 
         this.dataSource.data = respuesta.datos;
         this.cantidadTotal = respuesta.totalRegistros; 
      });
  }

  cambiarPagina(event : any){
    this.cantidadPorPagina = event.pageSize;
    this.numeroDePagina = event.pageIndex;

    this.LeerTodo();
  }

}
