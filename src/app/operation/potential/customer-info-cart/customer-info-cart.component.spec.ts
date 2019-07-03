import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoCartComponent } from './customer-info-cart.component';

describe('CustomerInfoCartComponent', () => {
  let component: CustomerInfoCartComponent;
  let fixture: ComponentFixture<CustomerInfoCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInfoCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInfoCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
