import { CurrentStatusPipe } from './current-status.pipe';

describe('CurrentStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrentStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
