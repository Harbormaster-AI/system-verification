

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TenantUserService } from '../../../services/TenantUser.service';
import { TenantUser } from '../../../models/TenantUser';

@Component({
    selector: 'app-index-tenantUser',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexTenantUserComponent implements OnInit {

    tenantUsers: TenantUser[] = [];

    constructor(
        private router: Router,
        private service: TenantUserService
) {}

    ngOnInit(): void {
        this.getTenantUsers();
}

    getTenantUsers(): void {
        this.service.getTenantUsers().subscribe((res) => {
        this.tenantUsers = res;
    });
}

    deleteTenantUser(id: any): void {
        this.service.deleteTenantUser(id)
            .subscribe(() => {
                this.getTenantUsers();
            });
    }
}