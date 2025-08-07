# Data Table Compo```typescript

import { DataTableComponent, TableConfig } from '../components/data-table/data-table.component';nt

This component provides a flexible, configurable data table that can be reused across the application with different data types and configurations.import { DataTableComponent, TableConfig } from '../data-table/data-table.component';

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Sorting**: Column-based sorting (can be disabled per column)
- **Filtering**: Global search across all or specific columns
- **Pagination**: Configurable page sizes and navigation
- **Actions**: Customizable action menus per row
- **Cell Types**: Support for text, date, currency, and badge cell types
- **Sticky Columns**: Support for sticky headers and action columns
- **Loading States**: Built-in loading indicator
- **Empty States**: Graceful handling of empty data

## Basic Usage

```typescript
import { ReusableDataTableComponent, TableConfig } from "../components/reusable-data-table/reusable-data-table.component";

// In your component
export class MyComponent {
  tableConfig: TableConfig = {
    columns: [
      {
        key: "id",
        label: "ID",
        width: "60px",
        sortable: true,
      },
      {
        key: "name",
        label: "Name",
        sortable: true,
      },
      {
        key: "email",
        label: "Email",
        sortable: true,
      },
    ],
    searchEnabled: true,
    paginationEnabled: true,
    createButtonEnabled: true,
  };

  data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];
}
```

````html
```html <app-data-table [data]="data" [config]="tableConfig" (actionClicked)="onActionClicked($event)" (createClicked)="onCreateClicked()"> </app-data-table>
````

## Configuration Options

### TableConfig Interface

```typescript
interface TableConfig {
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
}
```

### TableColumn Interface

```typescript
interface TableColumn {
  key: string; // Property key in your data object
  label: string; // Column header text
  type?: "text" | "date" | "currency" | "badge" | "custom";
  width?: string; // Fixed width (e.g., '120px')
  minWidth?: string; // Minimum width
  sortable?: boolean; // Enable/disable sorting (default: true)
  searchable?: boolean; // Include in search filter (default: true)
  sticky?: boolean; // Make column sticky
  format?: (value: any) => string; // Custom formatter for 'custom' type
  badgeConfig?: {
    // Configuration for 'badge' type
    [key: string]: {
      class: string;
      label?: string;
    };
  };
}
```

### TableAction Interface

```typescript
interface TableAction {
  key: string; // Unique action identifier
  label: string; // Action display text
  icon: string; // Material icon name
  color?: string; // Action color (CSS color)
  visible?: (row: any) => boolean; // Conditional visibility
}
```

## Column Types

### Text (default)

```typescript
{
  key: 'name',
  label: 'Name',
  type: 'text' // or omit type
}
```

### Date

```typescript
{
  key: 'createdAt',
  label: 'Created Date',
  type: 'date'
}
```

### Currency

```typescript
{
  key: 'price',
  label: 'Price',
  type: 'currency'
}
```

### Badge

```typescript
{
  key: 'status',
  label: 'Status',
  type: 'badge',
  badgeConfig: {
    'active': {
      class: 'status-active',
      label: 'ACTIVE'
    },
    'inactive': {
      class: 'status-inactive',
      label: 'INACTIVE'
    }
  }
}
```

### Custom

```typescript
{
  key: 'customField',
  label: 'Custom',
  type: 'custom',
  format: (value) => `Custom: ${value}`
}
```

## Actions Configuration

```typescript
const actions: TableAction[] = [
  {
    key: "view",
    label: "View",
    icon: "visibility",
    color: "#2196f3",
  },
  {
    key: "edit",
    label: "Edit",
    icon: "edit",
    color: "#ff9800",
  },
  {
    key: "delete",
    label: "Delete",
    icon: "delete",
    color: "#f44336",
    visible: (row) => row.status !== "protected", // Conditional visibility
  },
];
```

## Events

### actionClicked

Emitted when a row action is clicked.

```typescript
onActionClicked(event: { action: string; row: any }) {
  switch (event.action) {
    case 'edit':
      this.editRecord(event.row);
      break;
    case 'delete':
      this.deleteRecord(event.row);
      break;
  }
}
```

### createClicked

Emitted when the create button is clicked.

```typescript
onCreateClicked() {
  // Handle create new record
}
```

### rowClicked

Emitted when a table row is clicked.

```typescript
onRowClicked(row: any) {
  // Handle row selection or navigation
}
```

## Styling

The component includes comprehensive styling with support for:

- Material Design principles
- Responsive breakpoints
- Custom badge colors
- Action button colors
- Loading states
- Empty states

### Custom Badge Styles

```scss
// Add to your global styles or component styles
.status-pending {
  background-color: #fff3e0;
  color: #f57c00;
}

