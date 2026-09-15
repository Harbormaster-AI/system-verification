import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SiteService } from './Site.service';

describe('SiteService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [SiteService] });
	});

  it('should be created', () => {
    const service: SiteService = TestBed.get(SiteService);
    expect(service).toBeTruthy();
  });
});
