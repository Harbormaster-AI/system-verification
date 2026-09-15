
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TenantService } from '../../../services/Tenant.service';
import { SubBaseComponent } from '../../Tenant/sub.base.component';


@Component({
    selector: 'app-edit-tenant',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditTenantComponent extends SubBaseComponent implements OnInit {

    title = 'Edit Tenant';

    tenantForm: FormGroup;
    tenant: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: TenantService,
        private fb: FormBuilder
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

    
    updateTenant(name, Sites, Users, Devices, DataRetentionPolicies, ConnectivityPlans, SimCards, MessagingEndpoints, AccessPolicies, DeviceGroups, AlertRules, MaintenanceTickets, UsageRecords, TenantType): void {
        this.route.params.subscribe((params) => {

                        this.service.updateTenant(name, Sites, Users, Devices, DataRetentionPolicies, ConnectivityPlans, SimCards, MessagingEndpoints, AccessPolicies, DeviceGroups, AlertRules, MaintenanceTickets, UsageRecords, TenantType, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexTenant']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getTenant(params['id']).subscribe(res => {
                this.tenant = res;
            });
        });
    }
}