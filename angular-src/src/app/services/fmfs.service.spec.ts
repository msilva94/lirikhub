import { TestBed, inject } from '@angular/core/testing';

import { FmfsService } from './fmfs.service';

describe('FmfsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FmfsService]
    });
  });

  it('should be created', inject([FmfsService], (service: FmfsService) => {
    expect(service).toBeTruthy();
  }));
});
