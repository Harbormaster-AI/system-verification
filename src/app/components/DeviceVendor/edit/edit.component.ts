
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DeviceVendorService } from '../../../services/DeviceVendor.service';
import { SubBaseComponent } from '../../DeviceVendor/sub.base.component';


@Component({
    selector: 'app-edit-deviceVendor',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditDeviceVendorComponent extends SubBaseComponent implements OnInit {

    title = 'Edit DeviceVendor';

    deviceVendorForm: FormGroup;
    deviceVendor: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: DeviceVendorService,
        private fb: FormBuilder
) {
        super(http);
        this.deviceVendorForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      legalName: ['', Validators.required],
      headquartersCountry: ['', Validators.required],
      website: ['', Validators.required],
      DeviceModels: ['', ],
      FirmwareReleases: ['', ],
      HardwareModules: ['', ]
        });
    }

    
    updateDeviceVendor(name, legalName, headquartersCountry, website, DeviceModels, FirmwareReleases, HardwareModules): void {
        this.route.params.subscribe((params) => {

                        this.service.updateDeviceVendor(name, legalName, headquartersCountry, website, DeviceModels, FirmwareReleases, HardwareModules, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexDeviceVendor']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getDeviceVendor(params['id']).subscribe(res => {
                this.deviceVendor = res;
            });
        });
    }
}