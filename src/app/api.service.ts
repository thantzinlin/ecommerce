import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiurl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(url: string, body: any) {
    return this.http.post<any>(`${this.apiurl}${url}`, body);
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiurl}${url}`);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiurl}${url}`, body);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiurl}${url}`, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}${url}`);
  }
}
