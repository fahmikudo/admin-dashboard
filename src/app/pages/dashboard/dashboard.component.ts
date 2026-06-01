import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  quickAccess = [
    {
      label: 'Sales orders',
      description: 'Create and monitor store transactions',
      icon: 'point_of_sale',
      route: '/sales',
    },
    {
      label: 'Inventory',
      description: 'Stock levels, transfers, and adjustments',
      icon: 'inventory_2',
      route: '/inventory',
    },
    {
      label: 'Purchasing',
      description: 'Supplier orders and receiving',
      icon: 'shopping_bag',
      route: '/purchasing',
    },
    {
      label: 'Customers',
      description: 'Profiles, loyalty, and support history',
      icon: 'groups',
      route: '/customers',
    },
    {
      label: 'Finance',
      description: 'Invoices, settlements, and cash flow',
      icon: 'account_balance',
      route: '/finance',
    },
    {
      label: 'Reports',
      description: 'Performance, margin, and operations',
      icon: 'insert_chart',
      route: '/reports',
    },
  ];

  metrics = [
    { label: 'Net sales', value: '$125.3K', change: '+12.5%', tone: 'positive' },
    { label: 'Open orders', value: '342', change: '42 pending', tone: 'neutral' },
    { label: 'Low stock SKUs', value: '18', change: 'Needs review', tone: 'warning' },
    { label: 'Active stores', value: '24', change: 'All online', tone: 'positive' },
  ];

  systemHealth = [
    {
      label: 'Point of sale sync',
      detail: 'Last sync 2 minutes ago',
      status: 'Healthy',
      icon: 'check_circle',
      tone: 'positive',
    },
    {
      label: 'Inventory jobs',
      detail: '2 transfer batches queued',
      status: 'Running',
      icon: 'sync',
      tone: 'info',
    },
    {
      label: 'Supplier EDI',
      detail: '1 supplier response delayed',
      status: 'Attention',
      icon: 'error',
      tone: 'warning',
    },
  ];

  recentActivity = [
    {
      title: 'Sales order SO-10234 completed',
      description: 'Store Jakarta Central posted a $24.50 transaction',
      icon: 'receipt_long',
      tone: 'positive',
      time: '2 min',
    },
    {
      title: 'Low stock alert created',
      description: 'Salads category dropped below reorder threshold',
      icon: 'inventory_2',
      tone: 'warning',
      time: '5 min',
    },
    {
      title: 'Purchase receipt posted',
      description: 'Coffee beans received into warehouse WH-01',
      icon: 'local_shipping',
      tone: 'info',
      time: '15 min',
    },
    {
      title: 'Customer profile updated',
      description: 'Loyalty status changed for customer C1002',
      icon: 'person',
      tone: 'neutral',
      time: '25 min',
    },
  ];

  pinnedResources = [
    { label: 'Daily sales close', icon: 'event_available', route: '/sales' },
    { label: 'Reorder queue', icon: 'playlist_add_check', route: '/inventory' },
    { label: 'Margin report', icon: 'monitoring', route: '/reports' },
    { label: 'Store settings', icon: 'settings', route: '/settings' },
  ];
}
