import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { controlGuard } from './control.guard';

describe('controlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
