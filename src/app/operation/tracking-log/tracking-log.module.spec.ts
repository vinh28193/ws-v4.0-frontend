import { TrackingLogModule } from './tracking-log.module';

describe('TrackingLogModule', () => {
  let trackingLogModule: TrackingLogModule;

  beforeEach(() => {
    trackingLogModule = new TrackingLogModule();
  });

  it('should create an instance', () => {
    expect(trackingLogModule).toBeTruthy();
  });
});
