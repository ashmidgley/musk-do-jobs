import { PersistanceService } from './../../services/persistance.service';
import { AuthService } from './../../services/auth.service';
import { trigger, style, transition, animate, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';
import { bounceOutLeftAnimation, fadeInAnimation } from '../../core/animations';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
declare var $: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [
    trigger('jobAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1s'
          }
        })
      ]),
      transition(':leave', [
        style( { backgroundColor: '#ff4c4c', borderColor: 'red', color: 'red' }),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ])
    ])
  ]
})
export class JobsComponent {
  jobs: Job[];
  completeJobStyling = { 'backgroundColor': '#beed90', 'color': 'green' };
  loading = true;
  showCompleted = false;
  completedActive = false;
  title: string;
  subtitle = 'Clocks ticking';
  faStopwatch = faStopwatch;

  constructor(
    private jobService: JobService,
    private router: Router,
    private persister: PersistanceService,
    private authService: AuthService) {
    if (!this.persister.get('user_id')) {
      console.log('user_id not set in cache.');
      this.authService.logout();
      return;
    }
    this.title = this.persister.get('user_name') + "'s tasks";
    this.getActiveJobs();
  }

  getActiveJobs() {
    this.completedActive = false;
    this.loading = true;
    this.jobService.getJobs().subscribe(
      (response) => {
        this.jobs = response.sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf());
        this.showCompleted = false;
        this.loading = false;
      });
  }

  getCompletedJobs() {
    this.completedActive = true;
    this.loading = true;
    this.jobService.getAllJobs().subscribe(
        (response) => {
          this.jobs = response.filter(job => job.completed === true
            && moment.utc(job.createdAt).tz('Pacific/Auckland').format('YYYYMMDD')
            === moment().tz('Pacific/Auckland').format('YYYYMMDD'));
          this.showCompleted = true;
          this.loading = false;
        });
  }

  addJob(input: HTMLInputElement) {
    if (input.value) {
      const job = new Job(this.persister.get('user_id'), input.value);
      this.jobService.createJob(job).subscribe();
      this.jobs.splice(0, 0, job);
      input.value = '';
    }
  }

  removeJob(job: Job) {
    this.jobService.deleteJob(job.id).subscribe();
    const index = this.jobs.indexOf(job);
    this.jobs.splice(index, 1);
  }

  completeJob(job: Job) {
    const updated: Job = new Job(this.persister.get('user_id'), job.description, true);
    this.jobService.updateJob(updated).subscribe();
    const index = this.jobs.indexOf(job);
    const selector = '#job-' + index;
    $(selector).hide();
    $(selector + ' > div > button').prop('disabled', true);
    $(selector).css(this.completeJobStyling).fadeIn(1500);
  }
}
