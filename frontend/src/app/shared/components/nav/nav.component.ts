import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [MatIconModule, RouterLink, ButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  user!: User;
  menuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(
        take(1),
        tap((user) => {
          if (user) {
            this.user = user;
          }
        })
      )
      .subscribe();
  }

  handleLogout() {
    console.log('hi');
    this.authService.logout();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
