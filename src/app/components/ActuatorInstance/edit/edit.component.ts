
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActuatorInstanceService } from '../../../services/ActuatorInstance.service';
import { SubBaseComponent } from '../../ActuatorInstance/sub.base.component';


@Component({
    selector: 'app-edit-actuatorInstance',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditActuatorInstanceComponent extends SubBaseComponent implements OnInit {

    title = 'Edit ActuatorInstance';

    actuatorInstanceForm: FormGroup;
    actuatorInstance: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: ActuatorInstanceService,
        private fb: FormBuilder
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

    
    updateActuatorInstance(name, commandTopic, Device, SupportedCommands, ActuatorType): void {
        this.route.params.subscribe((params) => {

                        this.service.updateActuatorInstance(name, commandTopic, Device, SupportedCommands, ActuatorType, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexActuatorInstance']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getActuatorInstance(params['id']).subscribe(res => {
                this.actuatorInstance = res;
            });
        });
    }
}