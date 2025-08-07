import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

    // Set up minimal config for testing
    component.config = {
      columns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
      ],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup table columns', () => {
    component.config = {
      columns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
      ],
    };

    component.ngOnInit();

    expect(component.displayedColumns).toEqual(['id', 'name', 'email']);
  });

  it('should include actions column when actions are provided', () => {
    component.config = {
      columns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
      ],
      actions: [{ key: 'edit', label: 'Edit', icon: 'edit' }],
    };

    component.ngOnInit();

    expect(component.displayedColumns).toEqual(['id', 'name', 'actions']);
  });

  it('should format currency values correctly', () => {
    const column = { key: 'price', label: 'Price', type: 'currency' as const };
    const result = component.formatCellValue(column, 1234.56);

    expect(result).toBe('$1,234.56');
  });

  it('should format date values correctly', () => {
    const column = { key: 'date', label: 'Date', type: 'date' as const };
    const date = new Date('2023-12-25');
    const result = component.formatCellValue(column, date);

    expect(result).toBe(date.toLocaleDateString());
  });

  it('should emit action clicked event', () => {
    spyOn(component.actionClicked, 'emit');

    component.onActionClick('edit', { id: 1, name: 'Test' });

    expect(component.actionClicked.emit).toHaveBeenCalledWith({
      action: 'edit',
      row: { id: 1, name: 'Test' },
    });
  });

  it('should emit create clicked event', () => {
    spyOn(component.createClicked, 'emit');

    component.onCreateClick();

    expect(component.createClicked.emit).toHaveBeenCalled();
  });

  it('should apply search filter', () => {
    component.data = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
    component.ngOnInit();

    component.searchValue = 'John';
    component.applyFilter();

    expect(component.dataSource.filter).toBe('john');
  });

  it('should clear search filter', () => {
    component.searchValue = 'test';
    component.clearSearch();

    expect(component.searchValue).toBe('');
    expect(component.dataSource.filter).toBe('');
  });
});
