import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TenantUserService } from './TenantUser.service';

describe('TenantUserService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [TenantUserService] });
	});

  it('should be created', () => {
    const service: TenantUserService = TestBed.get(TenantUserService);
    expect(service).toBeTruthy();
  });
});
