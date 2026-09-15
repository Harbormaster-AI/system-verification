

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceGroupService } from '../../../services/DeviceGroup.service';
import { DeviceGroup } from '../../../models/DeviceGroup';

@Component({
    selector: 'app-index-deviceGroup',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexDeviceGroupComponent implements OnInit {

    deviceGroups: DeviceGroup[] = [];

    constructor(
        private router: Router,
        private service: DeviceGroupService
) {}

    ngOnInit(): void {
        this.getDeviceGroups();
}

    getDeviceGroups(): void {
        this.service.getDeviceGroups().subscribe((res) => {
        this.deviceGroups = res;
    });
}

    deleteDeviceGroup(id: any): void {
        this.service.deleteDeviceGroup(id)
            .subscribe(() => {
                this.getDeviceGroups();
            });
    }
}