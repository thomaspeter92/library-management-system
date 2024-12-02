import { Injectable } from '@angular/core';

interface Toast {
  message: string;
  duration: number;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  addToast(message: string, type: 'error' | 'success', duration: number) {
    this.toasts.push({ message, type, duration });
    setTimeout(() => this.removeToast(0), duration);
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }
}
