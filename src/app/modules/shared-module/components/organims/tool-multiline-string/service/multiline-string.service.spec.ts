import { TestBed } from '@angular/core/testing';

import { MultilineStringService } from './multiline-string.service';

describe('MultilineStringService', () => {
  let service: MultilineStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultilineStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
