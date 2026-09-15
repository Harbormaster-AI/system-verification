
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActuatorInstanceService } from '../../../services/ActuatorInstance.service';
import { ActuatorInstance } from '../../../models/ActuatorInstance';
import { SubBaseComponent } from '../../ActuatorInstance/sub.base.component';

@Component({
    selector: 'app-create-actuatorInstance',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateActuatorInstanceComponent extends SubBaseComponent implements OnInit {

    title = 'Add ActuatorInstance';

    actuatorInstanceForm: FormGroup;
    actuatorInstance: ActuatorInstance;

    constructor( http: HttpClient,
        private actuatorInstanceService: ActuatorInstanceService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.actuatorInstanceForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      commandTopic: ['', Validators.required],
      Device: ['', ],
      SupportedCommands: ['', ],
      ActuatorType: ['', ]
        });
    }

    
    addActuatorInstance(name, commandTopic, Device, SupportedCommands, ActuatorType): void {
        this.actuatorInstanceService
        .addActuatorInstance(name, commandTopic, Device, SupportedCommands, ActuatorType)
            .subscribe(() => {
                this.router.navigate(['/indexActuatorInstance']);
            });
    }

    ngOnInit(): void {
    }
}