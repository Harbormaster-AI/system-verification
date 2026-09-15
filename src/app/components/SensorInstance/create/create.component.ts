
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorInstanceService } from '../../../services/SensorInstance.service';
import { SensorInstance } from '../../../models/SensorInstance';
import { SubBaseComponent } from '../../SensorInstance/sub.base.component';

@Component({
    selector: 'app-create-sensorInstance',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateSensorInstanceComponent extends SubBaseComponent implements OnInit {

    title = 'Add SensorInstance';

    sensorInstanceForm: FormGroup;
    sensorInstance: SensorInstance;

    constructor( http: HttpClient,
        private sensorInstanceService: SensorInstanceService,
        private fb: FormBuilder,
        private router: Router
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

    
    addSensorInstance(name, unit, samplingIntervalMs, Device, TelemetryStreams, SensorType): void {
        this.sensorInstanceService
        .addSensorInstance(name, unit, samplingIntervalMs, Device, TelemetryStreams, SensorType)
            .subscribe(() => {
                this.router.navigate(['/indexSensorInstance']);
            });
    }

    ngOnInit(): void {
    }
}