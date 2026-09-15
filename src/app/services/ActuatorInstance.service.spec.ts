import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ActuatorInstanceService } from './ActuatorInstance.service';

describe('ActuatorInstanceService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [ActuatorInstanceService] });
	});

  it('should be created', () => {
    const service: ActuatorInstanceService = TestBed.get(ActuatorInstanceService);
    expect(service).toBeTruthy();
  });
});
