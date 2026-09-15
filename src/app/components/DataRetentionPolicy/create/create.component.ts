
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataRetentionPolicyService } from '../../../services/DataRetentionPolicy.service';
import { DataRetentionPolicy } from '../../../models/DataRetentionPolicy';
import { SubBaseComponent } from '../../DataRetentionPolicy/sub.base.component';

@Component({
    selector: 'app-create-dataRetentionPolicy',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDataRetentionPolicyComponent extends SubBaseComponent implements OnInit {

    title = 'Add DataRetentionPolicy';

    dataRetentionPolicyForm: FormGroup;
    dataRetentionPolicy: DataRetentionPolicy;

    constructor( http: HttpClient,
        private dataRetentionPolicyService: DataRetentionPolicyService,
        private fb: FormBuilder,
        private router: Router
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

    
    addDataRetentionPolicy(name, retentionDays, Tenant, Streams): void {
        this.dataRetentionPolicyService
        .addDataRetentionPolicy(name, retentionDays, Tenant, Streams)
            .subscribe(() => {
                this.router.navigate(['/indexDataRetentionPolicy']);
            });
    }

    ngOnInit(): void {
    }
}