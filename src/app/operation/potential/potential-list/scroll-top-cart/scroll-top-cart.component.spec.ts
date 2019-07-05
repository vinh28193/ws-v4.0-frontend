import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTopCartComponent } from './scroll-top-cart.component';

describe('ScrollTopCartComponent', () => {
  let component: ScrollTopCartComponent;
  let fixture: ComponentFixture<ScrollTopCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollTopCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollTopCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
