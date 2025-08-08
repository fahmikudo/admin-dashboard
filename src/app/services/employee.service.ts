import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

export interface TableData {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: string;
  joinDate: string; // Changed from Date to string for API consistency
  salary: number;
}

export interface PaginatedResponse {
  data: TableData[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TableFilters {
  page: number;
  pageSize: number;
  search: string;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly API_BASE_URL = 'http://localhost:3001';

  // Signals for state management
  private _employees = signal<TableData[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _totalItems = signal<number>(0);
  private _currentPage = signal<number>(0);
  private _pageSize = signal<number>(5);
  private _searchTerm = signal<string>('');

  // Public readonly signals
  readonly employees = this._employees.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly totalItems = this._totalItems.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();

  // Computed signals
  readonly hasData = computed(() => this._employees().length > 0);
  readonly hasError = computed(() => this._error() !== null);
  readonly totalPages = computed(() =>
    Math.ceil(this._totalItems() / this._pageSize())
  );

  constructor(private http: HttpClient) {}

  /**
   * Load employees with pagination and search
   */
  loadEmployees(
    filters: Partial<TableFilters> = {}
  ): Observable<PaginatedResponse> {
    const currentFilters: TableFilters = {
      page: filters.page ?? this._currentPage(),
      pageSize: filters.pageSize ?? this._pageSize(),
      search: filters.search ?? this._searchTerm(),
      sortColumn: filters.sortColumn,
      sortDirection: filters.sortDirection,
    };

    this._loading.set(true);
    this._error.set(null);

    // Update filter states
    this._currentPage.set(currentFilters.page);
    this._pageSize.set(currentFilters.pageSize);
    this._searchTerm.set(currentFilters.search);

    let params = new HttpParams()
      .set('_page', (currentFilters.page + 1).toString()) // json-server uses 1-based pagination
      .set('_limit', currentFilters.pageSize.toString());

    let countParams = new HttpParams();

    // Add search filter to both requests
    if (currentFilters.search && currentFilters.search.trim()) {
      // json-server full-text search
      params = params.set('q', currentFilters.search.trim());
      countParams = countParams.set('q', currentFilters.search.trim());
    }

    // Add sorting
    if (currentFilters.sortColumn) {
      params = params.set('_sort', currentFilters.sortColumn);
      params = params.set('_order', currentFilters.sortDirection || 'asc');
    }

    // Make two parallel requests: one for data, one for total count
    const dataRequest = this.http.get<TableData[]>(
      `${this.API_BASE_URL}/employees`,
      { params }
    );
    const countRequest = this.http.get<TableData[]>(
      `${this.API_BASE_URL}/employees`,
      { params: countParams }
    );

    return combineLatest([dataRequest, countRequest]).pipe(
      map(([data, allData]) => {
        const total = allData.length;

        // Update signals
        this._employees.set(data);
        this._totalItems.set(total);

        return {
          data,
          total,
          page: currentFilters.page,
          pageSize: currentFilters.pageSize,
        };
      }),
      catchError((error) => {
        console.error('Error loading employees:', error);
        this._error.set('Failed to load employees. Please try again.');
        this._employees.set([]);
        this._totalItems.set(0);
        throw error;
      }),
      finalize(() => {
        this._loading.set(false);
      })
    );
  }

  /**
   * Get employee by ID
   */
  getEmployee(id: number): Observable<TableData> {
    this._loading.set(true);
    this._error.set(null);

    return this.http
      .get<TableData>(`${this.API_BASE_URL}/employees/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error loading employee:', error);
          this._error.set('Failed to load employee. Please try again.');
          throw error;
        }),
        finalize(() => {
          this._loading.set(false);
        })
      );
  }

  /**
   * Create new employee
   */
  createEmployee(employee: Omit<TableData, 'id'>): Observable<TableData> {
    this._loading.set(true);
    this._error.set(null);

    return this.http
      .post<TableData>(`${this.API_BASE_URL}/employees`, employee)
      .pipe(
        map((newEmployee) => {
          // Add to current employees list
          const currentEmployees = this._employees();
          this._employees.set([...currentEmployees, newEmployee]);
          this._totalItems.set(this._totalItems() + 1);
          return newEmployee;
        }),
        catchError((error) => {
          console.error('Error creating employee:', error);
          this._error.set('Failed to create employee. Please try again.');
          throw error;
        }),
        finalize(() => {
          this._loading.set(false);
        })
      );
  }

  /**
   * Update employee
   */
  updateEmployee(
    id: number,
    employee: Partial<TableData>
  ): Observable<TableData> {
    this._loading.set(true);
    this._error.set(null);

    return this.http
      .put<TableData>(`${this.API_BASE_URL}/employees/${id}`, employee)
      .pipe(
        map((updatedEmployee) => {
          // Update in current employees list
          const currentEmployees = this._employees();
          const updatedEmployees = currentEmployees.map((emp) =>
            emp.id === id ? updatedEmployee : emp
          );
          this._employees.set(updatedEmployees);
          return updatedEmployee;
        }),
        catchError((error) => {
          console.error('Error updating employee:', error);
          this._error.set('Failed to update employee. Please try again.');
          throw error;
        }),
        finalize(() => {
          this._loading.set(false);
        })
      );
  }

  /**
   * Delete employee
   */
  deleteEmployee(id: number): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.API_BASE_URL}/employees/${id}`).pipe(
      map(() => {
        // Remove from current employees list
        const currentEmployees = this._employees();
        const filteredEmployees = currentEmployees.filter(
          (emp) => emp.id !== id
        );
        this._employees.set(filteredEmployees);
        this._totalItems.set(this._totalItems() - 1);
      }),
      catchError((error) => {
        console.error('Error deleting employee:', error);
        this._error.set('Failed to delete employee. Please try again.');
        throw error;
      }),
      finalize(() => {
        this._loading.set(false);
      })
    );
  }

  /**
   * Reset error state
   */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Reset all state
   */
  reset(): void {
    this._employees.set([]);
    this._loading.set(false);
    this._error.set(null);
    this._totalItems.set(0);
    this._currentPage.set(0);
    this._pageSize.set(5);
    this._searchTerm.set('');
  }
}
