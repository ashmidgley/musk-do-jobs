import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  private _userId: string;

  auth0 = new auth0.WebAuth({
    clientID: '3RcpGHB28xYl4YuIo6Rxacmwn2yxNWoR',
    domain: 'huh.au.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(public router: Router, public userService: UserService) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
    this._userId = '';
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  get userId(): string {
    return this._userId;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          if (profile) {
            const temp = profile['sub'];
            this._userId = temp.substring(temp.indexOf('|') + 1, temp.length);
            const provider = temp.substring(0, temp.indexOf('|'));
            const user = new User(this._userId, provider);
            this.userService.createOrValidateUser(user).subscribe(
              (response) => {
                console.log('createOrValidateUser successfully called.');
              });
          } else {
            console.error(`No profile provided by Auth0 for access token ${authResult.accessToken}`);
          }
         });
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/to-do']);
      } else if (err) {
        this.router.navigate(['/error']);
      }
    });
  }

  private localLogin(authResult): void {
    localStorage.setItem('isLoggedIn', 'true');
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    return new Date().getTime() < this._expiresAt;
  }

}
