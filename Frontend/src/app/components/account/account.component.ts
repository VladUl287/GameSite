import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  user: User | undefined;
  isAdmin: boolean = false;

  constructor( 
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    let token = this.userService.getUserToken();
    if(!token) {
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.getUser(token.id);
    if(token.role == 'Admin') {
      this.isAdmin = true;
      this.cd.markForCheck();
    }
  }

  getUser(id: Guid) {
    this.userService.getUser(id).toPromise()
      .then(
        (data: User) => {
          this.user = data;
          this.cd.markForCheck();
        })
      .catch(
        (error: HttpErrorResponse) => {
          if (error.status == 404) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/auth/login');
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }
}
