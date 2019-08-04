import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PersistanceService } from 'src/app/services/persistance.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  invalidAttempt = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private persister: PersistanceService) { }

  register(user) {
    //todo
    console.log(user);
    this.router.navigate(['/login']);
  }

}
