import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingSentComponent } from './tracking-sent.component';

describe('TrackingSentComponent', () => {
  let component: TrackingSentComponent;
  let fixture: ComponentFixture<TrackingSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
