import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocalNameComponent } from './edit-local-name.component';

describe('EditLocalNameComponent', () => {
  let component: EditLocalNameComponent;
  let fixture: ComponentFixture<EditLocalNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocalNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocalNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
