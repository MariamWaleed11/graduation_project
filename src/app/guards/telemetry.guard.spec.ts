import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { telemetryGuard } from './telemetry.guard';

describe('telemetryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => telemetryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
