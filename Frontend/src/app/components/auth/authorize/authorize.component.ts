import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizeComponent implements OnInit {
  @ViewChild('btnLogin') btnLogin: ElementRef | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/games');
      return;
    }
  }

  authForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }

  authorize() {
    if(this.authForm.valid) {
      this.loadingBtn(true, '');
      this.authService.login(this.authForm).toPromise()
        .then(
          (data: any) => {
            this.loadingBtn(false, 'Войти');
            localStorage.setItem('token', data.token);
            this.router.navigateByUrl('/games');
          }
        )
        .catch(
          (error: HttpErrorResponse) => {
            if(error.status == 400) {
              this.loadingBtn(false, error.error);
            }
          }
        );
    }
    else {
      this.authForm.markAllAsTouched();
    }
  }

  loadingBtn(loading: boolean, textBtn: string) {
    if(this.btnLogin) {
      let btn = this.btnLogin.nativeElement;
      if(loading) {
        btn.textContent = '';
        btn.classList.add('loading-ring');
      }
      else {
        btn.textContent = textBtn;
        btn.classList.remove('loading-ring');
      }
    }
  }
}
