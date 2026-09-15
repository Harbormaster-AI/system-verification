
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SoftwareUpdateCampaignService } from '../../../services/SoftwareUpdateCampaign.service';
import { SubBaseComponent } from '../../SoftwareUpdateCampaign/sub.base.component';


@Component({
    selector: 'app-edit-softwareUpdateCampaign',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditSoftwareUpdateCampaignComponent extends SubBaseComponent implements OnInit {

    title = 'Edit SoftwareUpdateCampaign';

    softwareUpdateCampaignForm: FormGroup;
    softwareUpdateCampaign: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: SoftwareUpdateCampaignService,
        private fb: FormBuilder
) {
        super(http);
        this.softwareUpdateCampaignForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  campaignCode: ['', Validators.required],
      scheduledStart: ['', Validators.required],
      scheduledEnd: ['', Validators.required],
      FirmwareRelease: ['', ],
      DeviceGroup: ['', ],
      Executions: ['', ],
      Status: ['', ]
        });
    }

    
    updateSoftwareUpdateCampaign(campaignCode, scheduledStart, scheduledEnd, FirmwareRelease, DeviceGroup, Executions, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateSoftwareUpdateCampaign(campaignCode, scheduledStart, scheduledEnd, FirmwareRelease, DeviceGroup, Executions, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexSoftwareUpdateCampaign']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getSoftwareUpdateCampaign(params['id']).subscribe(res => {
                this.softwareUpdateCampaign = res;
            });
        });
    }
}