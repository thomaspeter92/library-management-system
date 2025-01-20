import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [MatIconModule, ButtonComponent, EditUserComponent, ModalComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('editUser', { static: true }) editUser!: TemplateRef<any>;
  user!: User | null;
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser.subscribe(
      (currentUser) => {
        this.user = currentUser;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditUser(): void {
    this.modalService.openModal(this.editUser);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
