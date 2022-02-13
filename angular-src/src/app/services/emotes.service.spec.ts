import { TestBed, inject } from '@angular/core/testing';

import { EmotesService } from './emotes.service';

describe('EmotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmotesService]
    });
  });

  it('should be created', inject([EmotesService], (service: EmotesService) => {
    expect(service).toBeTruthy();
  }));
});
