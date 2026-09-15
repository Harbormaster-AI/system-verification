
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DeviceCertificateService } from '../../../services/DeviceCertificate.service';
import { SubBaseComponent } from '../../DeviceCertificate/sub.base.component';


@Component({
    selector: 'app-edit-deviceCertificate',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditDeviceCertificateComponent extends SubBaseComponent implements OnInit {

    title = 'Edit DeviceCertificate';

    deviceCertificateForm: FormGroup;
    deviceCertificate: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: DeviceCertificateService,
        private fb: FormBuilder
) {
        super(http);
        this.deviceCertificateForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  serialNumber: ['', Validators.required],
      notBefore: ['', Validators.required],
      notAfter: ['', Validators.required],
      fingerprint: ['', Validators.required],
      Device: ['', ],
      Gateway: ['', ],
      CertificateType: ['', ]
        });
    }

    
    updateDeviceCertificate(serialNumber, notBefore, notAfter, fingerprint, Device, Gateway, CertificateType): void {
        this.route.params.subscribe((params) => {

                        this.service.updateDeviceCertificate(serialNumber, notBefore, notAfter, fingerprint, Device, Gateway, CertificateType, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexDeviceCertificate']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getDeviceCertificate(params['id']).subscribe(res => {
                this.deviceCertificate = res;
            });
        });
    }
}