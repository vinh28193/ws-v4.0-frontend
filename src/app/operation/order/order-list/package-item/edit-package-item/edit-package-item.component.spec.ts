import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackageItemComponent } from './edit-package-item.component';

describe('EditPackageItemComponent', () => {
  let component: EditPackageItemComponent;
  let fixture: ComponentFixture<EditPackageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPackageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPackageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
