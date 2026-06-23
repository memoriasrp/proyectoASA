import { TestBed } from '@angular/core/testing';

import { TipoUsuariosServices } from './tipo-usuarios-services';

describe('TipoUsuariosServices', () => {
  let service: TipoUsuariosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoUsuariosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
