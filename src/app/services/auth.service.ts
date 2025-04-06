import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`,obj,);
  }

  saveToken(token: string) {
    // تخزين الرمز المميز في Local Storage
    localStorage.setItem('authToken', token);

  }

  getToken(): string | null {
    // استرجاع الرمز المميز من Local Storage
    return localStorage.getItem('authToken');
  }

  logout() {
    // حذف الرمز المميز عند تسجيل الخروج
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    // التحقق من وجود الرمز المميز
    return !!this.getToken();
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUsers`);
  }

  deleteUsers( id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`)
  }

  addUser(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, obj);
  }
}



