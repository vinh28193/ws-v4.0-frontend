import { I18nModule } from './i18n.module';

describe('I18nModule', () => {
  let i18nModule: I18nModule;

  beforeEach(() => {
    i18nModule = new I18nModule();
  });

  it('should create an instance', () => {
    expect(i18nModule).toBeTruthy();
  });
});
