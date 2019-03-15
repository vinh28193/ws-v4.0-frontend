import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSaleComponent } from './assign-sale.component';

describe('AssignSaleComponent', () => {
  let component: AssignSaleComponent;
  let fixture: ComponentFixture<AssignSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
