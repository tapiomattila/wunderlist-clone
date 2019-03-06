import { TestBed } from '@angular/core/testing';

import { InmemorywebapidataService } from './inmemorywebapidata.service';

describe('InmemorywebapidataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InmemorywebapidataService = TestBed.get(InmemorywebapidataService);
    expect(service).toBeTruthy();
  });
});
