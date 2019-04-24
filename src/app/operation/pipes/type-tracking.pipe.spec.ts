import { TypeTrackingPipe } from './type-tracking.pipe';

describe('TypeTrackingPipe', () => {
  it('create an instance', () => {
    const pipe = new TypeTrackingPipe();
    expect(pipe).toBeTruthy();
  });
});
