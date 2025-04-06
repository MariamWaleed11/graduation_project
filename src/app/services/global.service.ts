import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isAuth: boolean = !!localStorage.getItem('authToken');
  user_role: string = localStorage.getItem('user_role') ?? '';
  user_mission: string = localStorage.getItem('user_mission') ?? '';

  constructor() {
  }
}
