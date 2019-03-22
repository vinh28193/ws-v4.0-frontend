import { ExcelModule } from './excel.module';

describe('ExcelModule', () => {
  let excelModule: ExcelModule;

  beforeEach(() => {
    excelModule = new ExcelModule();
  });

  it('should create an instance', () => {
    expect(excelModule).toBeTruthy();
  });
});
