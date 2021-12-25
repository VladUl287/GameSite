import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  login(form: FormGroup) {
    return this.http.post(this.baseUrl + 'api/auth/login', this.getFormData(form));
  }

  register(form: FormGroup) {
    return this.http.post(this.baseUrl + 'api/auth/register', this.getFormData(form));
  }

  private getFormData(form: FormGroup): FormData {
    const formData: FormData = new FormData();
    Object.keys(form.controls).forEach((key: string) => {
      formData.append(key, form.controls[key].value);
    });
    return formData;
  }
}
