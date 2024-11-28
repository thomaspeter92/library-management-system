import { Component } from '@angular/core';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [],
})
export class DashboardComponent {}
