
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TelemetrySchemaService } from '../../../services/TelemetrySchema.service';
import { SubBaseComponent } from '../../TelemetrySchema/sub.base.component';


@Component({
    selector: 'app-edit-telemetrySchema',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditTelemetrySchemaComponent extends SubBaseComponent implements OnInit {

    title = 'Edit TelemetrySchema';

    telemetrySchemaForm: FormGroup;
    telemetrySchema: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: TelemetrySchemaService,
        private fb: FormBuilder
) {
        super(http);
        this.telemetrySchemaForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  schemaId: ['', Validators.required],
      schemaUri: ['', Validators.required],
      Streams: ['', ],
      Encoding: ['', ]
        });
    }

    
    updateTelemetrySchema(schemaId, schemaUri, Streams, Encoding): void {
        this.route.params.subscribe((params) => {

                        this.service.updateTelemetrySchema(schemaId, schemaUri, Streams, Encoding, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexTelemetrySchema']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getTelemetrySchema(params['id']).subscribe(res => {
                this.telemetrySchema = res;
            });
        });
    }
}