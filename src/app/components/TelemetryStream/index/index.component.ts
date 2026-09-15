

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TelemetryStreamService } from '../../../services/TelemetryStream.service';
import { TelemetryStream } from '../../../models/TelemetryStream';

@Component({
    selector: 'app-index-telemetryStream',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexTelemetryStreamComponent implements OnInit {

    telemetryStreams: TelemetryStream[] = [];

    constructor(
        private router: Router,
        private service: TelemetryStreamService
) {}

    ngOnInit(): void {
        this.getTelemetryStreams();
}

    getTelemetryStreams(): void {
        this.service.getTelemetryStreams().subscribe((res) => {
        this.telemetryStreams = res;
    });
}

    deleteTelemetryStream(id: any): void {
        this.service.deleteTelemetryStream(id)
            .subscribe(() => {
                this.getTelemetryStreams();
            });
    }
}