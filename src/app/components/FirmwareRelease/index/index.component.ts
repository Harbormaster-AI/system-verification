

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirmwareReleaseService } from '../../../services/FirmwareRelease.service';
import { FirmwareRelease } from '../../../models/FirmwareRelease';

@Component({
    selector: 'app-index-firmwareRelease',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexFirmwareReleaseComponent implements OnInit {

    firmwareReleases: FirmwareRelease[] = [];

    constructor(
        private router: Router,
        private service: FirmwareReleaseService
) {}

    ngOnInit(): void {
        this.getFirmwareReleases();
}

    getFirmwareReleases(): void {
        this.service.getFirmwareReleases().subscribe((res) => {
        this.firmwareReleases = res;
    });
}

    deleteFirmwareRelease(id: any): void {
        this.service.deleteFirmwareRelease(id)
            .subscribe(() => {
                this.getFirmwareReleases();
            });
    }
}