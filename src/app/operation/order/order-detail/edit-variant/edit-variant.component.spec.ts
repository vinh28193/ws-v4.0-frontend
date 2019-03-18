import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariantComponent } from './edit-variant.component';

describe('EditVariantComponent', () => {
  let component: EditVariantComponent;
  let fixture: ComponentFixture<EditVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
