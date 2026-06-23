import { TestBed } from '@angular/core/testing';

import { Menus } from './menus';

describe('Menus', () => {
  let service: Menus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Menus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
