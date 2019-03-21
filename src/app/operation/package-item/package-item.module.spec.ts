import { PackageItemModule } from './package-item.module';

describe('PackageItemModule', () => {
  let packageItemModule: PackageItemModule;

  beforeEach(() => {
    packageItemModule = new PackageItemModule();
  });

  it('should create an instance', () => {
    expect(packageItemModule).toBeTruthy();
  });
});
