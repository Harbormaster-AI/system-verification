

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceModelService } from '../../../services/DeviceModel.service';
import { DeviceModel } from '../../../models/DeviceModel';

@Component({
    selector: 'app-index-deviceModel',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexDeviceModelComponent implements OnInit {

    deviceModels: DeviceModel[] = [];

    constructor(
        private router: Router,
        private service: DeviceModelService
) {}

    ngOnInit(): void {
        this.getDeviceModels();
}

    getDeviceModels(): void {
        this.service.getDeviceModels().subscribe((res) => {
        this.deviceModels = res;
    });
}

    deleteDeviceModel(id: any): void {
        this.service.deleteDeviceModel(id)
            .subscribe(() => {
                this.getDeviceModels();
            });
    }
}