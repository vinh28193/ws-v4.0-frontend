import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignSalePotentialComponent } from './asign-sale-potential.component';

describe('AsignSalePotentialComponent', () => {
  let component: AsignSalePotentialComponent;
  let fixture: ComponentFixture<AsignSalePotentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignSalePotentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignSalePotentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
