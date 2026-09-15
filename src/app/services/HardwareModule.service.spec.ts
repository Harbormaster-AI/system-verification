import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { HardwareModuleService } from './HardwareModule.service';

describe('HardwareModuleService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [HardwareModuleService] });
	});

  it('should be created', () => {
    const service: HardwareModuleService = TestBed.get(HardwareModuleService);
    expect(service).toBeTruthy();
  });
});
