import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGameComponent } from './create-game.component';
import { CreateGameRoutingModule } from './create-game-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    CreateGameComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    ReactiveFormsModule,
    CreateGameRoutingModule
  ]
})
export class CreateGameModule { }
