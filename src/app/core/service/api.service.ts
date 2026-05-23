import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL = `${environment.apiBaseURL}`;
  private http =inject(HttpClient);
  private api_url ="";
  
  get<T>(url: string) {
    return this.http.get<T>(`${this.apiURL}${url}`);
  }   

  post<T>(url: string, body: any) {
    return this.http.post<T>(`${this.apiURL}${url}`, body);
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(`${this.apiURL}${url}`, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.apiURL}${url}`);
  }
}
