import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarios } from './tipo-usuarios';

describe('TipoUsuarios', () => {
  let component: TipoUsuarios;
  let fixture: ComponentFixture<TipoUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
