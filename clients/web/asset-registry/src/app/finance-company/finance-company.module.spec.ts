import { FinanceCompanyModule } from './finance-company.module';

describe('FinanceCompanyModule', () => {
  let financeCompanyModule: FinanceCompanyModule;

  beforeEach(() => {
    financeCompanyModule = new FinanceCompanyModule();
  });

  it('should create an instance', () => {
    expect(financeCompanyModule).toBeTruthy();
  });
});
