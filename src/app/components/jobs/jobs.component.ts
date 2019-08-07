import { Component } from '@angular/core';
import { PersistanceService } from './../../services/persistance.service';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';
import * as moment from 'moment-timezone';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs: Job[];
  activeJobs: Job[];
  completedJobs: Job[];
  userId;
  loading = true;
  showCompleted = false;
  completedActive = false;
  invalidAttempt = false;
  errorMessage = 'An error occurred. Please refresh page and try again.';

  constructor(
    private jobService: JobService,
    private persister: PersistanceService) {
      this.userId = this.persister.get('user_id');
      if (!this.userId) {
        this.invalidAttempt = true;
        this.errorMessage = 'User_id not set in cache. Cannot get jobs.';
        return;
      }
      this.getJobs();
  }

  getJobs() {
    this.completedActive = false;
    this.loading = true;
    this.jobService.getJobs(this.userId).subscribe(
      (response) => {
        this.jobs = response;
        this.activeJobs = this.jobs.filter(job => !job.completed && !job.removed).sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf());
        this.completedJobs = this.jobs.filter(job => (job.completed && !job.removed) && moment.utc(job.createdAt).format('YYYYMMDD') === moment().format('YYYYMMDD'));
        this.showCompleted = false;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.invalidAttempt = true;
      });
  }

  toggleView() {
    this.showCompleted = !this.showCompleted;
    this.completedActive = this.showCompleted;
    this.invalidAttempt = false;
  }

  addJob(input: HTMLInputElement) {
    if (input.value) {
      const job = new Job(this.persister.get('user_id'), input.value);
      this.jobService.createJob(job).subscribe(
        res => {
          this.activeJobs.splice(0, 0, res);
          input.value = '';
        },
        (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.invalidAttempt = true;
        }
      );
    }
  }

  removeJob(job: Job) {
    this.jobService.deleteJob(job.id).subscribe(
      res => {
        const index = this.activeJobs.indexOf(job);
        this.activeJobs.splice(index, 1);
        $('#astronaut').addClass("show-astronaut")
        setTimeout(function() {
          $('#astronaut').removeClass('show-astronaut');
        }, 2000);
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.invalidAttempt = true;
      }
    );
  }

  completeJob(job: Job) {
    const updated: Job = new Job(this.persister.get('user_id'), job.description, job.id, job.createdAt, true, false);
    this.jobService.updateJob(updated).subscribe(
      res => {
        const index = this.activeJobs.indexOf(job);
        this.completedJobs.splice(0, 0, updated);
        this.activeJobs.splice(index, 1);
        $('#elon').addClass("show-elon")
        setTimeout(function() {
          $('#elon').removeClass('show-elon');
        }, 2000);
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.invalidAttempt = true;
      }
    );
  }
}
