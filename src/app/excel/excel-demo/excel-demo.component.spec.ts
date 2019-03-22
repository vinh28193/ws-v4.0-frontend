import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDemoComponent } from './excel-demo.component';

describe('ExcelDemoComponent', () => {
  let component: ExcelDemoComponent;
  let fixture: ComponentFixture<ExcelDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
