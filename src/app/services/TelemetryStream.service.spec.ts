import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TelemetryStreamService } from './TelemetryStream.service';

describe('TelemetryStreamService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [TelemetryStreamService] });
	});

  it('should be created', () => {
    const service: TelemetryStreamService = TestBed.get(TelemetryStreamService);
    expect(service).toBeTruthy();
  });
});
