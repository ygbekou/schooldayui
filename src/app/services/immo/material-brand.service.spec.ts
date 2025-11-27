import { TestBed, inject } from '@angular/core/testing';

import { MaterialBrandService } from './material-brand.service';

describe('MaterialBrandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialBrandService]
    });
  });

  it('should be created', inject([MaterialBrandService], (service: MaterialBrandService) => {
    expect(service).toBeTruthy();
  }));
});
