import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TelemetrySchemaService } from './TelemetrySchema.service';

describe('TelemetrySchemaService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [TelemetrySchemaService] });
	});

  it('should be created', () => {
    const service: TelemetrySchemaService = TestBed.get(TelemetrySchemaService);
    expect(service).toBeTruthy();
  });
});
