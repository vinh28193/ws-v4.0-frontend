import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialListComponent } from './potential-list.component';

describe('PotentialListComponent', () => {
  let component: PotentialListComponent;
  let fixture: ComponentFixture<PotentialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
