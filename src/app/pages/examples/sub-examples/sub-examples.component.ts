import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  DataTableComponent,
  TableConfig,
  TableColumn,
  TableAction,
} from '../../../components/data-table/data-table.component';
import { EmployeeService, TableData } from '../../../services/employee.service';

@Component({
  selector: 'app-sub-examples',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './sub-examples.component.html',
  styleUrl: './sub-examples.component.scss',
})
export class SubExamplesComponent implements OnInit, OnDestroy {
  tableConfig!: TableConfig;

  // Signals for local component state
  private _currentPage = signal<number>(0);
  private _pageSize = signal<number>(5);
  private _searchTerm = signal<string>('');

  // Public readonly signals from service
  readonly employees = this.employeeService.employees;
  readonly loading = this.employeeService.loading;
  readonly error = this.employeeService.error;
  readonly totalItems = this.employeeService.totalItems;

  // Computed signals for table data
  readonly tableData = computed(() => {
    const employees = this.employees();
    return employees.map((emp) => ({
      ...emp,
      joinDate: new Date(emp.joinDate), // Convert string back to Date for display
    }));
  });

  // Computed signal for table config that updates reactively
  readonly reactiveTableConfig = computed(() => {
    if (!this.tableConfig) return null;

    return {
      ...this.tableConfig,
      totalItems: this.totalItems(),
      currentPage: this.employeeService.currentPage(),
      defaultPageSize: this.employeeService.pageSize(),
    };
  });

