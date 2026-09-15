

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareUpdateCampaignService } from '../../../services/SoftwareUpdateCampaign.service';
import { SoftwareUpdateCampaign } from '../../../models/SoftwareUpdateCampaign';

@Component({
    selector: 'app-index-softwareUpdateCampaign',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexSoftwareUpdateCampaignComponent implements OnInit {

    softwareUpdateCampaigns: SoftwareUpdateCampaign[] = [];

    constructor(
        private router: Router,
        private service: SoftwareUpdateCampaignService
) {}

    ngOnInit(): void {
        this.getSoftwareUpdateCampaigns();
}

    getSoftwareUpdateCampaigns(): void {
        this.service.getSoftwareUpdateCampaigns().subscribe((res) => {
        this.softwareUpdateCampaigns = res;
    });
}

    deleteSoftwareUpdateCampaign(id: any): void {
        this.service.deleteSoftwareUpdateCampaign(id)
            .subscribe(() => {
                this.getSoftwareUpdateCampaigns();
            });
    }
}