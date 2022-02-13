import { TestBed, inject } from '@angular/core/testing';

import { SubsundayService } from './subsunday.service';

describe('SubsundayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubsundayService]
    });
  });

  it('should be created', inject([SubsundayService], (service: SubsundayService) => {
    expect(service).toBeTruthy();
  }));
});
