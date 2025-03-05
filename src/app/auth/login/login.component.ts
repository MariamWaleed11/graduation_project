import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule
],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private global: GlobalService) {
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
        console.log(response);

        if (response.token) {
          this.authService.saveToken(response.token);
          this.global.isAuth = true;
          this.global.type = response.user.role == 'admin' ? 'admin' : response.user.mission;
          localStorage.setItem('type', this.global.type);
         
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome back!',
            timer: 1500, // Auto-close after 1.5 seconds
            showConfirmButton: false
          }).then(() => {
            switch (this.global.type) {
              case 'Progration':
                this.router.navigateByUrl('/progration');
                break;
              case 'Control':
                this.router.navigateByUrl('/control');
                break;
              case 'Payload':
                this.router.navigateByUrl('/payload');
                break;
              case 'Telemetry':
                this.router.navigateByUrl('/telemetry');
                break;
              default:
                this.router.navigateByUrl('/');
            }
            
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
