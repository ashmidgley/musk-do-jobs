import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated) {
      this.authService.login();
    } else {
      this.router.navigate(['/to-do']);
    }
  }

}
