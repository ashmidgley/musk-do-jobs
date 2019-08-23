import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  loading = false;
  invalidAttempt = false;
  errorMessage;
  successful = false;

  constructor(private authService: AuthService) { }

  register(user) {
    this.loading = true;
    this.invalidAttempt = false;
    this.authService.existingUsername(user.username).subscribe(
      res => {
        if(res) {
          this.errorMessage = 'Username already in use. Please choose another and try again.';
          this.invalidAttempt = true;
          this.loading = false;
          return;
        }
        var ePass = window.btoa(user.password);
        var newUser = new User(user.username, ePass);
        this.authService.createUser(newUser).subscribe(
          res => {
            this.successful = true;
          },
          (err: HttpErrorResponse) => {
            this.errorMessage = err.message;
            this.invalidAttempt = true;
          },
          () => {
            this.loading = false;
          }
        );
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.invalidAttempt = true;
      },
      () => {
        this.loading = false;
      }
    );
  }

}
