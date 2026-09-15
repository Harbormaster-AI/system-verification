
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GatewayService } from '../../../services/Gateway.service';
import { SubBaseComponent } from '../../Gateway/sub.base.component';


@Component({
    selector: 'app-edit-gateway',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditGatewayComponent extends SubBaseComponent implements OnInit {

    title = 'Edit Gateway';

    gatewayForm: FormGroup;
    gateway: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: GatewayService,
        private fb: FormBuilder
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

    
    updateGateway(softwareVersion, Site, Room, Devices, EdgeApplications, Certificates, DigitalTwin, NetworkProfiles, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateGateway(softwareVersion, Site, Room, Devices, EdgeApplications, Certificates, DigitalTwin, NetworkProfiles, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexGateway']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getGateway(params['id']).subscribe(res => {
                this.gateway = res;
            });
        });
    }
}