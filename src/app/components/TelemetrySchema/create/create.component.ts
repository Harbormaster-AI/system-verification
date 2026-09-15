
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelemetrySchemaService } from '../../../services/TelemetrySchema.service';
import { TelemetrySchema } from '../../../models/TelemetrySchema';
import { SubBaseComponent } from '../../TelemetrySchema/sub.base.component';

@Component({
    selector: 'app-create-telemetrySchema',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateTelemetrySchemaComponent extends SubBaseComponent implements OnInit {

    title = 'Add TelemetrySchema';

    telemetrySchemaForm: FormGroup;
    telemetrySchema: TelemetrySchema;

    constructor( http: HttpClient,
        private telemetrySchemaService: TelemetrySchemaService,
        private fb: FormBuilder,
        private router: Router
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

    
    addTelemetrySchema(schemaId, schemaUri, Streams, Encoding): void {
        this.telemetrySchemaService
        .addTelemetrySchema(schemaId, schemaUri, Streams, Encoding)
            .subscribe(() => {
                this.router.navigate(['/indexTelemetrySchema']);
            });
    }

    ngOnInit(): void {
    }
}