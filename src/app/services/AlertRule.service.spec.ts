import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AlertRuleService } from './AlertRule.service';

describe('AlertRuleService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [AlertRuleService] });
	});

  it('should be created', () => {
    const service: AlertRuleService = TestBed.get(AlertRuleService);
    expect(service).toBeTruthy();
  });
});
