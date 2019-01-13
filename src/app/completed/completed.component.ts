import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { JobService } from '../job.service';
import * as moment from 'moment';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  jobs: Job[];
  completeJobStyling = { 'backgroundColor': '#beed90', 'color': 'green' };
  loading = true;

  constructor(private jobService: JobService) {
    const d = new Date();
    d.setHours(d.getHours() - 24);
    this.jobService.getAllJobs()
      .subscribe(
        (response) => {
          this.jobs = response.filter(job => moment(job.createdAt).valueOf() > moment(d).valueOf());
          this.loading = false;
        });
   }

  ngOnInit() {
  }

}
