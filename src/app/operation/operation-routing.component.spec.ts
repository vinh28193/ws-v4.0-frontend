import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationRoutingComponent } from './operation.component';

describe('OperationComponent', () => {
  let component: OperationRoutingComponent;
  let fixture: ComponentFixture<OperationRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
