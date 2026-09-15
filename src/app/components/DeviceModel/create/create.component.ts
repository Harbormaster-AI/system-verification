
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceModelService } from '../../../services/DeviceModel.service';
import { DeviceModel } from '../../../models/DeviceModel';
import { SubBaseComponent } from '../../DeviceModel/sub.base.component';

@Component({
    selector: 'app-create-deviceModel',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDeviceModelComponent extends SubBaseComponent implements OnInit {

    title = 'Add DeviceModel';

    deviceModelForm: FormGroup;
    deviceModel: DeviceModel;

    constructor( http: HttpClient,
        private deviceModelService: DeviceModelService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.deviceModelForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      modelNumber: ['', Validators.required],
      hardwareRevision: ['', Validators.required],
      Vendor: ['', ],
      HardwareModules: ['', ],
      TwinTemplate: ['', ],
      FirmwareReleases: ['', ],
      CommandDefinitions: ['', ],
      SupportedConnectivity: ['', ],
      DefaultTelemetryEncoding: ['', ]
        });
    }

    
    addDeviceModel(name, modelNumber, hardwareRevision, Vendor, HardwareModules, TwinTemplate, FirmwareReleases, CommandDefinitions, SupportedConnectivity, DefaultTelemetryEncoding): void {
        this.deviceModelService
        .addDeviceModel(name, modelNumber, hardwareRevision, Vendor, HardwareModules, TwinTemplate, FirmwareReleases, CommandDefinitions, SupportedConnectivity, DefaultTelemetryEncoding)
            .subscribe(() => {
                this.router.navigate(['/indexDeviceModel']);
            });
    }

    ngOnInit(): void {
    }
}