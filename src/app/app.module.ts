import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    FooterComponent,
    CallbackComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'callback', component: CallbackComponent, pathMatch: 'prefix' },
      { path: 'jobs', component: JobsComponent }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
