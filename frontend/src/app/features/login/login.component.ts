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
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { ERROR_MESSAGES } from '../../core/models/api-response.model';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    MatIconModule,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error = '';
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.error = '';

    if (!this.loginForm.valid) return;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authObs: Observable<LoginAPIResponse> = this.authService.login(
      email,
      password
    );

    this.isLoading = true;

    authObs.subscribe({
      next: (data) => {
        this.error = '';
        this.isLoading = false;
        this.router.navigate(['/']);
        this.loginForm.reset();
      },
      error: (error: Error) => {
        console.log(error.message);
        this.error =
          ERROR_MESSAGES[
            (error?.message as keyof typeof ERROR_MESSAGES) || 'SERVER_ERROR'
          ];
        this.isLoading = false;
        console.log('LOGIN ERROR', error.message);
      },
    });
  }
}
