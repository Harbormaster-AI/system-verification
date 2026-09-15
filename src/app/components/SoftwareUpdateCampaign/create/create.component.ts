
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoftwareUpdateCampaignService } from '../../../services/SoftwareUpdateCampaign.service';
import { SoftwareUpdateCampaign } from '../../../models/SoftwareUpdateCampaign';
import { SubBaseComponent } from '../../SoftwareUpdateCampaign/sub.base.component';

@Component({
    selector: 'app-create-softwareUpdateCampaign',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateSoftwareUpdateCampaignComponent extends SubBaseComponent implements OnInit {

    title = 'Add SoftwareUpdateCampaign';

    softwareUpdateCampaignForm: FormGroup;
    softwareUpdateCampaign: SoftwareUpdateCampaign;

    constructor( http: HttpClient,
        private softwareUpdateCampaignService: SoftwareUpdateCampaignService,
        private fb: FormBuilder,
        private router: Router
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

    
    addSoftwareUpdateCampaign(campaignCode, scheduledStart, scheduledEnd, FirmwareRelease, DeviceGroup, Executions, Status): void {
        this.softwareUpdateCampaignService
        .addSoftwareUpdateCampaign(campaignCode, scheduledStart, scheduledEnd, FirmwareRelease, DeviceGroup, Executions, Status)
            .subscribe(() => {
                this.router.navigate(['/indexSoftwareUpdateCampaign']);
            });
    }

    ngOnInit(): void {
    }
}