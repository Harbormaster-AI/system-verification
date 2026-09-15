import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MessagingEndpointService } from './MessagingEndpoint.service';

describe('MessagingEndpointService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [MessagingEndpointService] });
	});

  it('should be created', () => {
    const service: MessagingEndpointService = TestBed.get(MessagingEndpointService);
    expect(service).toBeTruthy();
  });
});
