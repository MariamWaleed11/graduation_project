import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../global.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  export class LoginComponent {
    loginForm: FormGroup;
  isSubmitted = false;
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService ,private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  handleSubmit() {
    this.isSubmitted = true;
    this.authService.login(this.loginData).subscribe({
    next: (response: any) => {
      if (response.token) {
        this.authService.saveToken(response.token); // حفظ الرمز المميز
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back!',
          confirmButtonColor: '#3085d6'
        });
      }
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  });

      
  
  }}
