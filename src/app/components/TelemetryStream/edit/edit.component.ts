
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TelemetryStreamService } from '../../../services/TelemetryStream.service';
import { SubBaseComponent } from '../../TelemetryStream/sub.base.component';


@Component({
    selector: 'app-edit-telemetryStream',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditTelemetryStreamComponent extends SubBaseComponent implements OnInit {

    title = 'Edit TelemetryStream';

    telemetryStreamForm: FormGroup;
    telemetryStream: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: TelemetryStreamService,
        private fb: FormBuilder
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

    
    updateTelemetryStream(streamName, retentionDays, Device, Sensor, Schema, MessagingEndpoint, RetentionPolicy, Qos): void {
        this.route.params.subscribe((params) => {

                        this.service.updateTelemetryStream(streamName, retentionDays, Device, Sensor, Schema, MessagingEndpoint, RetentionPolicy, Qos, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexTelemetryStream']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getTelemetryStream(params['id']).subscribe(res => {
                this.telemetryStream = res;
            });
        });
    }
}