import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGenreRoutingModule } from './create-genre-routing.module';
import { CreateGenreComponent } from './create-genre.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateGenreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NavbarModule,
    CreateGenreRoutingModule
  ]
})
export class CreateGenreModule { }
