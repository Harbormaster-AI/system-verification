
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceVendorService } from '../../../services/DeviceVendor.service';
import { DeviceVendor } from '../../../models/DeviceVendor';
import { SubBaseComponent } from '../../DeviceVendor/sub.base.component';

@Component({
    selector: 'app-create-deviceVendor',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDeviceVendorComponent extends SubBaseComponent implements OnInit {

    title = 'Add DeviceVendor';

    deviceVendorForm: FormGroup;
    deviceVendor: DeviceVendor;

    constructor( http: HttpClient,
        private deviceVendorService: DeviceVendorService,
        private fb: FormBuilder,
        private router: Router
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

    
    addDeviceVendor(name, legalName, headquartersCountry, website, DeviceModels, FirmwareReleases, HardwareModules): void {
        this.deviceVendorService
        .addDeviceVendor(name, legalName, headquartersCountry, website, DeviceModels, FirmwareReleases, HardwareModules)
            .subscribe(() => {
                this.router.navigate(['/indexDeviceVendor']);
            });
    }

    ngOnInit(): void {
    }
}