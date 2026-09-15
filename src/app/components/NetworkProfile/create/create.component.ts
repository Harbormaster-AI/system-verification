
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkProfileService } from '../../../services/NetworkProfile.service';
import { NetworkProfile } from '../../../models/NetworkProfile';
import { SubBaseComponent } from '../../NetworkProfile/sub.base.component';

@Component({
    selector: 'app-create-networkProfile',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateNetworkProfileComponent extends SubBaseComponent implements OnInit {

    title = 'Add NetworkProfile';

    networkProfileForm: FormGroup;
    networkProfile: NetworkProfile;

    constructor( http: HttpClient,
        private networkProfileService: NetworkProfileService,
        private fb: FormBuilder,
        private router: Router
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

    
    addNetworkProfile(profileName, ssid, apn, Device, Gateway, SimCard, ConnectivityType): void {
        this.networkProfileService
        .addNetworkProfile(profileName, ssid, apn, Device, Gateway, SimCard, ConnectivityType)
            .subscribe(() => {
                this.router.navigate(['/indexNetworkProfile']);
            });
    }

    ngOnInit(): void {
    }
}