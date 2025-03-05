import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { payloadGuard } from './payload.guard';

describe('payloadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => payloadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
