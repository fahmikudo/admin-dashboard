import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
  ],
  templateUrl: './sub-examples.component.html',
  styleUrl: './sub-examples.component.scss',
})
export class SubExamplesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'department',
    'role',
    'status',
    'joinDate',
    'salary',
    'actions',
  ];
  dataSource = new MatTableDataSource<TableData>();
  searchValue = '';

  // Sample data
  tableData: TableData[] = [
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
    this.dataSource.data = this.tableData;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch() {
    this.searchValue = '';
    this.applyFilter();
  }

  addNew() {
    console.log('Add new record');
    // Implement add new functionality
  }

  editRecord(element: TableData) {
    console.log('Edit record:', element);
    // Implement edit functionality
  }

  viewRecord(element: TableData) {
    console.log('View record:', element);
    // Implement view functionality
  }

  deleteRecord(element: TableData) {
    console.log('Delete record:', element);
    // Implement delete functionality
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}
