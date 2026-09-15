import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { DeviceGroupService } from './DeviceGroup.service';

describe('DeviceGroupService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [DeviceGroupService] });
	});

  it('should be created', () => {
    const service: DeviceGroupService = TestBed.get(DeviceGroupService);
    expect(service).toBeTruthy();
  });
});
