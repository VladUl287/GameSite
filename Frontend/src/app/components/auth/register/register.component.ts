import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  @ViewChild('btnRegister') btnRegister: ElementRef | undefined;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z].{10,}')
    ])
  });;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/auth/login');
      return;
    }
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  register() {
    if (this.registerForm.valid) {
      this.loadingBtn(true, '');
      this.authService.register(this.registerForm).toPromise()
        .then(
          () => this.router.navigateByUrl('/auth/login')
        )
        .catch(
          () => this.loadingBtn(false, 'Ошибка')
        );
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  loadingBtn(loading: boolean, textBtn: string) {
    if (this.btnRegister) {
      let btn = this.btnRegister.nativeElement;
      if (loading) {
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