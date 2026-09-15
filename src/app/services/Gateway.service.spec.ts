import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { GatewayService } from './Gateway.service';

describe('GatewayService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [GatewayService] });
	});

  it('should be created', () => {
    const service: GatewayService = TestBed.get(GatewayService);
    expect(service).toBeTruthy();
  });
});
