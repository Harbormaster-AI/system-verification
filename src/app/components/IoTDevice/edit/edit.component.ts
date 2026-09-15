
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IoTDeviceService } from '../../../services/IoTDevice.service';
import { SubBaseComponent } from '../../IoTDevice/sub.base.component';


@Component({
    selector: 'app-edit-ioTDevice',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditIoTDeviceComponent extends SubBaseComponent implements OnInit {

    title = 'Edit IoTDevice';

    ioTDeviceForm: FormGroup;
    ioTDevice: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: IoTDeviceService,
        private fb: FormBuilder
) {
        super(http);
        this.ioTDeviceForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  deviceId: ['', Validators.required],
      serialNumber: ['', Validators.required],
      lastSeen: ['', Validators.required],
      firmwareVersion: ['', Validators.required],
      DeviceModel: ['', ],
      Tenant: ['', ],
      Site: ['', ],
      Room: ['', ],
      Gateway: ['', ],
      Sensors: ['', ],
      Actuators: ['', ],
      Certificates: ['', ],
      DigitalTwin: ['', ],
      TelemetryStreams: ['', ],
      CommandInvocations: ['', ],
      Alerts: ['', ],
      ProvisioningRecord: ['', ],
      DeviceGroups: ['', ],
      NetworkProfiles: ['', ],
      Status: ['', ],
      PowerSource: ['', ]
        });
    }

    
    updateIoTDevice(deviceId, serialNumber, lastSeen, firmwareVersion, DeviceModel, Tenant, Site, Room, Gateway, Sensors, Actuators, Certificates, DigitalTwin, TelemetryStreams, CommandInvocations, Alerts, ProvisioningRecord, DeviceGroups, NetworkProfiles, Status, PowerSource): void {
        this.route.params.subscribe((params) => {

                        this.service.updateIoTDevice(deviceId, serialNumber, lastSeen, firmwareVersion, DeviceModel, Tenant, Site, Room, Gateway, Sensors, Actuators, Certificates, DigitalTwin, TelemetryStreams, CommandInvocations, Alerts, ProvisioningRecord, DeviceGroups, NetworkProfiles, Status, PowerSource, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexIoTDevice']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getIoTDevice(params['id']).subscribe(res => {
                this.ioTDevice = res;
            });
        });
    }
}