import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {GlobalService} from '../../services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payload',
  standalone: false,
  templateUrl:'./payload.component.html',
  styleUrl: './payload.component.css'
})
export class PayloadComponent {
  selectedTab: string = 'add';
  loginForm: FormGroup;
  isSubmitted = false;
  users: any[] = [];
  logs = [
    {id: 1, user: 'Ahmed', action: 'Added User', date: '2025-03-04T14:23:45'},
    {id: 2, user: 'Mohamed', action: 'Deleted User', date: '2025-03-03T10:15:30'}
  ];
  filteredLogs = [...this.logs];
  logDate: string = '';
  logName: string = '';

  constructor(private fb: FormBuilder, private apiService: AuthService, public global: GlobalService) {
    console.log(this.global.user_role);
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.apiService.addUser(this.loginForm.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User added successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.loginForm.reset(); // Reset form
            this.isSubmitted = false; // Reset validation state
            this.users = data
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error?.message || 'Something went wrong. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }




  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUsers(id).subscribe({
          next: (data ) => {
            this.users = data
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'User has been deleted successfully.',
              confirmButtonText: 'OK'
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: err.error?.message || 'Something went wrong. Please try again.',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }


  filterLogs() {
    this.filteredLogs = this.logs.filter(log =>
      (this.logDate ? log.date.includes(this.logDate) : true) &&
      (this.logName ? log.user.toLowerCase().includes(this.logName.toLowerCase()) : true)
    );
  }

}
