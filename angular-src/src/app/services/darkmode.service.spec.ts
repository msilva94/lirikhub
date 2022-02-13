import { TestBed, inject } from '@angular/core/testing';

import { DarkmodeService } from './darkmode.service';

describe('DarkmodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkmodeService]
    });
  });

  it('should be created', inject([DarkmodeService], (service: DarkmodeService) => {
    expect(service).toBeTruthy();
  }));
});
