

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelemetrySchemaService } from '../../../services/TelemetrySchema.service';
import { TelemetrySchema } from '../../../models/TelemetrySchema';

@Component({
    selector: 'app-index-telemetrySchema',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexTelemetrySchemaComponent implements OnInit {

    telemetrySchemas: TelemetrySchema[] = [];

    constructor(
        private router: Router,
        private service: TelemetrySchemaService
) {}

    ngOnInit(): void {
        this.getTelemetrySchemas();
}

    getTelemetrySchemas(): void {
        this.service.getTelemetrySchemas().subscribe((res) => {
        this.telemetrySchemas = res;
    });
}

    deleteTelemetrySchema(id: any): void {
        this.service.deleteTelemetrySchema(id)
            .subscribe(() => {
                this.getTelemetrySchemas();
            });
    }
}