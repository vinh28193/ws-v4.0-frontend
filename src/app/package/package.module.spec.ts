import { PackageModule } from './package.module';

describe('PackageModule', () => {
  let packageModule: PackageModule;

  beforeEach(() => {
    packageModule = new PackageModule();
  });

  it('should create an instance', () => {
    expect(packageModule).toBeTruthy();
  });
});
