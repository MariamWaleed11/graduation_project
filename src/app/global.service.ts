import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
 
  userName = localStorage.getItem('user_name') ?? '';
  is_login = localStorage.getItem('user_token') ? true : false;

  constructor() { }
  
  
   
  

}
