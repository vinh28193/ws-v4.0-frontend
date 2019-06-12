import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCartComponent } from './chat-cart.component';

describe('ChatCartComponent', () => {
  let component: ChatCartComponent;
  let fixture: ComponentFixture<ChatCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
