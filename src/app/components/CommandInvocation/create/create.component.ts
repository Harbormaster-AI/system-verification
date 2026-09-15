
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandInvocationService } from '../../../services/CommandInvocation.service';
import { CommandInvocation } from '../../../models/CommandInvocation';
import { SubBaseComponent } from '../../CommandInvocation/sub.base.component';

@Component({
    selector: 'app-create-commandInvocation',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateCommandInvocationComponent extends SubBaseComponent implements OnInit {

    title = 'Add CommandInvocation';

    commandInvocationForm: FormGroup;
    commandInvocation: CommandInvocation;

    constructor( http: HttpClient,
        private commandInvocationService: CommandInvocationService,
        private fb: FormBuilder,
        private router: Router
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

    
    addCommandInvocation(invocationId, requestedAt, completedAt, Device, CommandDefinition, Actuator, User, Status): void {
        this.commandInvocationService
        .addCommandInvocation(invocationId, requestedAt, completedAt, Device, CommandDefinition, Actuator, User, Status)
            .subscribe(() => {
                this.router.navigate(['/indexCommandInvocation']);
            });
    }

    ngOnInit(): void {
    }
}