import { TestBed, inject } from '@angular/core/testing';

import { BattlestationsService } from './battlestations.service';

describe('BattlestationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BattlestationsService]
    });
  });

  it('should be created', inject([BattlestationsService], (service: BattlestationsService) => {
    expect(service).toBeTruthy();
  }));
});
