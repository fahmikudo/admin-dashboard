import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DataTableComponent,
  TableConfig,
  TableColumn,
  TableAction,
} from '../../../components/data-table/data-table.component';

export interface TableData {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: string;
  joinDate: Date;
  salary: number;
}

@Component({
  selector: 'app-sub-examples',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './sub-examples.component.html',
  styleUrl: './sub-examples.component.scss',
})
export class SubExamplesComponent implements OnInit {
  tableConfig!: TableConfig;
  tableData: TableData[] = [];
  loading = false;

  // Pagination state for server-side pagination simulation
  currentPage = 0;
  pageSize = 5;
  totalItems = 0;

  // Sample data
  sampleData: TableData[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'Active',
      joinDate: new Date('2023-01-15'),
      salary: 95000,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Marketing',
      role: 'Marketing Manager',
      status: 'Active',
      joinDate: new Date('2022-08-20'),
      salary: 85000,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      department: 'Sales',
      role: 'Sales Representative',
      status: 'Active',
      joinDate: new Date('2023-03-10'),
      salary: 65000,
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      department: 'HR',
      role: 'HR Specialist',
      status: 'Inactive',
      joinDate: new Date('2021-11-05'),
      salary: 70000,
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      department: 'Engineering',
      role: 'Junior Developer',
      status: 'Active',
      joinDate: new Date('2023-06-01'),
      salary: 75000,
    },
    {
      id: 6,
      name: 'Lisa Davis',
      email: 'lisa.davis@example.com',
      department: 'Finance',
      role: 'Financial Analyst',
      status: 'Active',
      joinDate: new Date('2022-12-15'),
      salary: 80000,
    },
    {
      id: 7,
      name: 'Tom Anderson',
      email: 'tom.anderson@example.com',
      department: 'Engineering',
      role: 'Tech Lead',
      status: 'Active',
      joinDate: new Date('2021-09-20'),
      salary: 110000,
    },
    {
      id: 8,
      name: 'Emily Taylor',
      email: 'emily.taylor@example.com',
      department: 'Design',
      role: 'UX Designer',
      status: 'Active',
      joinDate: new Date('2022-04-12'),
      salary: 85000,
    },
    {
      id: 9,
      name: 'James Miller',
      email: 'james.miller@example.com',
      department: 'Sales',
      role: 'Sales Manager',
      status: 'Active',
      joinDate: new Date('2020-10-08'),
      salary: 95000,
    },
    {
      id: 10,
      name: 'Anna Garcia',
      email: 'anna.garcia@example.com',
      department: 'Marketing',
      role: 'Content Specialist',
      status: 'Active',
      joinDate: new Date('2023-02-28'),
      salary: 60000,
    },
    {
      id: 11,
      name: 'Robert Lee',
      email: 'robert.lee@example.com',
      department: 'Engineering',
      role: 'DevOps Engineer',
      status: 'Active',
      joinDate: new Date('2022-07-14'),
      salary: 90000,
    },
    {
      id: 12,
      name: 'Michelle White',
      email: 'michelle.white@example.com',
      department: 'Finance',
      role: 'Accountant',
      status: 'Inactive',
      joinDate: new Date('2021-05-30'),
      salary: 65000,
    },
    {
      id: 13,
      name: 'Kevin Clark',
      email: 'kevin.clark@example.com',
      department: 'HR',
      role: 'Recruiter',
      status: 'Active',
      joinDate: new Date('2023-04-18'),
      salary: 55000,
    },
    {
      id: 14,
      name: 'Jennifer Rodriguez',
      email: 'jennifer.rodriguez@example.com',
      department: 'Design',
      role: 'UI Designer',
      status: 'Active',
      joinDate: new Date('2022-11-22'),
      salary: 78000,
    },
    {
      id: 15,
      name: 'Daniel Martinez',
      email: 'daniel.martinez@example.com',
      department: 'Sales',
      role: 'Account Executive',
      status: 'Active',
      joinDate: new Date('2023-05-03'),
      salary: 72000,
    },
    {
      id: 16,
      name: 'Rachel Thompson',
      email: 'rachel.thompson@example.com',
      department: 'Engineering',
      role: 'Software Engineer',
      status: 'Active',
      joinDate: new Date('2023-07-12'),
      salary: 88000,
    },
    {
      id: 17,
      name: 'Mark Williams',
      email: 'mark.williams@example.com',
      department: 'Marketing',
      role: 'Digital Marketing Specialist',
      status: 'Active',
      joinDate: new Date('2022-09-05'),
      salary: 62000,
    },
    {
      id: 18,
      name: 'Linda Moore',
      email: 'linda.moore@example.com',
      department: 'Finance',
      role: 'Senior Accountant',
      status: 'Active',
      joinDate: new Date('2021-03-18'),
      salary: 75000,
    },
    {
      id: 19,
      name: 'Steven Taylor',
      email: 'steven.taylor@example.com',
      department: 'Engineering',
      role: 'Full Stack Developer',
      status: 'Active',
      joinDate: new Date('2022-01-10'),
      salary: 92000,
    },
    {
      id: 20,
      name: 'Amanda Jackson',
      email: 'amanda.jackson@example.com',
      department: 'HR',
      role: 'HR Manager',
      status: 'Active',
      joinDate: new Date('2020-12-01'),
      salary: 85000,
    },
    {
      id: 21,
      name: 'Christopher Allen',
      email: 'christopher.allen@example.com',
      department: 'Sales',
      role: 'Business Development Manager',
      status: 'Active',
      joinDate: new Date('2022-06-15'),
      salary: 90000,
    },
    {
      id: 22,
      name: 'Nicole Young',
      email: 'nicole.young@example.com',
      department: 'Design',
      role: 'Product Designer',
      status: 'Inactive',
      joinDate: new Date('2021-08-22'),
      salary: 82000,
    },
    {
      id: 23,
      name: 'Matthew King',
      email: 'matthew.king@example.com',
      department: 'Engineering',
      role: 'Backend Developer',
      status: 'Active',
      joinDate: new Date('2023-09-01'),
      salary: 86000,
    },
    {
      id: 24,
      name: 'Ashley Wright',
      email: 'ashley.wright@example.com',
      department: 'Marketing',
      role: 'Social Media Manager',
      status: 'Active',
      joinDate: new Date('2022-11-08'),
      salary: 58000,
    },
    {
      id: 25,
      name: 'Joshua Lopez',
      email: 'joshua.lopez@example.com',
      department: 'Finance',
      role: 'Financial Controller',
      status: 'Active',
      joinDate: new Date('2020-04-25'),
      salary: 95000,
    },
    {
      id: 26,
      name: 'Stephanie Hill',
      email: 'stephanie.hill@example.com',
      department: 'HR',
      role: 'Training Coordinator',
      status: 'Active',
      joinDate: new Date('2023-01-30'),
      salary: 52000,
    },
    {
      id: 27,
      name: 'Andrew Scott',
      email: 'andrew.scott@example.com',
      department: 'Engineering',
      role: 'Frontend Developer',
      status: 'Active',
      joinDate: new Date('2022-10-12'),
      salary: 78000,
    },
    {
      id: 28,
      name: 'Megan Green',
      email: 'megan.green@example.com',
      department: 'Sales',
      role: 'Sales Coordinator',
      status: 'Active',
      joinDate: new Date('2023-03-20'),
      salary: 48000,
    },
    {
      id: 29,
      name: 'Ryan Adams',
      email: 'ryan.adams@example.com',
      department: 'Design',
      role: 'Graphic Designer',
      status: 'Inactive',
      joinDate: new Date('2021-12-05'),
      salary: 65000,
    },
    {
      id: 30,
      name: 'Samantha Baker',
      email: 'samantha.baker@example.com',
      department: 'Engineering',
      role: 'QA Engineer',
      status: 'Active',
      joinDate: new Date('2022-05-18'),
      salary: 72000,
    },
  ];

  ngOnInit() {
    this.setupTableConfig();
    this.loadData();
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
      defaultPageSize: this.pageSize,
      createButtonEnabled: true,
      createButtonLabel: 'Create New',
      tableMinWidth: '1200px',
      maxHeight: '600px',
      // Server-side pagination configuration
      serverSidePagination: true,
      totalItems: this.totalItems,
      currentPage: this.currentPage,
    };
  }

  private loadData(pageIndex: number = 0, pageSize: number = 5) {
    this.loading = true;

    // Simulate API call with pagination
    setTimeout(() => {
      // Calculate pagination
      const startIndex = pageIndex * pageSize;
      const endIndex = startIndex + pageSize;

      // Set total items
      this.totalItems = this.sampleData.length;

      // Get paginated data
      this.tableData = this.sampleData.slice(startIndex, endIndex);

      // Update pagination state
      this.currentPage = pageIndex;
      this.pageSize = pageSize;

      // Update table config with new pagination info
      this.tableConfig = {
        ...this.tableConfig,
        totalItems: this.totalItems,
        currentPage: this.currentPage,
        defaultPageSize: this.pageSize,
      };

      this.loading = false;
      console.log(
        `Loaded page ${pageIndex + 1} with ${pageSize} items per page. Total: ${
          this.totalItems
        }`
      );
    }, 1000);
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
    // Refetch data with new pagination parameters
    this.loadData(event.pageIndex, event.pageSize);
  }

  onCreateClicked() {
    console.log('Create new record');
    // Implement create functionality
  }

  onRowClicked(row: TableData) {
    console.log('Row clicked:', row);
    // Implement row click functionality
  }

  private viewRecord(element: TableData) {
    console.log('View record:', element);
    // Implement view functionality
  }

  private editRecord(element: TableData) {
    console.log('Edit record:', element);
    // Implement edit functionality
  }

  private deleteRecord(element: TableData) {
    console.log('Delete record:', element);
    // Implement delete functionality
  }
}
