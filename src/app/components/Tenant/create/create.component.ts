
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantService } from '../../../services/Tenant.service';
import { Tenant } from '../../../models/Tenant';
import { SubBaseComponent } from '../../Tenant/sub.base.component';

@Component({
    selector: 'app-create-tenant',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateTenantComponent extends SubBaseComponent implements OnInit {

    title = 'Add Tenant';

    tenantForm: FormGroup;
    tenant: Tenant;

    constructor( http: HttpClient,
        private tenantService: TenantService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.tenantForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      Sites: ['', ],
      Users: ['', ],
      Devices: ['', ],
      DataRetentionPolicies: ['', ],
      ConnectivityPlans: ['', ],
      SimCards: ['', ],
      MessagingEndpoints: ['', ],
      AccessPolicies: ['', ],
      DeviceGroups: ['', ],
      AlertRules: ['', ],
      MaintenanceTickets: ['', ],
      UsageRecords: ['', ],
      TenantType: ['', ]
        });
    }

    
    addTenant(name, Sites, Users, Devices, DataRetentionPolicies, ConnectivityPlans, SimCards, MessagingEndpoints, AccessPolicies, DeviceGroups, AlertRules, MaintenanceTickets, UsageRecords, TenantType): void {
        this.tenantService
        .addTenant(name, Sites, Users, Devices, DataRetentionPolicies, ConnectivityPlans, SimCards, MessagingEndpoints, AccessPolicies, DeviceGroups, AlertRules, MaintenanceTickets, UsageRecords, TenantType)
            .subscribe(() => {
                this.router.navigate(['/indexTenant']);
            });
    }

    ngOnInit(): void {
    }
}