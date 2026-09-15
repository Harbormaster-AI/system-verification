
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceCertificateService } from '../../../services/DeviceCertificate.service';
import { DeviceCertificate } from '../../../models/DeviceCertificate';
import { SubBaseComponent } from '../../DeviceCertificate/sub.base.component';

@Component({
    selector: 'app-create-deviceCertificate',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDeviceCertificateComponent extends SubBaseComponent implements OnInit {

    title = 'Add DeviceCertificate';

    deviceCertificateForm: FormGroup;
    deviceCertificate: DeviceCertificate;

    constructor( http: HttpClient,
        private deviceCertificateService: DeviceCertificateService,
        private fb: FormBuilder,
        private router: Router
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

    
    addDeviceCertificate(serialNumber, notBefore, notAfter, fingerprint, Device, Gateway, CertificateType): void {
        this.deviceCertificateService
        .addDeviceCertificate(serialNumber, notBefore, notAfter, fingerprint, Device, Gateway, CertificateType)
            .subscribe(() => {
                this.router.navigate(['/indexDeviceCertificate']);
            });
    }

    ngOnInit(): void {
    }
}