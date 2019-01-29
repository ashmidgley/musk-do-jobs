import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'My Checklist';
  subtitle = 'Clocks ticking buddy';
  faStopwatch = faStopwatch;

  constructor(public auth: AuthService) { }

  ngOnInit() { }

}
