

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenantService } from '../../../services/Tenant.service';
import { Tenant } from '../../../models/Tenant';

@Component({
    selector: 'app-index-tenant',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexTenantComponent implements OnInit {

    tenants: Tenant[] = [];

    constructor(
        private router: Router,
        private service: TenantService
) {}

    ngOnInit(): void {
        this.getTenants();
}

    getTenants(): void {
        this.service.getTenants().subscribe((res) => {
        this.tenants = res;
    });
}

    deleteTenant(id: any): void {
        this.service.deleteTenant(id)
            .subscribe(() => {
                this.getTenants();
            });
    }
}