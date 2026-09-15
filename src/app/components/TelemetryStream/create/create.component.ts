
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelemetryStreamService } from '../../../services/TelemetryStream.service';
import { TelemetryStream } from '../../../models/TelemetryStream';
import { SubBaseComponent } from '../../TelemetryStream/sub.base.component';

@Component({
    selector: 'app-create-telemetryStream',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateTelemetryStreamComponent extends SubBaseComponent implements OnInit {

    title = 'Add TelemetryStream';

    telemetryStreamForm: FormGroup;
    telemetryStream: TelemetryStream;

    constructor( http: HttpClient,
        private telemetryStreamService: TelemetryStreamService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.telemetryStreamForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  streamName: ['', Validators.required],
      retentionDays: ['', Validators.required],
      Device: ['', ],
      Sensor: ['', ],
      Schema: ['', ],
      MessagingEndpoint: ['', ],
      RetentionPolicy: ['', ],
      Qos: ['', ]
        });
    }

    
    addTelemetryStream(streamName, retentionDays, Device, Sensor, Schema, MessagingEndpoint, RetentionPolicy, Qos): void {
        this.telemetryStreamService
        .addTelemetryStream(streamName, retentionDays, Device, Sensor, Schema, MessagingEndpoint, RetentionPolicy, Qos)
            .subscribe(() => {
                this.router.navigate(['/indexTelemetryStream']);
            });
    }

    ngOnInit(): void {
    }
}