import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { IoTDeviceService } from './IoTDevice.service';

describe('IoTDeviceService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [IoTDeviceService] });
	});

  it('should be created', () => {
    const service: IoTDeviceService = TestBed.get(IoTDeviceService);
    expect(service).toBeTruthy();
  });
});
