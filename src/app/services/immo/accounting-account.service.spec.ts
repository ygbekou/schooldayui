import { TestBed, inject } from '@angular/core/testing';

import { AccountingAccountService } from './accounting-account.service';

describe('AccountingAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountingAccountService]
    });
  });

  it('should be created', inject([AccountingAccountService], (service: AccountingAccountService) => {
    expect(service).toBeTruthy();
  }));
});
