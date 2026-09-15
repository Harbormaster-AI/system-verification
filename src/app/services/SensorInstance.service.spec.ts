import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SensorInstanceService } from './SensorInstance.service';

describe('SensorInstanceService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [SensorInstanceService] });
	});

  it('should be created', () => {
    const service: SensorInstanceService = TestBed.get(SensorInstanceService);
    expect(service).toBeTruthy();
  });
});
