
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvisioningRecordService } from '../../../services/ProvisioningRecord.service';
import { ProvisioningRecord } from '../../../models/ProvisioningRecord';
import { SubBaseComponent } from '../../ProvisioningRecord/sub.base.component';

@Component({
    selector: 'app-create-provisioningRecord',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateProvisioningRecordComponent extends SubBaseComponent implements OnInit {

    title = 'Add ProvisioningRecord';

    provisioningRecordForm: FormGroup;
    provisioningRecord: ProvisioningRecord;

    constructor( http: HttpClient,
        private provisioningRecordService: ProvisioningRecordService,
        private fb: FormBuilder,
        private router: Router
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

    
    addProvisioningRecord(enrolledAt, provisioningService, Device, Certificate, Tenant, Method, Status): void {
        this.provisioningRecordService
        .addProvisioningRecord(enrolledAt, provisioningService, Device, Certificate, Tenant, Method, Status)
            .subscribe(() => {
                this.router.navigate(['/indexProvisioningRecord']);
            });
    }

    ngOnInit(): void {
    }
}