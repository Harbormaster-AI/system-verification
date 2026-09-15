
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantUserService } from '../../../services/TenantUser.service';
import { TenantUser } from '../../../models/TenantUser';
import { SubBaseComponent } from '../../TenantUser/sub.base.component';

@Component({
    selector: 'app-create-tenantUser',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateTenantUserComponent extends SubBaseComponent implements OnInit {

    title = 'Add TenantUser';

    tenantUserForm: FormGroup;
    tenantUser: TenantUser;

    constructor( http: HttpClient,
        private tenantUserService: TenantUserService,
        private fb: FormBuilder,
        private router: Router
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

    
    addTenantUser(firstName, lastName, email, Tenant, CommandInvocations, Role): void {
        this.tenantUserService
        .addTenantUser(firstName, lastName, email, Tenant, CommandInvocations, Role)
            .subscribe(() => {
                this.router.navigate(['/indexTenantUser']);
            });
    }

    ngOnInit(): void {
    }
}