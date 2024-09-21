import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderbarComponent } from '../siderbar/siderbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SiderbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
