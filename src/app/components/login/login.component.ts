import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/services/persistance.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  loading = false;
  invalidAttempt = false;
  errorMessage;

  constructor(
    private authService: AuthService,
    private router: Router,
    private persister: PersistanceService) { }

  login(input) {
    this.loading = true;
    var ePass = window.btoa(input.password);
    var user = new User(input.username, ePass);
    this.authService.authorize(user).subscribe(
      res => {
        this.persister.set('user_id', res.id);
        this.persister.set('user_name', res.username);
        this.router.navigate(['/tasks']);
      },
      (err: HttpErrorResponse) => {
        if(err.status == 400) {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = err.message;
        }
        this.invalidAttempt = true;
      }
    );
    this.loading = false;
  }
}
