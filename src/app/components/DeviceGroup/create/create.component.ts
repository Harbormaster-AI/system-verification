
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceGroupService } from '../../../services/DeviceGroup.service';
import { DeviceGroup } from '../../../models/DeviceGroup';
import { SubBaseComponent } from '../../DeviceGroup/sub.base.component';

@Component({
    selector: 'app-create-deviceGroup',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDeviceGroupComponent extends SubBaseComponent implements OnInit {

    title = 'Add DeviceGroup';

    deviceGroupForm: FormGroup;
    deviceGroup: DeviceGroup;

    constructor( http: HttpClient,
        private deviceGroupService: DeviceGroupService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.deviceGroupForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      criteria: ['', Validators.required],
      Tenant: ['', ],
      Devices: ['', ]
        });
    }

    
    addDeviceGroup(name, criteria, Tenant, Devices): void {
        this.deviceGroupService
        .addDeviceGroup(name, criteria, Tenant, Devices)
            .subscribe(() => {
                this.router.navigate(['/indexDeviceGroup']);
            });
    }

    ngOnInit(): void {
    }
}