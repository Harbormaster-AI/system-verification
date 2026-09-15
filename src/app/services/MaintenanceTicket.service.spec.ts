import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MaintenanceTicketService } from './MaintenanceTicket.service';

describe('MaintenanceTicketService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [MaintenanceTicketService] });
	});

  it('should be created', () => {
    const service: MaintenanceTicketService = TestBed.get(MaintenanceTicketService);
    expect(service).toBeTruthy();
  });
});
