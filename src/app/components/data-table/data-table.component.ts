import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'currency' | 'badge' | 'custom';
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  searchable?: boolean;
  sticky?: boolean;
  format?: (value: any) => string;
  badgeConfig?: {
    [key: string]: {
      class: string;
      label?: string;
    };
  };
}

export interface TableAction {
  key: string;
  label: string;
  icon: string;
  color?: string;
  visible?: (row: any) => boolean;
}

export interface TableConfig {
  columns: TableColumn[];
  actions?: TableAction[];
  searchEnabled?: boolean;
  searchPlaceholder?: string;
  paginationEnabled?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  createButtonEnabled?: boolean;
  createButtonLabel?: string;
  tableMinWidth?: string;
  maxHeight?: string;
  // Server-side pagination support
  totalItems?: number;
  currentPage?: number;
  serverSidePagination?: boolean;
  // Server-side search support
  serverSideSearch?: boolean;
  searchDebounceTime?: number; // milliseconds to debounce search input
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() data: any[] = [];
  @Input() config!: TableConfig;
  @Input() loading = false;

  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();
  @Output() createClicked = new EventEmitter<void>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() paginationChanged = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
    length: number;
  }>();
  @Output() searchChanged = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  searchValue = '';
  private subscriptions = new Subscription();
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.setupTable();
    this.setupSearchDebouncing();
  }

  ngAfterViewInit() {
    this.setupPagination();
    this.setupSort();
    this.setupFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.dataSource.data = this.data;
    }

    if (changes['config'] && this.config) {
      this.setupTable();
      // Re-setup pagination if config changed after view init
      if (this.paginator) {
        this.setupPagination();
      }
    }

    // Handle server-side pagination config changes
    if (this.paginator && this.config?.serverSidePagination) {
      if (changes['config']) {
        const configChange = changes['config'];
        if (configChange.currentValue) {
          const newConfig = configChange.currentValue;

          // Update paginator properties for server-side pagination
          if (newConfig.totalItems !== undefined) {
            this.paginator.length = newConfig.totalItems;
          }

          if (newConfig.currentPage !== undefined) {
            this.paginator.pageIndex = newConfig.currentPage;
          }

          if (newConfig.defaultPageSize !== undefined) {
            this.paginator.pageSize = newConfig.defaultPageSize;
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.searchSubject.complete();
  }

  private setupSearchDebouncing() {
    // Set up search debouncing for server-side search
    this.subscriptions.add(
      this.searchSubject
        .pipe(
          debounceTime(this.config?.searchDebounceTime || 300),
          distinctUntilChanged()
        )
        .subscribe((searchTerm: string) => {
          if (this.config?.serverSideSearch) {
            // Reset paginator to first page when search is applied
            if (this.paginator) {
              this.paginator.pageIndex = 0;
            }
            this.searchChanged.emit(searchTerm);
          }
        })
    );
  }

  private setupTable() {
    if (!this.config) return;

    // Setup displayed columns
    this.displayedColumns = this.config.columns.map((col) => col.key);
    if (this.config.actions && this.config.actions.length > 0) {
      this.displayedColumns.push('actions');
    }

    // Setup data source
    this.dataSource.data = this.data;

    // Re-apply current filter if exists
    if (this.searchValue) {
      this.dataSource.filter = this.searchValue.trim().toLowerCase();
    }
  }

  applyFilter() {
    if (this.config?.serverSideSearch) {
      // For server-side search, emit the search term through the debounced subject
      this.searchSubject.next(this.searchValue.trim());
    } else {
      // For client-side search, apply filter to data source and reset to first page
      this.dataSource.filter = this.searchValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  clearSearch() {
    this.searchValue = '';
    if (this.config?.serverSideSearch) {
      // For server-side search, reset paginator to defaults
      if (this.paginator) {
        this.paginator.pageIndex = 0;
        this.paginator.pageSize = this.config.defaultPageSize || 5;
      }
      // Emit empty search term - parent will handle data loading with reset pagination
      this.searchChanged.emit('');
    } else {
      // For client-side search, apply filter and reset to first page
      this.dataSource.filter = this.searchValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  onActionClick(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

  onCreateClick() {
    this.createClicked.emit();
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }

  formatCellValue(column: TableColumn, value: any): string {
    if (value == null) return '';

    switch (column.type) {
      case 'date':
        return value instanceof Date
          ? value.toLocaleDateString()
          : new Date(value).toLocaleDateString();

      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);

      case 'custom':
        return column.format ? column.format(value) : value.toString();

      default:
        return value.toString();
    }
  }

  getBadgeClass(column: TableColumn, value: any): string {
    if (column.type !== 'badge' || !column.badgeConfig) {
      return '';
    }

    const config = column.badgeConfig[value.toLowerCase()];
    return config ? config.class : '';
  }

  getBadgeLabel(column: TableColumn, value: any): string {
    if (column.type !== 'badge' || !column.badgeConfig) {
      return value.toString();
    }

    const config = column.badgeConfig[value.toLowerCase()];
    return config?.label || value.toString();
  }

  isActionVisible(action: TableAction, row: any): boolean {
    return action.visible ? action.visible(row) : true;
  }

  getColumnClass(column: TableColumn): string {
    const classes = [];

    if (column.sticky) {
      classes.push('sticky-column');
    }

    return classes.join(' ');
  }

  getColumnStyle(column: TableColumn): { [key: string]: string } {
    const style: { [key: string]: string } = {};

    if (column.width) {
      style['width'] = column.width;
      style['max-width'] = column.width;
    }

    if (column.minWidth) {
      style['min-width'] = column.minWidth;
    }

    return style;
  }

  private setupPagination() {
    if (this.config.paginationEnabled !== false && this.paginator) {
      // Clear any existing subscriptions for this paginator
      this.subscriptions.unsubscribe();
      this.subscriptions = new Subscription();

      // For server-side pagination, don't connect paginator to data source
      if (!this.config.serverSidePagination) {
        this.dataSource.paginator = this.paginator;
      }

      // Set default page size if configured
      if (this.config.defaultPageSize) {
        this.paginator.pageSize = this.config.defaultPageSize;
      }

      // Set current page if configured (for server-side pagination)
      if (this.config.currentPage !== undefined) {
        this.paginator.pageIndex = this.config.currentPage;
      }

      // Set total items length for server-side pagination
      if (
        this.config.serverSidePagination &&
        this.config.totalItems !== undefined
      ) {
        this.paginator.length = this.config.totalItems;
      }

      // Subscribe to page events
      this.subscriptions.add(
        this.paginator.page.subscribe((pageEvent: PageEvent) => {
          // For client-side pagination, force data source to update its rendered rows
          if (!this.config.serverSidePagination) {
            this.dataSource._updateChangeSubscription();
          }

          // Always emit pagination change event for parent component
          this.paginationChanged.emit({
            pageIndex: pageEvent.pageIndex,
            pageSize: pageEvent.pageSize,
            length: pageEvent.length,
          });
        })
      );
    }
  }

  private setupSort() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  private setupFilter() {
    // Only set up client-side filter predicate if not using server-side search
    if (!this.config?.serverSideSearch) {
      // Custom filter predicate for searchable columns
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const searchableColumns = this.config.columns.filter(
          (col) => col.searchable !== false
        );
        const searchStr = searchableColumns
          .map((col) => {
            const value = data[col.key];
            if (value == null) return '';
            if (col.type === 'date' && value instanceof Date) {
              return value.toLocaleDateString();
            }
            return value.toString();
          })
          .join(' ')
          .toLowerCase();

        return searchStr.includes(filter);
      };
    }
  }
}
