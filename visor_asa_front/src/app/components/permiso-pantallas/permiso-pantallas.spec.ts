import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoPantallas } from './permiso-pantallas';

describe('PermisoPantallas', () => {
  let component: PermisoPantallas;
  let fixture: ComponentFixture<PermisoPantallas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisoPantallas],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoPantallas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
