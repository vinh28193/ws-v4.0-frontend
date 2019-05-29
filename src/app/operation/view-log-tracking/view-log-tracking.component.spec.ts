import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogTrackingComponent } from './view-log-tracking.component';

describe('ViewLogTrackingComponent', () => {
  let component: ViewLogTrackingComponent;
  let fixture: ComponentFixture<ViewLogTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLogTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
