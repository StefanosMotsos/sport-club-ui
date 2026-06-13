import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    MatDivider
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
