import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DataRetentionPolicyService } from './DataRetentionPolicy.service';

describe('DataRetentionPolicyService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [DataRetentionPolicyService] });
	});

  it('should be created', () => {
    const service: DataRetentionPolicyService = TestBed.get(DataRetentionPolicyService);
    expect(service).toBeTruthy();
  });
});
