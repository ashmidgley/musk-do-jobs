import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.handleAuth();
  }

}
