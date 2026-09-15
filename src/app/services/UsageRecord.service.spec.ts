import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { UsageRecordService } from './UsageRecord.service';

describe('UsageRecordService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [UsageRecordService] });
	});

  it('should be created', () => {
    const service: UsageRecordService = TestBed.get(UsageRecordService);
    expect(service).toBeTruthy();
  });
});
