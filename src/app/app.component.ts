import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    CustomSidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin-dashboard';

  collapsed = signal(false);
  sideNavWidth = computed(() => (this.collapsed() ? '65px' : '280px'));

  constructor(public authService: AuthService) {}

  onAccountSettings(): void {
    // TODO: Implement account settings
    console.log('Account settings clicked');
  }

  onLogout(): void {
    this.authService.logout();
  }
}
