import { TestBed } from '@angular/core/testing';

import { ConverterApiService } from './converter-api.service';

describe('ConverterApiService', () => {
  let service: ConverterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
