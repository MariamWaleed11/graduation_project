import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { progrationGuard } from './progration.guard';

describe('progrationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => progrationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
