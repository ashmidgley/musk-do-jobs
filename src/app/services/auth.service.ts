import { PersistanceService } from './persistance.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AUTH_CONFIG } from '../core/auth.config';
import { ENV } from '../core/env.config';
import * as auth0 from 'auth0-js';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    scope: AUTH_CONFIG.SCOPE
  });
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  loggingIn: boolean;

  constructor(private router: Router, private userService: UserService, private persister: PersistanceService) {
    if (!this.tokenValid) {
      this.renewToken();
    } else {
      this.loggedIn = true;
    }
  }

  setLoggedIn(value: boolean) {
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    this.loggingIn = true;
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile?) {
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    const user_id = profile.sub.substring(profile.sub.indexOf('|') + 1, profile.sub.length);
    const provider = profile.sub.substring(0, profile.sub.indexOf('|'));

    this.persister.set('expires_at', expiresAt);
    this.persister.set('access_token', authResult.accessToken);
    this.persister.set('user_name', profile.name);
    this.persister.set('user_id', user_id);
    this.persister.set('provider', provider);

    this.userService.createOrValidateUser(new User(user_id, provider))
      .subscribe(
        (response) => {
          this.setLoggedIn(true);
          this.loggingIn = false;
          this.router.navigate(['/tasks']);
          console.log('Successfully created or validated user.');
        }, (err) => {
          // this.setLoggedIn(false);
          // this.loggingIn = false;
          // this.logout();
          // this.router.navigate(['/']);
          console.error('Error creating or validating user: ' + JSON.stringify(err));
        });
  }

  private _clearExpiration() {
    this.persister.remove('expires_at');
  }

  logout() {
    this._clearExpiration();
    this._auth0.logout({
      clientId: AUTH_CONFIG.CLIENT_ID,
      returnTo: ENV.BASE_URI
    });
  }

  get tokenValid(): boolean {
    return Date.now() < this.persister.get('expires_at');
  }

  renewToken() {
    this._auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this._getProfile(authResult);
      } else {
        if (err) {
          console.error(err);
        }
        this._clearExpiration();
      }
    });
  }
}
