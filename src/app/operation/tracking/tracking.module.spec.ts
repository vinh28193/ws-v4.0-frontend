import { TrackingModule } from './tracking.module';

describe('TrackingModule', () => {
  let trackingModule: TrackingModule;

  beforeEach(() => {
    trackingModule = new TrackingModule();
  });

  it('should create an instance', () => {
    expect(trackingModule).toBeTruthy();
  });
});
