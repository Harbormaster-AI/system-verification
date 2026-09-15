import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { NetworkProfileService } from './NetworkProfile.service';

describe('NetworkProfileService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [NetworkProfileService] });
	});

  it('should be created', () => {
    const service: NetworkProfileService = TestBed.get(NetworkProfileService);
    expect(service).toBeTruthy();
  });
});
