import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageInfoComponent } from './tracking-info.component';

describe('TrackingInfoComponent', () => {
  let component: PackageInfoComponent;
  let fixture: ComponentFixture<PackageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