  // Subject for handling component destruction
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public employeeService: EmployeeService
  ) {
    // Effect to update table config when service state changes
    effect(() => {
      if (this.tableConfig) {
        const servicePage = this.employeeService.currentPage();
        const servicePageSize = this.employeeService.pageSize();
        const serviceSearch = this.employeeService.searchTerm();
        const serviceTotalItems = this.employeeService.totalItems();

        // Update local signals to match service state
        this._currentPage.set(servicePage);
        this._pageSize.set(servicePageSize);
        this._searchTerm.set(serviceSearch);
      }
    });
  }

  ngOnInit() {
    this.setupTableConfig();
    this.subscribeToQueryParams();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToQueryParams() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        // Parse query parameters with defaults
        const page = parseInt(params['page']) || 1;
        const size = parseInt(params['size']) || 5;
        const keyword = params['keyword'] || '';

        // Convert page from 1-based to 0-based for internal use
        const pageIndex = page - 1;

        // Update local signals
        this._currentPage.set(pageIndex);
        this._pageSize.set(size);
        this._searchTerm.set(keyword);

        // Check if this is the initial load without any query parameters
        const hasParams = Object.keys(params).length > 0;

        if (!hasParams) {
          // No query parameters, set defaults and update URL (this will trigger another subscription)
          this.updateUrl(pageIndex, size, keyword);
        } else {
          // Always load data when parameters are present
          this.loadData(pageIndex, size, keyword);
        }
      });
  }

  private updateTableConfigFromUrl() {
    if (this.tableConfig) {
      // Update the base table config instead of creating a new one
      // The reactive computed signal will handle the reactive updates
      this.tableConfig = {
        ...this.tableConfig,
        currentPage: this._currentPage(),
        defaultPageSize: this._pageSize(),
        totalItems: this.totalItems(),
      };
    }
  }

  private updateUrl(page: number, size: number, keyword: string) {
    // Convert page from 0-based to 1-based for URL
    const urlPage = page + 1;

    // Prepare query params, only include non-empty keyword
    const queryParams: any = {
      page: urlPage,
      size: size,
    };

    // Only add keyword to URL if it's not empty
    if (keyword && keyword.trim()) {
      queryParams.keyword = keyword.trim();
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  private setupTableConfig() {
    const columns: TableColumn[] = [
      {
        key: 'id',
        label: 'ID',
        width: '60px',
        minWidth: '60px',
        sortable: true,
      },
      {
        key: 'name',
        label: 'Name',
        width: '150px',
        minWidth: '150px',
        sortable: true,
      },
      {
        key: 'email',
        label: 'Email',
        width: '200px',
        minWidth: '200px',
        sortable: true,
      },
      {
        key: 'department',
        label: 'Department',
        width: '120px',
        minWidth: '120px',
        sortable: true,
      },
      {
        key: 'role',
        label: 'Role',
        width: '150px',
        minWidth: '150px',
        sortable: true,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'badge',
        width: '100px',
        minWidth: '100px',
        sortable: true,
        badgeConfig: {
          active: {
            class: 'status-active',
            label: 'ACTIVE',
          },
          inactive: {
            class: 'status-inactive',
            label: 'INACTIVE',
          },
        },
      },
      {
        key: 'joinDate',
        label: 'Join Date',
        type: 'date',
        width: '120px',
        minWidth: '120px',
        sortable: true,
      },
      {
        key: 'salary',
        label: 'Salary',
        type: 'currency',
        width: '120px',
        minWidth: '120px',
        sortable: true,
      },
    ];

    const actions: TableAction[] = [
      {
        key: 'view',
        label: 'View',
        icon: 'visibility',
        color: '#2196f3',
      },
      {
        key: 'edit',
        label: 'Edit',
        icon: 'edit',
        color: '#ff9800',
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: 'delete',
        color: '#f44336',
      },
    ];

    this.tableConfig = {
      columns,
      actions,
      searchEnabled: true,
      searchPlaceholder: 'Search by name, email, department...',
      paginationEnabled: true,
      pageSizeOptions: [5, 10, 20, 50],
      defaultPageSize: 5, // Initial value
      createButtonEnabled: true,
      createButtonLabel: 'Create New',
      tableMinWidth: '1200px',
      maxHeight: '600px',
      // Server-side pagination configuration
      serverSidePagination: true,
      totalItems: 0, // Initial value
      currentPage: 0, // Initial value
      // Server-side search configuration
      serverSideSearch: true,
      searchDebounceTime: 300,
    };
  }

  private loadData(
    pageIndex: number = 0,
    pageSize: number = 5,
    searchTerm: string = ''
  ) {
    this.employeeService
      .loadEmployees({
        page: pageIndex,
        pageSize: pageSize,
        search: searchTerm,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const searchInfo = searchTerm ? ` with search: "${searchTerm}"` : '';
          console.log(
            `Loaded page ${response.page + 1} with ${
              response.pageSize
            } items per page. Total: ${response.total}${searchInfo}`
          );
        },
        error: (error) => {
          console.error('Failed to load employees:', error);
        },
      });
  }

  onActionClicked(event: { action: string; row: TableData }) {
    switch (event.action) {
      case 'view':
        this.viewRecord(event.row);
        break;
      case 'edit':
        this.editRecord(event.row);
        break;
      case 'delete':
        this.deleteRecord(event.row);
        break;
    }
  }

  onPaginationChanged(event: {
    pageIndex: number;
    pageSize: number;
    length: number;
  }) {
    console.log('Pagination changed:', event);

    // Update URL with new pagination parameters (this will trigger data reload via subscribeToQueryParams)
    this.updateUrl(event.pageIndex, event.pageSize, this._searchTerm());
  }

  onSearchChanged(searchTerm: string) {
    console.log('Search changed:', searchTerm);

    // When searching, reset to first page (this will trigger data reload via subscribeToQueryParams)
    this.updateUrl(0, this.employeeService.pageSize(), searchTerm);
  }

  onCreateClicked() {
    console.log('Create new record');
    // Implement create functionality
    // Example: Navigate to create form or open modal
  }

  onRowClicked(row: TableData) {
    console.log('Row clicked:', row);
    // Implement row click functionality
  }

  private viewRecord(element: TableData) {
    console.log('View record:', element);
    // Implement view functionality
    // Example: Navigate to detail view or open modal
  }

  private editRecord(element: TableData) {
    console.log('Edit record:', element);
    // Implement edit functionality
    // Example: Navigate to edit form or open modal
  }

  private deleteRecord(element: TableData) {
    console.log('Delete record:', element);
    // Implement delete functionality with confirmation
    if (confirm(`Are you sure you want to delete ${element.name}?`)) {
      this.employeeService
        .deleteEmployee(element.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            console.log('Employee deleted successfully');
            // Reload current page data
            this.loadData(
              this._currentPage(),
              this._pageSize(),
              this._searchTerm()
            );
          },
          error: (error) => {
            console.error('Failed to delete employee:', error);
          },
        });
    }
  }
}
