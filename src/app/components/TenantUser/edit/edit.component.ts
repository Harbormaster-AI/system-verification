
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TenantUserService } from '../../../services/TenantUser.service';
import { SubBaseComponent } from '../../TenantUser/sub.base.component';


@Component({
    selector: 'app-edit-tenantUser',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditTenantUserComponent extends SubBaseComponent implements OnInit {

    title = 'Edit TenantUser';

    tenantUserForm: FormGroup;
    tenantUser: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: TenantUserService,
        private fb: FormBuilder
) {
        super(http);
        this.tenantUserForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      Tenant: ['', ],
      CommandInvocations: ['', ],
      Role: ['', ]
        });
    }

    
    updateTenantUser(firstName, lastName, email, Tenant, CommandInvocations, Role): void {
        this.route.params.subscribe((params) => {

                        this.service.updateTenantUser(firstName, lastName, email, Tenant, CommandInvocations, Role, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexTenantUser']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getTenantUser(params['id']).subscribe(res => {
                this.tenantUser = res;
            });
        });
    }
}