import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  isVisible = this.visibilitySubject.asObservable();

  modalContent: TemplateRef<any> | null = null;

  openModal(content: TemplateRef<any>) {
    this.modalContent = content;
    this.visibilitySubject.next(true);
  }

  closeModal() {
    this.modalContent = null;
    this.visibilitySubject.next(false);
  }
}
