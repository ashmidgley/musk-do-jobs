import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  jobs: Job[];
  completeJobStyling = { 'backgroundColor': '#beed90', 'color': 'green' };
  loading = true;

  constructor(private jobService: JobService, private router: Router, private auth: AuthService) {
    if (!this.auth.loggedIn) {
      this.router.navigate(['/']);
    }
    this.jobService.getAllJobs()
      .subscribe(
        (response) => {
          this.jobs = response.filter(job => job.completed === true
            && moment.utc(job.createdAt).tz('Pacific/Auckland').format('YYYYMMDD')
            === moment().tz('Pacific/Auckland').format('YYYYMMDD'));
          this.loading = false;
        });
   }

  ngOnInit() {}

}