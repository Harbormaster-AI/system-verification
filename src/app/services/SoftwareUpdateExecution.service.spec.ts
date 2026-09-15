import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SoftwareUpdateExecutionService } from './SoftwareUpdateExecution.service';

describe('SoftwareUpdateExecutionService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [SoftwareUpdateExecutionService] });
	});

  it('should be created', () => {
    const service: SoftwareUpdateExecutionService = TestBed.get(SoftwareUpdateExecutionService);
    expect(service).toBeTruthy();
  });
});
