import { TestBed } from '@angular/core/testing';

import { ExtractorService } from './extractor.service';

describe('ExtractorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtractorService = TestBed.get(ExtractorService);
    expect(service).toBeTruthy();
  });
});
