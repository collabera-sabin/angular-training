import { TestBed } from '@angular/core/testing';

import { MRoleGuard } from './mrole.guard';

describe('MRoleGuard', () => {
  let guard: MRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
