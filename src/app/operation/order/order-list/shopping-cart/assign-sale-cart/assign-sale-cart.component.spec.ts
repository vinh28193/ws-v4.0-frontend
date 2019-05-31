import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSaleCartComponent } from './assign-sale-cart.component';

describe('AssignSaleCartComponent', () => {
  let component: AssignSaleCartComponent;
  let fixture: ComponentFixture<AssignSaleCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSaleCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSaleCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
