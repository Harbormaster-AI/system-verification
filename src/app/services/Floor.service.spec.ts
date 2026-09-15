import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { FloorService } from './Floor.service';

describe('FloorService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [FloorService] });
	});

  it('should be created', () => {
    const service: FloorService = TestBed.get(FloorService);
    expect(service).toBeTruthy();
  });
});
