
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CommandInvocationService } from '../../../services/CommandInvocation.service';
import { SubBaseComponent } from '../../CommandInvocation/sub.base.component';


@Component({
    selector: 'app-edit-commandInvocation',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditCommandInvocationComponent extends SubBaseComponent implements OnInit {

    title = 'Edit CommandInvocation';

    commandInvocationForm: FormGroup;
    commandInvocation: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: CommandInvocationService,
        private fb: FormBuilder
) {
        super(http);
        this.commandInvocationForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  invocationId: ['', Validators.required],
      requestedAt: ['', Validators.required],
      completedAt: ['', Validators.required],
      Device: ['', ],
      CommandDefinition: ['', ],
      Actuator: ['', ],
      User: ['', ],
      Status: ['', ]
        });
    }

    
    updateCommandInvocation(invocationId, requestedAt, completedAt, Device, CommandDefinition, Actuator, User, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateCommandInvocation(invocationId, requestedAt, completedAt, Device, CommandDefinition, Actuator, User, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexCommandInvocation']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getCommandInvocation(params['id']).subscribe(res => {
                this.commandInvocation = res;
            });
        });
    }
}