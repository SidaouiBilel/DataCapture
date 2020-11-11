import { TestBed } from '@angular/core/testing';

import { S3connectorsService } from './s3connectors.service';

describe('S3connectorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: S3connectorsService = TestBed.get(S3connectorsService);
    expect(service).toBeTruthy();
  });
});
