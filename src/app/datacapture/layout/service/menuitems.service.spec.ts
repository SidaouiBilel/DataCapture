import { TestBed } from '@angular/core/testing';

import { MenuitemsService } from './menuitems.service';

describe('MenuitemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuitemsService = TestBed.get(MenuitemsService);
    expect(service).toBeTruthy();
  });
});
