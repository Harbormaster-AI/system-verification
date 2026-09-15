import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DeviceVendorService } from './DeviceVendor.service';

describe('DeviceVendorService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [DeviceVendorService] });
	});

  it('should be created', () => {
    const service: DeviceVendorService = TestBed.get(DeviceVendorService);
    expect(service).toBeTruthy();
  });
});
