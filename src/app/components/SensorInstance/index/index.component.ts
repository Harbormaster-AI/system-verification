

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SensorInstanceService } from '../../../services/SensorInstance.service';
import { SensorInstance } from '../../../models/SensorInstance';

@Component({
    selector: 'app-index-sensorInstance',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexSensorInstanceComponent implements OnInit {

    sensorInstances: SensorInstance[] = [];

    constructor(
        private router: Router,
        private service: SensorInstanceService
) {}

    ngOnInit(): void {
        this.getSensorInstances();
}

    getSensorInstances(): void {
        this.service.getSensorInstances().subscribe((res) => {
        this.sensorInstances = res;
    });
}

    deleteSensorInstance(id: any): void {
        this.service.deleteSensorInstance(id)
            .subscribe(() => {
                this.getSensorInstances();
            });
    }
}