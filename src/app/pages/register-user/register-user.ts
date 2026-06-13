import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-register-user',
  imports: [
    MatButton,
    MatDivider
  ],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser {}
