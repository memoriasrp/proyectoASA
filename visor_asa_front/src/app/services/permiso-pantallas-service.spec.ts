import { TestBed } from '@angular/core/testing';

import { PermisoPantallasService } from './permiso-pantallas-service';

describe('PermisoPantallasService', () => {
  let service: PermisoPantallasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoPantallasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
