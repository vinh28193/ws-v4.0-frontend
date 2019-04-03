import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDraftComponent } from './package-draft.component';

describe('PackageDraftComponent', () => {
  let component: PackageDraftComponent;
  let fixture: ComponentFixture<PackageDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
