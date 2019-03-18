import { TestBed, async } from '@angular/core/testing';
import { AppRoutingComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppRoutingComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppRoutingComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'weshop-frontend'`, () => {
    const fixture = TestBed.createComponent(AppRoutingComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('weshop-frontend');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppRoutingComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to weshop-frontend!');
  });
});
