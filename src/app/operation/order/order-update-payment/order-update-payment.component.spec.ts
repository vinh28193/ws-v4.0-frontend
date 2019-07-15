import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpdatePaymentComponent } from './order-update-payment.component';

describe('OrderUpdatePaymentComponent', () => {
  let component: OrderUpdatePaymentComponent;
  let fixture: ComponentFixture<OrderUpdatePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUpdatePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUpdatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
