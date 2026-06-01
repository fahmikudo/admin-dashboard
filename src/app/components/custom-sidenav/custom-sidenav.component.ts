import { Component, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule, MenuItemComponent],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      label: 'Overview',
      icon: 'space_dashboard',
      route: 'dashboard',
    },
    {
      label: 'Sales',
      icon: 'point_of_sale',
      route: 'sales',
    },
    {
      label: 'Inventory',
      icon: 'inventory_2',
      route: 'inventory',
    },
    {
      label: 'Purchasing',
      icon: 'shopping_bag',
      route: 'purchasing',
    },
    {
      label: 'Customers',
      icon: 'groups',
      route: 'customers',
    },
    {
      label: 'Finance',
      icon: 'account_balance',
      route: 'finance',
    },
    {
      label: 'Work items',
      icon: 'view_list',
      route: 'examples/sub-examples',
    },
    {
      label: 'Reports',
      icon: 'insert_chart',
      route: 'reports',
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: 'settings',
    },
  ]);
}
