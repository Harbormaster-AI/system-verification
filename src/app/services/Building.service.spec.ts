import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { BuildingService } from './Building.service';

describe('BuildingService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [BuildingService] });
	});

  it('should be created', () => {
    const service: BuildingService = TestBed.get(BuildingService);
    expect(service).toBeTruthy();
  });
});
