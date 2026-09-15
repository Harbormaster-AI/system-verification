import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { RoomService } from './Room.service';

describe('RoomService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [RoomService] });
	});

  it('should be created', () => {
    const service: RoomService = TestBed.get(RoomService);
    expect(service).toBeTruthy();
  });
});
