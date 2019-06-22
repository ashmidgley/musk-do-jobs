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
          //A client-side or network error occurred.				 
          console.log('An error occurred:', err.error.message);
        } else {
          //Backend returns unsuccessful response codes such as 404, 500 etc.
          this.invalidAttempt = true;
        }
      }
    );
  }

}
