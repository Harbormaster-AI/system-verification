import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ConnectivityPlanService } from './ConnectivityPlan.service';

describe('ConnectivityPlanService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [ConnectivityPlanService] });
	});

  it('should be created', () => {
    const service: ConnectivityPlanService = TestBed.get(ConnectivityPlanService);
    expect(service).toBeTruthy();
  });
});
