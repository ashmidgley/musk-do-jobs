import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  stickyActivated = false;

  ngOnInit() {
    window.addEventListener('scroll', this.scroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll);
  }

  scroll = (): void => {
    if(window.innerWidth < 600 || window.pageYOffset == 0) {
      this.stickyActivated = false;
    } else {
      this.stickyActivated = true;
    }
  };
}