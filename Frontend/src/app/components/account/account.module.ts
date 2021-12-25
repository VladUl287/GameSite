import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
