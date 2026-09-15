
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandDefinitionService } from '../../../services/CommandDefinition.service';
import { CommandDefinition } from '../../../models/CommandDefinition';
import { SubBaseComponent } from '../../CommandDefinition/sub.base.component';

@Component({
    selector: 'app-create-commandDefinition',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateCommandDefinitionComponent extends SubBaseComponent implements OnInit {

    title = 'Add CommandDefinition';

    commandDefinitionForm: FormGroup;
    commandDefinition: CommandDefinition;

    constructor( http: HttpClient,
        private commandDefinitionService: CommandDefinitionService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.commandDefinitionForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      requestSchemaUri: ['', Validators.required],
      responseSchemaUri: ['', Validators.required],
      timeoutSeconds: ['', Validators.required],
      DeviceModel: ['', ],
      Actuators: ['', ],
      CommandInvocations: ['', ]
        });
    }

    
    addCommandDefinition(name, requestSchemaUri, responseSchemaUri, timeoutSeconds, DeviceModel, Actuators, CommandInvocations): void {
        this.commandDefinitionService
        .addCommandDefinition(name, requestSchemaUri, responseSchemaUri, timeoutSeconds, DeviceModel, Actuators, CommandInvocations)
            .subscribe(() => {
                this.router.navigate(['/indexCommandDefinition']);
            });
    }

    ngOnInit(): void {
    }
}