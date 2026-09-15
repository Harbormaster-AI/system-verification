
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AccessPolicyService } from '../../../services/AccessPolicy.service';
import { SubBaseComponent } from '../../AccessPolicy/sub.base.component';


@Component({
    selector: 'app-edit-accessPolicy',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditAccessPolicyComponent extends SubBaseComponent implements OnInit {

    title = 'Edit AccessPolicy';

    accessPolicyForm: FormGroup;
    accessPolicy: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: AccessPolicyService,
        private fb: FormBuilder
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

    
    updateAccessPolicy(name, scope, expiresAt, Tenant, ApiKeys, Users): void {
        this.route.params.subscribe((params) => {

                        this.service.updateAccessPolicy(name, scope, expiresAt, Tenant, ApiKeys, Users, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexAccessPolicy']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getAccessPolicy(params['id']).subscribe(res => {
                this.accessPolicy = res;
            });
        });
    }
}