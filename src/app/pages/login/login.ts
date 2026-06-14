import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthRequest} from '../../shared/interfaces/user-login';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    MatDivider,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userService = inject(UserService);
  router = inject(Router);

  errorMessage: string = '';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])^.{8,}$/)]),
  })

  onSubmit() {
    this.errorMessage = '';
    if (this.form.invalid) return;

    const credentials = this.form.value as AuthRequest;

    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        this.userService.setUserFromToken(response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.error?.description ?? 'Login failed. Please try again.';
      }
    });
  }
}
