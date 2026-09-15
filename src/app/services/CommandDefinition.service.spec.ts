import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommandDefinitionService } from './CommandDefinition.service';

describe('CommandDefinitionService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [CommandDefinitionService] });
	});

  it('should be created', () => {
    const service: CommandDefinitionService = TestBed.get(CommandDefinitionService);
    expect(service).toBeTruthy();
  });
});
