import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanLabelComponent } from './span-label.component';

describe('SpanLabelComponent', () => {
  let component: SpanLabelComponent;
  let fixture: ComponentFixture<SpanLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpanLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpanLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
