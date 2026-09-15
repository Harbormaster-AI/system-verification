
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DeviceGroupService } from '../../../services/DeviceGroup.service';
import { SubBaseComponent } from '../../DeviceGroup/sub.base.component';


@Component({
    selector: 'app-edit-deviceGroup',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditDeviceGroupComponent extends SubBaseComponent implements OnInit {

    title = 'Edit DeviceGroup';

    deviceGroupForm: FormGroup;
    deviceGroup: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: DeviceGroupService,
        private fb: FormBuilder
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

    
    updateDeviceGroup(name, criteria, Tenant, Devices): void {
        this.route.params.subscribe((params) => {

                        this.service.updateDeviceGroup(name, criteria, Tenant, Devices, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexDeviceGroup']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getDeviceGroup(params['id']).subscribe(res => {
                this.deviceGroup = res;
            });
        });
    }
}