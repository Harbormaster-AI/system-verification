
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimCardService } from '../../../services/SimCard.service';
import { SimCard } from '../../../models/SimCard';
import { SubBaseComponent } from '../../SimCard/sub.base.component';

@Component({
    selector: 'app-create-simCard',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateSimCardComponent extends SubBaseComponent implements OnInit {

    title = 'Add SimCard';

    simCardForm: FormGroup;
    simCard: SimCard;

    constructor( http: HttpClient,
        private simCardService: SimCardService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.simCardForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  iccid: ['', Validators.required],
      imsi: ['', Validators.required],
      carrier: ['', Validators.required],
      NetworkProfiles: ['', ],
      Tenant: ['', ],
      ConnectivityPlan: ['', ],
      Status: ['', ]
        });
    }

    
    addSimCard(iccid, imsi, carrier, NetworkProfiles, Tenant, ConnectivityPlan, Status): void {
        this.simCardService
        .addSimCard(iccid, imsi, carrier, NetworkProfiles, Tenant, ConnectivityPlan, Status)
            .subscribe(() => {
                this.router.navigate(['/indexSimCard']);
            });
    }

    ngOnInit(): void {
    }
}