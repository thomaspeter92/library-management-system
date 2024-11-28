import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

type ButtonVariant = 'primary' | 'green' | 'red' | 'purple' | 'beige' | 'cyan';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;
  @Input() fullWidth!: boolean;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
