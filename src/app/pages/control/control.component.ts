import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-control',
  standalone: false,
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent {
  selectedTab: string = 'add';
  loginForm: FormGroup;
  isSubmitted = false;
  users: any[] = [];
  logs = [
    { id: 1, user: 'Ahmed', action: 'Added User', date: '2025-03-04T14:23:45' },
    { id: 2, user: 'Mohamed', action: 'Deleted User', date: '2025-03-03T10:15:30' }
  ];
  filteredLogs = [...this.logs];
  logDate: string = '';
  logName: string = '';

  constructor(private fb: FormBuilder, private apiService: AuthService) {
    this.loginForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  handleSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUsers(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }

  filterLogs() {
    this.filteredLogs = this.logs.filter(log =>
      (this.logDate ? log.date.includes(this.logDate) : true) &&
      (this.logName ? log.user.toLowerCase().includes(this.logName.toLowerCase()) : true)
    );
  }
}
