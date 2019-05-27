import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShoppingCartComponent } from './product-shopping-cart.component';

describe('ProductShoppingCartComponent', () => {
  let component: ProductShoppingCartComponent;
  let fixture: ComponentFixture<ProductShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
