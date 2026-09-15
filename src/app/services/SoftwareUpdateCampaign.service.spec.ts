import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SoftwareUpdateCampaignService } from './SoftwareUpdateCampaign.service';

describe('SoftwareUpdateCampaignService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [SoftwareUpdateCampaignService] });
	});

  it('should be created', () => {
    const service: SoftwareUpdateCampaignService = TestBed.get(SoftwareUpdateCampaignService);
    expect(service).toBeTruthy();
  });
});
