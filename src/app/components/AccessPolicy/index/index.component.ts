

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessPolicyService } from '../../../services/AccessPolicy.service';
import { AccessPolicy } from '../../../models/AccessPolicy';

@Component({
    selector: 'app-index-accessPolicy',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexAccessPolicyComponent implements OnInit {

    accessPolicys: AccessPolicy[] = [];

    constructor(
        private router: Router,
        private service: AccessPolicyService
) {}

    ngOnInit(): void {
        this.getAccessPolicys();
}

    getAccessPolicys(): void {
        this.service.getAccessPolicys().subscribe((res) => {
        this.accessPolicys = res;
    });
}

    deleteAccessPolicy(id: any): void {
        this.service.deleteAccessPolicy(id)
            .subscribe(() => {
                this.getAccessPolicys();
            });
    }
}