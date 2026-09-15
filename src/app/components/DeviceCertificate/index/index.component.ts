

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceCertificateService } from '../../../services/DeviceCertificate.service';
import { DeviceCertificate } from '../../../models/DeviceCertificate';

@Component({
    selector: 'app-index-deviceCertificate',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexDeviceCertificateComponent implements OnInit {

    deviceCertificates: DeviceCertificate[] = [];

    constructor(
        private router: Router,
        private service: DeviceCertificateService
) {}

    ngOnInit(): void {
        this.getDeviceCertificates();
}

    getDeviceCertificates(): void {
        this.service.getDeviceCertificates().subscribe((res) => {
        this.deviceCertificates = res;
    });
}

    deleteDeviceCertificate(id: any): void {
        this.service.deleteDeviceCertificate(id)
            .subscribe(() => {
                this.getDeviceCertificates();
            });
    }
}