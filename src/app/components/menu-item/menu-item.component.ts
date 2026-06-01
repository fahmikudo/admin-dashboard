import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterModule } from '@angular/router';
import { MenuItem } from '../custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink, RouterModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
  collapsed = input(false);
}
