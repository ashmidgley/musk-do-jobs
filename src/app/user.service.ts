import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly ROOT_URL = 'https://checklist-backend.azurewebsites.net/api/values';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(public http: HttpClient) {}

  createOrValidateUser(user: User): Observable<User> {
    const url = `${this.ROOT_URL}/user`;
    return this.http.post<User>(url, user, this.httpOptions);
  }
}
