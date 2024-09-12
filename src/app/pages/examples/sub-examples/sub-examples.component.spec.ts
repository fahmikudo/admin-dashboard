import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExamplesComponent } from './sub-examples.component';

describe('SubExamplesComponent', () => {
  let component: SubExamplesComponent;
  let fixture: ComponentFixture<SubExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
