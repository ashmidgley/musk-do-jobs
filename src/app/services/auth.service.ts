import { PersistanceService } from './persistance.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly ROOT_URL = environment.apiUrl + '/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private router: Router, 
    private persister: PersistanceService, 
    public http: HttpClient) {}

  logout() {
    this.persister.remove('user_id');
    this.persister.remove('user_name');
    this.router.navigate(['']);
  }

  createUser(user: User): Observable<User> {
    const url = this.ROOT_URL;
    return this.http.post<User>(url, user, this.httpOptions);
  }

  authorize(user: User): Observable<User> {
    const url = this.ROOT_URL + '/auth';
    return this.http.post<User>(url, user, this.httpOptions);
  }
}
