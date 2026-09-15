import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ProvisioningRecordService } from './ProvisioningRecord.service';

describe('ProvisioningRecordService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [ProvisioningRecordService] });
	});

  it('should be created', () => {
    const service: ProvisioningRecordService = TestBed.get(ProvisioningRecordService);
    expect(service).toBeTruthy();
  });
});
