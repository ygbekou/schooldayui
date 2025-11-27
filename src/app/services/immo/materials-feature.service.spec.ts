import { TestBed, inject } from '@angular/core/testing';

import { MaterialsFeatureService } from './materials-feature.service';

describe('MaterialsFeatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialsFeatureService]
    });
  });

  it('should be created', inject([MaterialsFeatureService], (service: MaterialsFeatureService) => {
    expect(service).toBeTruthy();
  }));
});
