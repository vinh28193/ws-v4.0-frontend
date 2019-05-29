import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLogComponent } from './more-log.component';

describe('MoreLogComponent', () => {
  let component: MoreLogComponent;
  let fixture: ComponentFixture<MoreLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
