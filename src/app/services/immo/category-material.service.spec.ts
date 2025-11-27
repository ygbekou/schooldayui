import { TestBed, inject } from '@angular/core/testing';

import { CategoryMaterialService } from './category-material.service';

describe('CategoryMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryMaterialService]
    });
  });

  it('should be created', inject([CategoryMaterialService], (service: CategoryMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
