
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessPolicyService } from '../../../services/AccessPolicy.service';
import { AccessPolicy } from '../../../models/AccessPolicy';
import { SubBaseComponent } from '../../AccessPolicy/sub.base.component';

@Component({
    selector: 'app-create-accessPolicy',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateAccessPolicyComponent extends SubBaseComponent implements OnInit {

    title = 'Add AccessPolicy';

    accessPolicyForm: FormGroup;
    accessPolicy: AccessPolicy;

    constructor( http: HttpClient,
        private accessPolicyService: AccessPolicyService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.accessPolicyForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      scope: ['', Validators.required],
      expiresAt: ['', Validators.required],
      Tenant: ['', ],
      ApiKeys: ['', ],
      Users: ['', ]
        });
    }

    
    addAccessPolicy(name, scope, expiresAt, Tenant, ApiKeys, Users): void {
        this.accessPolicyService
        .addAccessPolicy(name, scope, expiresAt, Tenant, ApiKeys, Users)
            .subscribe(() => {
                this.router.navigate(['/indexAccessPolicy']);
            });
    }

    ngOnInit(): void {
    }
}