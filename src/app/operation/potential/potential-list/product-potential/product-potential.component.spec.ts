import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPotentialComponent } from './product-potential.component';

describe('ProductPotentialComponent', () => {
  let component: ProductPotentialComponent;
  let fixture: ComponentFixture<ProductPotentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPotentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPotentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
