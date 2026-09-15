

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IoTDeviceService } from '../../../services/IoTDevice.service';
import { IoTDevice } from '../../../models/IoTDevice';

@Component({
    selector: 'app-index-ioTDevice',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexIoTDeviceComponent implements OnInit {

    ioTDevices: IoTDevice[] = [];

    constructor(
        private router: Router,
        private service: IoTDeviceService
) {}

    ngOnInit(): void {
        this.getIoTDevices();
}

    getIoTDevices(): void {
        this.service.getIoTDevices().subscribe((res) => {
        this.ioTDevices = res;
    });
}

    deleteIoTDevice(id: any): void {
        this.service.deleteIoTDevice(id)
            .subscribe(() => {
                this.getIoTDevices();
            });
    }
}