import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { EdgeApplicationService } from './EdgeApplication.service';

describe('EdgeApplicationService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [EdgeApplicationService] });
	});

  it('should be created', () => {
    const service: EdgeApplicationService = TestBed.get(EdgeApplicationService);
    expect(service).toBeTruthy();
  });
});
