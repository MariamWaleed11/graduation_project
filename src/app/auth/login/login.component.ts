import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router,private global:GlobalService ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Ensures validation messages appear
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.global.isAuth = true;
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome back!',
            timer: 1500, // Auto-close after 1.5 seconds
            showConfirmButton: false
          }).then(() => {
            this.router.navigateByUrl('/'); // ✅ Now it works
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again.',
          timer: 1500, // Auto-close after 1.5 seconds
          showConfirmButton: false
        });
      }
    });
  }
}
