import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageItemListComponent } from './package-item-list.component';

describe('PackageItemListComponent', () => {
  let component: PackageItemListComponent;
  let fixture: ComponentFixture<PackageItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
