

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkProfileService } from '../../../services/NetworkProfile.service';
import { NetworkProfile } from '../../../models/NetworkProfile';

@Component({
    selector: 'app-index-networkProfile',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexNetworkProfileComponent implements OnInit {

    networkProfiles: NetworkProfile[] = [];

    constructor(
        private router: Router,
        private service: NetworkProfileService
) {}

    ngOnInit(): void {
        this.getNetworkProfiles();
}

    getNetworkProfiles(): void {
        this.service.getNetworkProfiles().subscribe((res) => {
        this.networkProfiles = res;
    });
}

    deleteNetworkProfile(id: any): void {
        this.service.deleteNetworkProfile(id)
            .subscribe(() => {
                this.getNetworkProfiles();
            });
    }
}