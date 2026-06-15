import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserFields} from '../../shared/interfaces/user-login';

@Component({
  selector: 'app-register-user',
  imports: [
    MatButton,
    MatDivider,
    ReactiveFormsModule
  ],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser {
  userService = inject(UserService);
  router = inject(Router);

  errorMessage: string = '';

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])^.{8,}$/)]),
    roleId: new FormControl('', Validators.required),
  })

  onSubmit() {
    this.errorMessage = '';
    if (this.form.invalid) return;

    const newUser: UserFields = {
      username: this.form.value.username!,
      password: this.form.value.password!,
      roleId: Number (this.form.value.roleId!)
    }

    this.userService.registerUser(newUser).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.error?.description ?? 'Register Failed. Please try again later';
      }
    })
  }
}
