import { TestBed, inject } from '@angular/core/testing';

import { ReceptionService } from './reception.service';

describe('ReceptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceptionService]
    });
  });

  it('should be created', inject([ReceptionService], (service: ReceptionService) => {
    expect(service).toBeTruthy();
  }));
});
