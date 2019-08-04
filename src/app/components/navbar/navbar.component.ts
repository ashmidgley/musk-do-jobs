import { PersistanceService } from './../../services/persistance.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userName: string;
  stickyActivated = false;

  constructor(public auth: AuthService, private persister: PersistanceService) { }

  ngOnInit() {
    this.userName = this.persister.get('user_name');
    window.addEventListener('scroll', this.scroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll);
  }

  scroll = (): void => {
    if(window.pageYOffset == 0) {
      this.stickyActivated = false;
    } else {
      this.stickyActivated = true;
    }
  };

  logout() {
    this.userName = '';
    this.auth.logout();
  }
}