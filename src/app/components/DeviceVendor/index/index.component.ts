

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceVendorService } from '../../../services/DeviceVendor.service';
import { DeviceVendor } from '../../../models/DeviceVendor';

@Component({
    selector: 'app-index-deviceVendor',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexDeviceVendorComponent implements OnInit {

    deviceVendors: DeviceVendor[] = [];

    constructor(
        private router: Router,
        private service: DeviceVendorService
) {}

    ngOnInit(): void {
        this.getDeviceVendors();
}

    getDeviceVendors(): void {
        this.service.getDeviceVendors().subscribe((res) => {
        this.deviceVendors = res;
    });
}

    deleteDeviceVendor(id: any): void {
        this.service.deleteDeviceVendor(id)
            .subscribe(() => {
                this.getDeviceVendors();
            });
    }
}