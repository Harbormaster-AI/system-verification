import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AccessPolicyService } from './AccessPolicy.service';

describe('AccessPolicyService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [AccessPolicyService] });
	});

  it('should be created', () => {
    const service: AccessPolicyService = TestBed.get(AccessPolicyService);
    expect(service).toBeTruthy();
  });
});
