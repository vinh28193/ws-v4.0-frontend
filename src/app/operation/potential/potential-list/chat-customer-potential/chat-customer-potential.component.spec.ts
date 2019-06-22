import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCustomerPotentialComponent } from './chat-customer-potential.component';

describe('ChatCustomerPotentialComponent', () => {
  let component: ChatCustomerPotentialComponent;
  let fixture: ComponentFixture<ChatCustomerPotentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCustomerPotentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCustomerPotentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
