
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CommandDefinitionService } from '../../../services/CommandDefinition.service';
import { SubBaseComponent } from '../../CommandDefinition/sub.base.component';


@Component({
    selector: 'app-edit-commandDefinition',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditCommandDefinitionComponent extends SubBaseComponent implements OnInit {

    title = 'Edit CommandDefinition';

    commandDefinitionForm: FormGroup;
    commandDefinition: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: CommandDefinitionService,
        private fb: FormBuilder
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

    
    updateCommandDefinition(name, requestSchemaUri, responseSchemaUri, timeoutSeconds, DeviceModel, Actuators, CommandInvocations): void {
        this.route.params.subscribe((params) => {

                        this.service.updateCommandDefinition(name, requestSchemaUri, responseSchemaUri, timeoutSeconds, DeviceModel, Actuators, CommandInvocations, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexCommandDefinition']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getCommandDefinition(params['id']).subscribe(res => {
                this.commandDefinition = res;
            });
        });
    }
}