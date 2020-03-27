import { TestBed, inject } from '@angular/core/testing';

import { BimserviceService } from './bimservice.service';

describe('BimserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BimserviceService]
    });
  });

  it('should be created', inject([BimserviceService], (service: BimserviceService) => {
    expect(service).toBeTruthy();
  }));
});
