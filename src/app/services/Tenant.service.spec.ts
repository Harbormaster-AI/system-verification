import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TenantService } from './Tenant.service';

describe('TenantService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [TenantService] });
	});

  it('should be created', () => {
    const service: TenantService = TestBed.get(TenantService);
    expect(service).toBeTruthy();
  });
});
