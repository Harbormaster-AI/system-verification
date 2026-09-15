import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DeviceCertificateService } from './DeviceCertificate.service';

describe('DeviceCertificateService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [DeviceCertificateService] });
	});

  it('should be created', () => {
    const service: DeviceCertificateService = TestBed.get(DeviceCertificateService);
    expect(service).toBeTruthy();
  });
});
