
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NetworkProfileService } from '../../../services/NetworkProfile.service';
import { SubBaseComponent } from '../../NetworkProfile/sub.base.component';


@Component({
    selector: 'app-edit-networkProfile',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditNetworkProfileComponent extends SubBaseComponent implements OnInit {

    title = 'Edit NetworkProfile';

    networkProfileForm: FormGroup;
    networkProfile: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: NetworkProfileService,
        private fb: FormBuilder
) {
        super(http);
        this.networkProfileForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  profileName: ['', Validators.required],
      ssid: ['', Validators.required],
      apn: ['', Validators.required],
      Device: ['', ],
      Gateway: ['', ],
      SimCard: ['', ],
      ConnectivityType: ['', ]
        });
    }

    
    updateNetworkProfile(profileName, ssid, apn, Device, Gateway, SimCard, ConnectivityType): void {
        this.route.params.subscribe((params) => {

                        this.service.updateNetworkProfile(profileName, ssid, apn, Device, Gateway, SimCard, ConnectivityType, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexNetworkProfile']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getNetworkProfile(params['id']).subscribe(res => {
                this.networkProfile = res;
            });
        });
    }
}