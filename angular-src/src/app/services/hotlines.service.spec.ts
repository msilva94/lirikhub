import { TestBed, inject } from '@angular/core/testing';

import { HotlinesService } from './hotlines.service';

describe('HotlinesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotlinesService]
    });
  });

  it('should be created', inject([HotlinesService], (service: HotlinesService) => {
    expect(service).toBeTruthy();
  }));
});
