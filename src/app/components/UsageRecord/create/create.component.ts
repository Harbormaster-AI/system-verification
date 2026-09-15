
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsageRecordService } from '../../../services/UsageRecord.service';
import { UsageRecord } from '../../../models/UsageRecord';
import { SubBaseComponent } from '../../UsageRecord/sub.base.component';

@Component({
    selector: 'app-create-usageRecord',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateUsageRecordComponent extends SubBaseComponent implements OnInit {

    title = 'Add UsageRecord';

    usageRecordForm: FormGroup;
    usageRecord: UsageRecord;

    constructor( http: HttpClient,
        private usageRecordService: UsageRecordService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.usageRecordForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  periodStart: ['', Validators.required],
      periodEnd: ['', Validators.required],
      messagesSent: ['', Validators.required],
      dataVolumeMB: ['', Validators.required],
      Tenant: ['', ],
      Device: ['', ],
      ConnectivityPlan: ['', ]
        });
    }

    
    addUsageRecord(periodStart, periodEnd, messagesSent, dataVolumeMB, Tenant, Device, ConnectivityPlan): void {
        this.usageRecordService
        .addUsageRecord(periodStart, periodEnd, messagesSent, dataVolumeMB, Tenant, Device, ConnectivityPlan)
            .subscribe(() => {
                this.router.navigate(['/indexUsageRecord']);
            });
    }

    ngOnInit(): void {
    }
}