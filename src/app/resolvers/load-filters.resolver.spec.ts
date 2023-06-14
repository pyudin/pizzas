import { TestBed } from '@angular/core/testing';

import { LoadFiltersResolver } from './load-filters.resolver';

describe('LoadFiltersResolver', () => {
  let resolver: LoadFiltersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LoadFiltersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
