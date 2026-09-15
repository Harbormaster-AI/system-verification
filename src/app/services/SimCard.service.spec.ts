import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SimCardService } from './SimCard.service';

describe('SimCardService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [SimCardService] });
	});

  it('should be created', () => {
    const service: SimCardService = TestBed.get(SimCardService);
    expect(service).toBeTruthy();
  });
});
