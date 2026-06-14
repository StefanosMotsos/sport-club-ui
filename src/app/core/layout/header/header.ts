import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userService = inject(UserService);
  user = this.userService.user;
  router = inject(Router);

  isLogoutOpen = false;
  isMembersOpen = false;

  onLogoutClick() {
    this.isMembersOpen = false;
    this.isLogoutOpen = !this.isLogoutOpen;
  }

  onMembersClick() {
    this.isLogoutOpen = false;
    this.isMembersOpen = !this.isMembersOpen;
  }

  navigateTo(path: string) {
    this.isLogoutOpen = false;
    this.isMembersOpen = false;
    this.router.navigate([path]);
  }

  isAdmin(): boolean {
    return this.user()?.role === 'ADMIN';
  }

  isEmployee(): boolean {
    return this.user()?.role === 'EMPLOYEE';
  }

  isMember(): boolean {
    return this.user()?.role === 'MEMBER';
  }
}
