import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingDetailComponent } from './packing-detail.component';

describe('PackingDetailComponent', () => {
  let component: PackingDetailComponent;
  let fixture: ComponentFixture<PackingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
