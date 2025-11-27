import { TestBed, inject } from '@angular/core/testing';

import { AmortizationService } from './amortization.service';

describe('AmortizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmortizationService]
    });
  });

  it('should be created', inject([AmortizationService], (service: AmortizationService) => {
    expect(service).toBeTruthy();
  }));
});
