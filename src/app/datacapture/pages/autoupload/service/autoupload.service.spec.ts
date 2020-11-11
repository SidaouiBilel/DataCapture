import { TestBed } from '@angular/core/testing';

import { AutouploadService } from './autoupload.service';

describe('AutouploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutouploadService = TestBed.get(AutouploadService);
    expect(service).toBeTruthy();
  });
});