.status-completed {
  background-color: #e3f2fd;
  color: #1976d2;
}
```

## Complete Example

```typescript
// my-data-table.component.ts
import { Component, OnInit } from "@angular/core";
import { ReusableDataTableComponent, TableConfig } from "../reusable-data-table/reusable-data-table.component";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: Date;
  salary: number;
}

@Component({
  selector: "app-my-data-table",
  standalone: true,
  imports: [DataTableComponent],
  template: ` <app-reusable-data-table [data]="users" [config]="tableConfig" [loading]="loading" (actionClicked)="onActionClicked($event)" (createClicked)="onCreateUser()" (rowClicked)="onRowClicked($event)"> </app-reusable-data-table> `,
})
export class MyDataTableComponent implements OnInit {
  users: User[] = [];
  loading = false;

  tableConfig: TableConfig = {
    columns: [
      {
        key: "id",
        label: "ID",
        width: "60px",
        sortable: true,
      },
      {
        key: "name",
        label: "Full Name",
        width: "200px",
        sortable: true,
      },
      {
        key: "email",
        label: "Email Address",
        width: "250px",
        sortable: true,
      },
      {
        key: "role",
        label: "Role",
        width: "150px",
        sortable: true,
      },
      {
        key: "status",
        label: "Status",
        type: "badge",
        width: "100px",
        badgeConfig: {
          active: { class: "status-active" },
          inactive: { class: "status-inactive" },
          pending: { class: "status-pending" },
        },
      },
      {
        key: "lastLogin",
        label: "Last Login",
        type: "date",
        width: "120px",
      },
      {
        key: "salary",
        label: "Salary",
        type: "currency",
        width: "120px",
      },
    ],
    actions: [
      {
        key: "view",
        label: "View Profile",
        icon: "person",
        color: "#2196f3",
      },
      {
        key: "edit",
        label: "Edit User",
        icon: "edit",
        color: "#ff9800",
      },
      {
        key: "deactivate",
        label: "Deactivate",
        icon: "block",
        color: "#f44336",
        visible: (user) => user.status === "active",
      },
    ],
    searchEnabled: true,
    searchPlaceholder: "Search users by name, email, or role...",
    paginationEnabled: true,
    pageSizeOptions: [10, 25, 50, 100],
    defaultPageSize: 25,
    createButtonEnabled: true,
    createButtonLabel: "Add New User",
    tableMinWidth: "1200px",
    maxHeight: "600px",
  };

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.users = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@company.com",
          role: "Developer",
          status: "active",
          lastLogin: new Date("2024-01-15"),
          salary: 75000,
        },
        // ... more users
      ];
      this.loading = false;
    }, 1000);
  }

  onActionClicked(event: { action: string; row: User }) {
    switch (event.action) {
      case "view":
        console.log("Viewing user:", event.row);
        break;
      case "edit":
        console.log("Editing user:", event.row);
        break;
      case "deactivate":
        console.log("Deactivating user:", event.row);
        break;
    }
  }

  onCreateUser() {
    console.log("Creating new user");
  }

  onRowClicked(user: User) {
    console.log("User selected:", user);
  }
}
```

This reusable data table component provides a comprehensive solution for displaying tabular data with full customization options while maintaining consistency across your application.
