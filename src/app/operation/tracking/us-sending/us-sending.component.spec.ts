import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsSendingComponent } from './us-sending.component';

describe('UsSendingComponent', () => {
  let component: UsSendingComponent;
  let fixture: ComponentFixture<UsSendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsSendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsSendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
