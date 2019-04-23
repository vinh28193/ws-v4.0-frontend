import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingViewsComponent } from './tracking-views.component';

describe('TrackingViewsComponent', () => {
  let component: TrackingViewsComponent;
  let fixture: ComponentFixture<TrackingViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
