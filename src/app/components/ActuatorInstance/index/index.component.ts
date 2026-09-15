

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActuatorInstanceService } from '../../../services/ActuatorInstance.service';
import { ActuatorInstance } from '../../../models/ActuatorInstance';

@Component({
    selector: 'app-index-actuatorInstance',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexActuatorInstanceComponent implements OnInit {

    actuatorInstances: ActuatorInstance[] = [];

    constructor(
        private router: Router,
        private service: ActuatorInstanceService
) {}

    ngOnInit(): void {
        this.getActuatorInstances();
}

    getActuatorInstances(): void {
        this.service.getActuatorInstances().subscribe((res) => {
        this.actuatorInstances = res;
    });
}

    deleteActuatorInstance(id: any): void {
        this.service.deleteActuatorInstance(id)
            .subscribe(() => {
                this.getActuatorInstances();
            });
    }
}