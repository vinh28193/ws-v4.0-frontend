import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMessageComponent } from './source-message.component';

describe('SourceMessageComponent', () => {
  let component: SourceMessageComponent;
  let fixture: ComponentFixture<SourceMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
