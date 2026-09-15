
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FirmwareReleaseService } from '../../../services/FirmwareRelease.service';
import { SubBaseComponent } from '../../FirmwareRelease/sub.base.component';


@Component({
    selector: 'app-edit-firmwareRelease',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditFirmwareReleaseComponent extends SubBaseComponent implements OnInit {

    title = 'Edit FirmwareRelease';

    firmwareReleaseForm: FormGroup;
    firmwareRelease: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: FirmwareReleaseService,
        private fb: FormBuilder
) {
        super(http);
        this.firmwareReleaseForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  version: ['', Validators.required],
      releaseDate: ['', Validators.required],
      releaseNotes: ['', Validators.required],
      checksum: ['', Validators.required],
      DeviceModel: ['', ]
        });
    }

    
    updateFirmwareRelease(version, releaseDate, releaseNotes, checksum, DeviceModel): void {
        this.route.params.subscribe((params) => {

                        this.service.updateFirmwareRelease(version, releaseDate, releaseNotes, checksum, DeviceModel, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexFirmwareRelease']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getFirmwareRelease(params['id']).subscribe(res => {
                this.firmwareRelease = res;
            });
        });
    }
}