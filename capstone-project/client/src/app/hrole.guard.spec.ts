import { TestBed } from '@angular/core/testing';

import { HRoleGuard } from './hrole.guard';

describe('HRoleGuard', () => {
  let guard: HRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
