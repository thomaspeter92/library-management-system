import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginAPIResponse } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isError = false;
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.isError = false;

    if (!this.loginForm.valid) return;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    console.log(email, password);

    let authObs: Observable<LoginAPIResponse> = this.authService.login(
      email,
      password
    );

    this.isLoading = true;

    authObs.subscribe({
      next: () => {
        this.isError = false;
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isError = true;
        this.isLoading = false;
        console.log(error);
      },
    });

    this.loginForm.reset();
  }
}
