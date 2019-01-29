import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json', null);
  }
}
