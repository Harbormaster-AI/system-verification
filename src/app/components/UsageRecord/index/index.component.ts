

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsageRecordService } from '../../../services/UsageRecord.service';
import { UsageRecord } from '../../../models/UsageRecord';

@Component({
    selector: 'app-index-usageRecord',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexUsageRecordComponent implements OnInit {

    usageRecords: UsageRecord[] = [];

    constructor(
        private router: Router,
        private service: UsageRecordService
) {}

    ngOnInit(): void {
        this.getUsageRecords();
}

    getUsageRecords(): void {
        this.service.getUsageRecords().subscribe((res) => {
        this.usageRecords = res;
    });
}

    deleteUsageRecord(id: any): void {
        this.service.deleteUsageRecord(id)
            .subscribe(() => {
                this.getUsageRecords();
            });
    }
}