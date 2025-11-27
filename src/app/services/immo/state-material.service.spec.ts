import { TestBed, inject } from '@angular/core/testing';

import { StateMaterialService } from './state-material.service';

describe('StateMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateMaterialService]
    });
  });

  it('should be created', inject([StateMaterialService], (service: StateMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
