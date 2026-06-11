import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
