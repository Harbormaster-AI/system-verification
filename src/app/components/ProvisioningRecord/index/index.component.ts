

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvisioningRecordService } from '../../../services/ProvisioningRecord.service';
import { ProvisioningRecord } from '../../../models/ProvisioningRecord';

@Component({
    selector: 'app-index-provisioningRecord',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexProvisioningRecordComponent implements OnInit {

    provisioningRecords: ProvisioningRecord[] = [];

    constructor(
        private router: Router,
        private service: ProvisioningRecordService
) {}

    ngOnInit(): void {
        this.getProvisioningRecords();
}

    getProvisioningRecords(): void {
        this.service.getProvisioningRecords().subscribe((res) => {
        this.provisioningRecords = res;
    });
}

    deleteProvisioningRecord(id: any): void {
        this.service.deleteProvisioningRecord(id)
            .subscribe(() => {
                this.getProvisioningRecords();
            });
    }
}