import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TwinTemplateService } from './TwinTemplate.service';

describe('TwinTemplateService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [TwinTemplateService] });
	});

  it('should be created', () => {
    const service: TwinTemplateService = TestBed.get(TwinTemplateService);
    expect(service).toBeTruthy();
  });
});
