import { PersistanceService } from './../../services/persistance.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;

  constructor(public auth: AuthService, private persister: PersistanceService) { }

  ngOnInit() {
    this.userName = this.persister.get('user_name');
  }

}
