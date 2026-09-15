import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DigitalTwinService } from './DigitalTwin.service';

describe('DigitalTwinService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [DigitalTwinService] });
	});

  it('should be created', () => {
    const service: DigitalTwinService = TestBed.get(DigitalTwinService);
    expect(service).toBeTruthy();
  });
});
