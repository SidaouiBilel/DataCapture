import { TestBed } from '@angular/core/testing';

import { DBconnectorsService } from './dbconnectors.service';

describe('DBconnectorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DBconnectorsService = TestBed.get(DBconnectorsService);
    expect(service).toBeTruthy();
  });
});
