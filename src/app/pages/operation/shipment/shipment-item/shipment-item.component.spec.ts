import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentItemComponent } from './shipment-item.component';

describe('ShipmentItemComponent', () => {
  let component: ShipmentItemComponent;
  let fixture: ComponentFixture<ShipmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
