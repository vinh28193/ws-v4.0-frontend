import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinanceComponent } from './edit-finance.component';

describe('EditFinanceComponent', () => {
  let component: EditFinanceComponent;
  let fixture: ComponentFixture<EditFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
