import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isAuth: boolean = !!localStorage.getItem('authToken');
  type:string = localStorage.getItem('type') ?? ''

  constructor() { }
}
