import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommandInvocationService } from './CommandInvocation.service';

describe('CommandInvocationService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [CommandInvocationService] });
	});

  it('should be created', () => {
    const service: CommandInvocationService = TestBed.get(CommandInvocationService);
    expect(service).toBeTruthy();
  });
});
