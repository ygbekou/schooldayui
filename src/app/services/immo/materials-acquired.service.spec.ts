import { TestBed, inject } from '@angular/core/testing';

import { MaterialsAcquiredService } from './materials-acquired.service';

describe('MaterialsAcquiredService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialsAcquiredService]
    });
  });

  it('should be created', inject([MaterialsAcquiredService], (service: MaterialsAcquiredService) => {
    expect(service).toBeTruthy();
  }));
});
