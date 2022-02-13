import { TestBed, inject } from '@angular/core/testing';

import { LiriknchillService } from './liriknchill.service';

describe('LiriknchillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiriknchillService]
    });
  });

  it('should be created', inject([LiriknchillService], (service: LiriknchillService) => {
    expect(service).toBeTruthy();
  }));
});
