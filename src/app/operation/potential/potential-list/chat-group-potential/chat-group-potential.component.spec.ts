import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupPotentialComponent } from './chat-group-potential.component';

describe('ChatGroupPotentialComponent', () => {
  let component: ChatGroupPotentialComponent;
  let fixture: ComponentFixture<ChatGroupPotentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGroupPotentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupPotentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
