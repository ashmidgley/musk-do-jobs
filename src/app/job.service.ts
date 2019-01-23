import { Job } from './models/job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  readonly ROOT_URL = 'https://checklist-backend.azurewebsites.net/api/values';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    const url = `${this.ROOT_URL}`;
    return this.http.get<Job[]>(url, this.httpOptions);
  }

  getAllJobs(): Observable<Job[]> {
    const url = `${this.ROOT_URL}/All`;
    return this.http.get<Job[]>(url, this.httpOptions);
  }

  getJob(jobName: string): Observable<Job> {
    const url = `${this.ROOT_URL}/${jobName}`;
    return this.http.get<Job>(url, this.httpOptions);
  }

  createJob(job: Job): Observable<Job> {
    const url = `${this.ROOT_URL}`;
    return this.http.post<Job>(url, job, this.httpOptions);
  }

  updateJob (job: Job): Observable<Job> {
    const url = `${this.ROOT_URL}/${job.name}`;
    return this.http.put<Job>(url, job, this.httpOptions);
  }

  deleteJob(jobName: string): Observable<{}> {
    const url = `${this.ROOT_URL}/${jobName}`;
    return this.http.delete(url, this.httpOptions);
  }
}
