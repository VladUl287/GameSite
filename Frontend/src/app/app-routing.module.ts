import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'games'
  },
  { 
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'account/:id',
    loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'games',
    loadChildren: () => import('./components/all-games/all-games.module').then(m => m.AllGamesModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'games/main/:id',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'games/create',
    loadChildren: () => import('./components/create-game/create-game.module').then(m => m.CreateGameModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'genres/create',
    loadChildren: () => import('./components/create-genre/create-genre.module').then(m => m.CreateGenreModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
