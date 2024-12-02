import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  imports: [MatIconModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  removeToast(index: number) {
    this.toastService.removeToast(index);
  }
}
