

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareUpdateExecutionService } from '../../../services/SoftwareUpdateExecution.service';
import { SoftwareUpdateExecution } from '../../../models/SoftwareUpdateExecution';

@Component({
    selector: 'app-index-softwareUpdateExecution',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexSoftwareUpdateExecutionComponent implements OnInit {

    softwareUpdateExecutions: SoftwareUpdateExecution[] = [];

    constructor(
        private router: Router,
        private service: SoftwareUpdateExecutionService
) {}

    ngOnInit(): void {
        this.getSoftwareUpdateExecutions();
}

    getSoftwareUpdateExecutions(): void {
        this.service.getSoftwareUpdateExecutions().subscribe((res) => {
        this.softwareUpdateExecutions = res;
    });
}

    deleteSoftwareUpdateExecution(id: any): void {
        this.service.deleteSoftwareUpdateExecution(id)
            .subscribe(() => {
                this.getSoftwareUpdateExecutions();
            });
    }
}