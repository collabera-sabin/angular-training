import { TestBed } from '@angular/core/testing';

import { BroleGuard } from './brole.guard';

describe('BroleGuard', () => {
  let guard: BroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
