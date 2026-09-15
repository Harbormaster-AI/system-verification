
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirmwareReleaseService } from '../../../services/FirmwareRelease.service';
import { FirmwareRelease } from '../../../models/FirmwareRelease';
import { SubBaseComponent } from '../../FirmwareRelease/sub.base.component';

@Component({
    selector: 'app-create-firmwareRelease',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateFirmwareReleaseComponent extends SubBaseComponent implements OnInit {

    title = 'Add FirmwareRelease';

    firmwareReleaseForm: FormGroup;
    firmwareRelease: FirmwareRelease;

    constructor( http: HttpClient,
        private firmwareReleaseService: FirmwareReleaseService,
        private fb: FormBuilder,
        private router: Router
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

    
    addFirmwareRelease(version, releaseDate, releaseNotes, checksum, DeviceModel): void {
        this.firmwareReleaseService
        .addFirmwareRelease(version, releaseDate, releaseNotes, checksum, DeviceModel)
            .subscribe(() => {
                this.router.navigate(['/indexFirmwareRelease']);
            });
    }

    ngOnInit(): void {
    }
}