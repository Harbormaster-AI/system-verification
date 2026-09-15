
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DeviceModelService } from '../../../services/DeviceModel.service';
import { SubBaseComponent } from '../../DeviceModel/sub.base.component';


@Component({
    selector: 'app-edit-deviceModel',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditDeviceModelComponent extends SubBaseComponent implements OnInit {

    title = 'Edit DeviceModel';

    deviceModelForm: FormGroup;
    deviceModel: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: DeviceModelService,
        private fb: FormBuilder
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

    
    updateDeviceModel(name, modelNumber, hardwareRevision, Vendor, HardwareModules, TwinTemplate, FirmwareReleases, CommandDefinitions, SupportedConnectivity, DefaultTelemetryEncoding): void {
        this.route.params.subscribe((params) => {

                        this.service.updateDeviceModel(name, modelNumber, hardwareRevision, Vendor, HardwareModules, TwinTemplate, FirmwareReleases, CommandDefinitions, SupportedConnectivity, DefaultTelemetryEncoding, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexDeviceModel']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getDeviceModel(params['id']).subscribe(res => {
                this.deviceModel = res;
            });
        });
    }
}