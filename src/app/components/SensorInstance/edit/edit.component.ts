
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SensorInstanceService } from '../../../services/SensorInstance.service';
import { SubBaseComponent } from '../../SensorInstance/sub.base.component';


@Component({
    selector: 'app-edit-sensorInstance',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditSensorInstanceComponent extends SubBaseComponent implements OnInit {

    title = 'Edit SensorInstance';

    sensorInstanceForm: FormGroup;
    sensorInstance: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: SensorInstanceService,
        private fb: FormBuilder
) {
        super(http);
        this.sensorInstanceForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      unit: ['', Validators.required],
      samplingIntervalMs: ['', Validators.required],
      Device: ['', ],
      TelemetryStreams: ['', ],
      SensorType: ['', ]
        });
    }

    
    updateSensorInstance(name, unit, samplingIntervalMs, Device, TelemetryStreams, SensorType): void {
        this.route.params.subscribe((params) => {

                        this.service.updateSensorInstance(name, unit, samplingIntervalMs, Device, TelemetryStreams, SensorType, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexSensorInstance']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getSensorInstance(params['id']).subscribe(res => {
                this.sensorInstance = res;
            });
        });
    }
}