import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DeviceModelService } from './DeviceModel.service';

describe('DeviceModelService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [DeviceModelService] });
	});

  it('should be created', () => {
    const service: DeviceModelService = TestBed.get(DeviceModelService);
    expect(service).toBeTruthy();
  });
});
