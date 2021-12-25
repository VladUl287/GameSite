import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getUser(id: Guid): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'api/user/' + id);
  }

  getUserToken() {
    let token = localStorage.getItem('token');
    if(token != null) {
      let parseToken =  JSON.parse(window.atob(token.split('.')[1]));
      return parseToken;
    }
    return null;
  }
}
