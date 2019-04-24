import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsSendingViewsComponent } from './us-sending-views.component';

describe('UsSendingViewsComponent', () => {
  let component: UsSendingViewsComponent;
  let fixture: ComponentFixture<UsSendingViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsSendingViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsSendingViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
