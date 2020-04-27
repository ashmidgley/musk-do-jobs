import { Component } from '@angular/core';
import { Job } from '../../models/job';
declare var $: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs: Job[] = [];
  activeJobs: Job[] = [];
  completedJobs: Job[] = [];
  showCompleted = false;
  completedActive = false;

  toggleView() {
    this.showCompleted = !this.showCompleted;
    this.completedActive = this.showCompleted;
  }

  addJob(input: HTMLInputElement) {
    if (input.value) {
      const job = new Job(input.value);
      this.activeJobs.splice(0, 0, job);
      input.value = '';
    }
  }

  removeJob(job: Job) {
      const index = this.activeJobs.indexOf(job);
      this.activeJobs.splice(index, 1);

      $('#astronaut').addClass("show-astronaut");
      setTimeout(function() {
        $('#astronaut').removeClass('show-astronaut');
      }, 2000);
  }

  completeJob(job: Job) {
    const updated: Job = new Job(job.description, job.createdAt, true, false);
    this.completedJobs.push(updated);
    const index = this.activeJobs.indexOf(job);
    this.activeJobs.splice(index, 1);
    
    $('#elon').addClass("show-elon")
    setTimeout(function() {
      $('#elon').removeClass('show-elon');
    }, 2000);
  }
}
