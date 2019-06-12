import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupCartComponent } from './chat-group-cart.component';

describe('ChatGroupCartComponent', () => {
  let component: ChatGroupCartComponent;
  let fixture: ComponentFixture<ChatGroupCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
