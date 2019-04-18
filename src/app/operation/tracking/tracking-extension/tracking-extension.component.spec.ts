import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingExtensionComponent } from './tracking-extension.component';

describe('TrackingExtensionComponent', () => {
  let component: TrackingExtensionComponent;
  let fixture: ComponentFixture<TrackingExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
