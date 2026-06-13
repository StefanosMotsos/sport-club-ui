import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/list";

@Component({
  selector: 'app-register-member',
    imports: [
        MatButton,
        MatDivider
    ],
  templateUrl: './register-member.html',
  styleUrl: './register-member.css',
})
export class RegisterMember {}
