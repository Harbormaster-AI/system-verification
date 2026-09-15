

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataRetentionPolicyService } from '../../../services/DataRetentionPolicy.service';
import { DataRetentionPolicy } from '../../../models/DataRetentionPolicy';

@Component({
    selector: 'app-index-dataRetentionPolicy',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexDataRetentionPolicyComponent implements OnInit {

    dataRetentionPolicys: DataRetentionPolicy[] = [];

    constructor(
        private router: Router,
        private service: DataRetentionPolicyService
) {}

    ngOnInit(): void {
        this.getDataRetentionPolicys();
}

    getDataRetentionPolicys(): void {
        this.service.getDataRetentionPolicys().subscribe((res) => {
        this.dataRetentionPolicys = res;
    });
}

    deleteDataRetentionPolicy(id: any): void {
        this.service.deleteDataRetentionPolicy(id)
            .subscribe(() => {
                this.getDataRetentionPolicys();
            });
    }
}