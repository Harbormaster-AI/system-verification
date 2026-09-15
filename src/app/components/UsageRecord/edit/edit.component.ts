
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsageRecordService } from '../../../services/UsageRecord.service';
import { SubBaseComponent } from '../../UsageRecord/sub.base.component';


@Component({
    selector: 'app-edit-usageRecord',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditUsageRecordComponent extends SubBaseComponent implements OnInit {

    title = 'Edit UsageRecord';

    usageRecordForm: FormGroup;
    usageRecord: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: UsageRecordService,
        private fb: FormBuilder
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

    
    updateUsageRecord(periodStart, periodEnd, messagesSent, dataVolumeMB, Tenant, Device, ConnectivityPlan): void {
        this.route.params.subscribe((params) => {

                        this.service.updateUsageRecord(periodStart, periodEnd, messagesSent, dataVolumeMB, Tenant, Device, ConnectivityPlan, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexUsageRecord']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getUsageRecord(params['id']).subscribe(res => {
                this.usageRecord = res;
            });
        });
    }
}