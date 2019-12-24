import { Job } from '../models/job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  readonly ROOT_URL = environment.apiUrl + '/jobs';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Api-Key': environment.apiKey
    })
  };

  constructor(private http: HttpClient) {}

  getJobs(userId): Observable<Job[]> {
    const url = `${this.ROOT_URL}/${userId}`;
    return this.http.get<Job[]>(url, this.httpOptions);
  }
  
  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.ROOT_URL, job, this.httpOptions);
  }

  updateJob (job: Job): Observable<Job> {
    return this.http.put<Job>(this.ROOT_URL, job, this.httpOptions);
  }

  deleteJob(id: number): Observable<{}> {
    const url = `${this.ROOT_URL}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
