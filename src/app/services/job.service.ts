import { PersistanceService } from './persistance.service';
import { Job } from '../models/job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  readonly ROOT_URL = 'https://checklist-backend.azurewebsites.net/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private auth: AuthService, private persister: PersistanceService) {}

  getJobs(): Observable<Job[]> {
    const userId = this.persister.get('user_id');
    if (userId) {
      const url = `${this.ROOT_URL}/job/${userId}`;
      return this.http.get<Job[]>(url, this.httpOptions);
    } else {
      console.log('Could not get User ID from local storage');
    }
  }

  getAllJobs(): Observable<Job[]> {
    const userId = this.persister.get('user_id');
    if (userId) {
      const url = `${this.ROOT_URL}/job/all/${userId}`;
      return this.http.get<Job[]>(url, this.httpOptions);
    } else {
      console.log('Could not get User ID from local storage');
    }
  }

  getJob(jobName: string): Observable<Job> {
    const userId = this.persister.get('user_id');
    if (userId) {
      const url = `${this.ROOT_URL}/job/${userId}/${jobName}`;
      return this.http.get<Job>(url, this.httpOptions);
    } else {
      console.log('Could not get User ID from local storage');
      return;
    }
  }

  createJob(job: Job): Observable<Job> {
    const userId = this.persister.get('user_id');
    if (userId) {
    const url = `${this.ROOT_URL}/job/${userId}`;
    return this.http.post<Job>(url, job, this.httpOptions);
    } else {
      console.log('Could not get User ID from local storage');
      return;
    }
  }

  updateJob (job: Job): Observable<Job> {
    const userId = this.persister.get('user_id');
    if (userId) {
      const url = `${this.ROOT_URL}/job/${userId}/${job.name}`;
      return this.http.put<Job>(url, job, this.httpOptions);
    } else {
      console.log('Could not get User ID from local storage');
      return;
    }
  }

  deleteJob(jobName: string): Observable<{}> {
    const userId = this.persister.get('user_id');
    if (userId) {
    const url = `${this.ROOT_URL}/job/${userId}/${jobName}`;
    return this.http.delete(url, this.httpOptions);
    } else {
      console.log('Could not get User ID from local storage');
      return;
    }
  }
}
