
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProvisioningRecordService } from '../../../services/ProvisioningRecord.service';
import { SubBaseComponent } from '../../ProvisioningRecord/sub.base.component';


@Component({
    selector: 'app-edit-provisioningRecord',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditProvisioningRecordComponent extends SubBaseComponent implements OnInit {

    title = 'Edit ProvisioningRecord';

    provisioningRecordForm: FormGroup;
    provisioningRecord: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: ProvisioningRecordService,
        private fb: FormBuilder
) {
        super(http);
        this.provisioningRecordForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  enrolledAt: ['', Validators.required],
      provisioningService: ['', Validators.required],
      Device: ['', ],
      Certificate: ['', ],
      Tenant: ['', ],
      Method: ['', ],
      Status: ['', ]
        });
    }

    
    updateProvisioningRecord(enrolledAt, provisioningService, Device, Certificate, Tenant, Method, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateProvisioningRecord(enrolledAt, provisioningService, Device, Certificate, Tenant, Method, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexProvisioningRecord']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getProvisioningRecord(params['id']).subscribe(res => {
                this.provisioningRecord = res;
            });
        });
    }
}