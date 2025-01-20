import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../core/models/user.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { take, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ValidationErrorComponent } from '../../../../../shared/components/validation-error/validation-error.component';
import { UserService } from '../../../services/user.service';
import { ModalService } from '../../../../../shared/components/modal/modal.service';
import { ToastService } from '../../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, ButtonComponent, ValidationErrorComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  user!: User;
  editUserForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private modalService: ModalService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(
        take(1),
        tap((user) => {
          if (user) {
            this.user = user;
            console.log(user);
          }
        })
      )
      .subscribe();

    this.editUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });

    this.editUserForm.patchValue({
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.editUserForm.valid) return;

    const payload = {
      email: this.editUserForm.get('email')?.value,
      last_name: this.editUserForm.get('lastName')?.value,
      first_name: this.editUserForm.get('firstName')?.value,
    };

    this.userService.editUserDetails(payload).subscribe((res) => {
      this.toastService.addToast('User info was updated', 'success', 3000);
      this.modalService.closeModal();
    });
  }
}
