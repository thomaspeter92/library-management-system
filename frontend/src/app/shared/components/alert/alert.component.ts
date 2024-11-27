import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type AlertVariant = 'success' | 'error' | 'warning';

@Component({
  selector: 'app-alert',
  imports: [NgClass, MatIconModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() variant!: AlertVariant;
}
