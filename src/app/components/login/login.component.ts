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
  invalidAttempt = false;
  errorMessage = 'Invalid attempt. Please try again.';

  constructor(
    private authService: AuthService,
    private router: Router,
    private persister: PersistanceService) { }

  login(user) {
    this.authService.authorize(user).subscribe(
      res => {
        this.persister.set('user_id', res.id);
        this.persister.set('user_name', res.username);
        this.router.navigate(['/tasks']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {		 
          this.errorMessage = 'Client side error: ' + err.error.message;
        } else {
          this.errorMessage = 'Backend error: ' + err.error.message;
        }
        this.invalidAttempt = true;
      }
    );
  }

}
