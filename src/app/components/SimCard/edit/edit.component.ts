
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SimCardService } from '../../../services/SimCard.service';
import { SubBaseComponent } from '../../SimCard/sub.base.component';


@Component({
    selector: 'app-edit-simCard',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditSimCardComponent extends SubBaseComponent implements OnInit {

    title = 'Edit SimCard';

    simCardForm: FormGroup;
    simCard: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: SimCardService,
        private fb: FormBuilder
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

    
    updateSimCard(iccid, imsi, carrier, NetworkProfiles, Tenant, ConnectivityPlan, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateSimCard(iccid, imsi, carrier, NetworkProfiles, Tenant, ConnectivityPlan, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexSimCard']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getSimCard(params['id']).subscribe(res => {
                this.simCard = res;
            });
        });
    }
}