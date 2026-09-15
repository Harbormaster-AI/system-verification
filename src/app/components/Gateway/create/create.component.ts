
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatewayService } from '../../../services/Gateway.service';
import { Gateway } from '../../../models/Gateway';
import { SubBaseComponent } from '../../Gateway/sub.base.component';

@Component({
    selector: 'app-create-gateway',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateGatewayComponent extends SubBaseComponent implements OnInit {

    title = 'Add Gateway';

    gatewayForm: FormGroup;
    gateway: Gateway;

    constructor( http: HttpClient,
        private gatewayService: GatewayService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.gatewayForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  softwareVersion: ['', Validators.required],
      Site: ['', ],
      Room: ['', ],
      Devices: ['', ],
      EdgeApplications: ['', ],
      Certificates: ['', ],
      DigitalTwin: ['', ],
      NetworkProfiles: ['', ],
      Status: ['', ]
        });
    }

    
    addGateway(softwareVersion, Site, Room, Devices, EdgeApplications, Certificates, DigitalTwin, NetworkProfiles, Status): void {
        this.gatewayService
        .addGateway(softwareVersion, Site, Room, Devices, EdgeApplications, Certificates, DigitalTwin, NetworkProfiles, Status)
            .subscribe(() => {
                this.router.navigate(['/indexGateway']);
            });
    }

    ngOnInit(): void {
    }
}