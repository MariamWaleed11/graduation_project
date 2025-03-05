import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-telemetry',
  standalone: false,
  templateUrl: './telemetry.component.html',
  styleUrl: './telemetry.component.css'
})
export class TelemetryComponent {
   selectedTab: string = 'home';
  //  // الافتراضي الصفحة الرئيسية

   loginForm: FormGroup;
    isSubmitted = false;
    users: any[] = [];

  
    constructor(  private fb: FormBuilder, private router: Router ,private apiService: AuthService) {
      this.loginForm = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: ['', Validators.required],
        // mission: ['', Validators.required],
      });
    }
 
  
    handleSubmit() {
      this.isSubmitted = true;
    
    } 
 
    ngOnInit() {
      this.fetchUsers();
      this.filteredLogs = [...this.logs];
    }
  
    fetchUsers() {
      this.apiService.getUsers().subscribe(data => {
        this.users = data;
      });
    }
  
    deleteUser(id: number) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.apiService.deleteUsers(id).subscribe(() => {
          this.users = this.users.filter(user => user.id !== id);
        });
      }
    }
 

    logs: any[] = [
      { id: 1, user: 'Ahmed', action: 'Added User', date: '2025-03-04T14:23:45' },
      { id: 2, user: 'Mohamed', action: 'Deleted User', date: '2025-03-03T10:15:30' },
      { id: 3, user: 'Sara', action: 'Updated Profile', date: '2025-03-04T16:40:20' },
      { id: 4, user: 'Ali', action: 'Logged In', date: '2025-03-02T09:05:10' }
    ];
  
    filteredLogs: any[] = [];
    logDate: string = '';
    logName: string = '';
  
    // ngOnInit() {
    //   this.filteredLogs = [...this.logs]; // Copy logs on component load
    // }
  
    filterLogs() {
      this.filteredLogs = this.logs.filter(log => {
        const logDateOnly = log.date.split('T')[0]; // Extract date without time
        const matchesDate = this.logDate ? logDateOnly === this.logDate : true;
        const matchesName = this.logName ? log.user.toLowerCase().includes(this.logName.toLowerCase()) : true;
        return matchesDate && matchesName;
      });
    }
}


