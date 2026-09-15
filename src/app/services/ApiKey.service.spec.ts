import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ApiKeyService } from './ApiKey.service';

describe('ApiKeyService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [ApiKeyService] });
	});

  it('should be created', () => {
    const service: ApiKeyService = TestBed.get(ApiKeyService);
    expect(service).toBeTruthy();
  });
});
