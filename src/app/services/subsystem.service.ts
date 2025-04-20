import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsystemService {

  private apiUrl = 'https://api.example.com'; // قم بتغيير هذا إلى الـ API الفعلي الخاص بك

  constructor(private http: HttpClient) { }

  getThermals(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/thermals`);
  }

  getTelemetries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/telemetries`);
  }

  getPowers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/powers`);
  }

  getPayloads(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/payloads`);
  }

  getOBCs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obcs`);
  }

  getGPS(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/gps`);
  }

  getControls(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/controls`);
  }

  getCommunications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/communications`);
  }
}
