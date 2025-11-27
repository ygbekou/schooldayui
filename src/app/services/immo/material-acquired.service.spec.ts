import { TestBed, inject } from '@angular/core/testing';

import { MaterialAcquiredService } from './material-acquired.service';

describe('MaterialAcquiredService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialAcquiredService]
    });
  });

  it('should be created', inject([MaterialAcquiredService], (service: MaterialAcquiredService) => {
    expect(service).toBeTruthy();
  }));
});
