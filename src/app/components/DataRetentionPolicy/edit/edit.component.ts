
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataRetentionPolicyService } from '../../../services/DataRetentionPolicy.service';
import { SubBaseComponent } from '../../DataRetentionPolicy/sub.base.component';


@Component({
    selector: 'app-edit-dataRetentionPolicy',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditDataRetentionPolicyComponent extends SubBaseComponent implements OnInit {

    title = 'Edit DataRetentionPolicy';

    dataRetentionPolicyForm: FormGroup;
    dataRetentionPolicy: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: DataRetentionPolicyService,
        private fb: FormBuilder
) {
        super(http);
        this.dataRetentionPolicyForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      retentionDays: ['', Validators.required],
      Tenant: ['', ],
      Streams: ['', ]
        });
    }

    
    updateDataRetentionPolicy(name, retentionDays, Tenant, Streams): void {
        this.route.params.subscribe((params) => {

                        this.service.updateDataRetentionPolicy(name, retentionDays, Tenant, Streams, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexDataRetentionPolicy']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getDataRetentionPolicy(params['id']).subscribe(res => {
                this.dataRetentionPolicy = res;
            });
        });
    }
}