import { TestBed } from '@angular/core/testing';

import { ApiVeterinariaService } from './api-veterinaria.service';

describe('ApiVeterinariaService', () => {
  let service: ApiVeterinariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiVeterinariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
