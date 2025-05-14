import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NewsComponent } from './modules/news/news.component';
import { AthletesComponent } from './modules/athletes/athletes.component';
import { ResultsComponent } from './modules/results/results.component';
import { TournamentsComponent } from './modules/tournaments/tournaments.component';
import { ContactComponent } from './modules/contact/contact.component';
import { MainComponent } from './modules/main/main/main.component';
import { TournamentFormComponent } from './modules/tournaments/tournament-form/tournament-form.component';
import { ProfileComponent } from './users/profile/profile.component';
import { CreateTournamentComponent } from './admin/create-tournament/create-tournament.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : '/main'
    },
    
    { path :  'main',component:MainComponent},
    
    { path: 'login' , component:LoginComponent},
    
    { path : 'noticias', component:NewsComponent},
    
    { path : 'atletas', component:AthletesComponent},
    
    { path : 'resultados', component:ResultsComponent},
    
    { path : 'torneos', component:TournamentsComponent},
    
    { path : 'contacto', component:ContactComponent},

    { path: 'formulario/:idTorneo', component: TournamentFormComponent },
    
    { path : 'perfil', component:ProfileComponent},
    
    { path : 'crearTorneo', component:CreateTournamentComponent}

];
