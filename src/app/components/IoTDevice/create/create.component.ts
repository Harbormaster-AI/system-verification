
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IoTDeviceService } from '../../../services/IoTDevice.service';
import { IoTDevice } from '../../../models/IoTDevice';
import { SubBaseComponent } from '../../IoTDevice/sub.base.component';

@Component({
    selector: 'app-create-ioTDevice',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateIoTDeviceComponent extends SubBaseComponent implements OnInit {

    title = 'Add IoTDevice';

    ioTDeviceForm: FormGroup;
    ioTDevice: IoTDevice;

    constructor( http: HttpClient,
        private ioTDeviceService: IoTDeviceService,
        private fb: FormBuilder,
        private router: Router
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

    
    addIoTDevice(deviceId, serialNumber, lastSeen, firmwareVersion, DeviceModel, Tenant, Site, Room, Gateway, Sensors, Actuators, Certificates, DigitalTwin, TelemetryStreams, CommandInvocations, Alerts, ProvisioningRecord, DeviceGroups, NetworkProfiles, Status, PowerSource): void {
        this.ioTDeviceService
        .addIoTDevice(deviceId, serialNumber, lastSeen, firmwareVersion, DeviceModel, Tenant, Site, Room, Gateway, Sensors, Actuators, Certificates, DigitalTwin, TelemetryStreams, CommandInvocations, Alerts, ProvisioningRecord, DeviceGroups, NetworkProfiles, Status, PowerSource)
            .subscribe(() => {
                this.router.navigate(['/indexIoTDevice']);
            });
    }

    ngOnInit(): void {
    }
}