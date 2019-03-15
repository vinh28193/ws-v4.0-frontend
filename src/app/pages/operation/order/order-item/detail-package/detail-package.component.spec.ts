import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPackageComponent } from './detail-package.component';

describe('DetailPackageComponent', () => {
  let component: DetailPackageComponent;
  let fixture: ComponentFixture<DetailPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
