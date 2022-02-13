import { TestBed, inject } from '@angular/core/testing';

import { PlaythroughsService } from './playthroughs.service';

describe('PlaythroughsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaythroughsService]
    });
  });

  it('should be created', inject([PlaythroughsService], (service: PlaythroughsService) => {
    expect(service).toBeTruthy();
  }));
});
