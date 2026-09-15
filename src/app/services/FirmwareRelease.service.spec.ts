import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { FirmwareReleaseService } from './FirmwareRelease.service';

describe('FirmwareReleaseService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [FirmwareReleaseService] });
	});

  it('should be created', () => {
    const service: FirmwareReleaseService = TestBed.get(FirmwareReleaseService);
    expect(service).toBeTruthy();
  });
});
