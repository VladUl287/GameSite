import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllGamesRoutingModule } from './all-games-routing.module';
import { AllGamesComponent } from './all-games.component';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    AllGamesComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    AllGamesRoutingModule
  ]
})
export class AllGamesModule { }
