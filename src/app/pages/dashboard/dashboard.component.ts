import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('salesChart', { static: false })
  salesChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('inventoryChart', { static: false })
  inventoryChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('paymentChart', { static: false })
  paymentChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueChart', { static: false })
  revenueChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('topProductsChart', { static: false })
  topProductsChart!: ElementRef<HTMLCanvasElement>;

  // Dashboard statistics
  totalSales = 125350;
  dailyRevenue = 8450;
  totalOrders = 342;
  totalCustomers = 185;

  // Chart instances
  salesChartInstance!: Chart;
  inventoryChartInstance!: Chart;
  paymentChartInstance!: Chart;
  revenueChartInstance!: Chart;
  topProductsChartInstance!: Chart;

  // Sample POS data
  weeklySalesData = [12500, 15200, 11800, 16400, 14300, 18200, 16800];
  monthlyRevenueData = [
    45000, 52000, 48000, 58000, 62000, 55000, 68000, 71000, 65000, 72000, 75000,
    82000,
  ];
  inventoryLevels = [85, 42, 67, 23, 91, 56, 78, 34, 89, 45];
  paymentMethods = [45, 30, 15, 10]; // Cash, Card, Digital Wallet, Other
  topProducts = [125, 98, 87, 76, 65, 54, 43, 32, 21, 18];

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.createSalesChart();
    this.createInventoryChart();
    this.createPaymentChart();
    this.createRevenueChart();
    this.createTopProductsChart();
  }

  createSalesChart(): void {
    const ctx = this.salesChart.nativeElement.getContext('2d');
    if (ctx) {
      this.salesChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Weekly Sales ($)',
              data: this.weeklySalesData,
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Weekly Sales Trend',
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return '$' + value.toLocaleString();
                },
              },
            },
          },
        },
      });
    }
  }

  createInventoryChart(): void {
    const ctx = this.inventoryChart.nativeElement.getContext('2d');
    if (ctx) {
      this.inventoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Coffee',
            'Pastries',
            'Sandwiches',
            'Salads',
            'Beverages',
            'Snacks',
            'Desserts',
            'Hot Food',
            'Frozen',
            'Dairy',
          ],
          datasets: [
            {
              label: 'Stock Level (%)',
              data: this.inventoryLevels,
              backgroundColor: this.inventoryLevels.map((level) =>
                level < 30 ? '#ef4444' : level < 60 ? '#f59e0b' : '#10b981'
              ),
              borderColor: '#374151',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Inventory Levels by Category',
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value) {
                  return value + '%';
                },
              },
            },
          },
        },
      });
    }
  }

  createPaymentChart(): void {
    const ctx = this.paymentChart.nativeElement.getContext('2d');
    if (ctx) {
      this.paymentChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Cash', 'Credit/Debit Card', 'Digital Wallet', 'Other'],
          datasets: [
            {
              data: this.paymentMethods,
              backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Payment Methods Distribution',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }

  createRevenueChart(): void {
    const ctx = this.revenueChart.nativeElement.getContext('2d');
    if (ctx) {
      this.revenueChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Monthly Revenue ($)',
              data: this.monthlyRevenueData,
              backgroundColor: '#6366f1',
              borderColor: '#4f46e5',
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Revenue Overview',
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return '$' + (Number(value) / 1000).toFixed(0) + 'K';
                },
              },
            },
          },
        },
      });
    }
  }

  createTopProductsChart(): void {
    const ctx = this.topProductsChart.nativeElement.getContext('2d');
    if (ctx) {
      this.topProductsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Espresso',
            'Cappuccino',
            'Latte',
            'Americano',
            'Mocha',
            'Tea',
            'Croissant',
            'Bagel',
            'Muffin',
            'Cookie',
          ],
          datasets: [
            {
              label: 'Units Sold',
              data: this.topProducts,
              backgroundColor: '#ec4899',
              borderColor: '#db2777',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: 'Top 10 Products',
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  ngOnDestroy(): void {
    // Clean up chart instances
    if (this.salesChartInstance) this.salesChartInstance.destroy();
    if (this.inventoryChartInstance) this.inventoryChartInstance.destroy();
    if (this.paymentChartInstance) this.paymentChartInstance.destroy();
    if (this.revenueChartInstance) this.revenueChartInstance.destroy();
    if (this.topProductsChartInstance) this.topProductsChartInstance.destroy();
  }
}
