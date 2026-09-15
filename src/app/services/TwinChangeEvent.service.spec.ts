import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TwinChangeEventService } from './TwinChangeEvent.service';

describe('TwinChangeEventService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [TwinChangeEventService] });
	});

  it('should be created', () => {
    const service: TwinChangeEventService = TestBed.get(TwinChangeEventService);
    expect(service).toBeTruthy();
  });
});
