
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConnectivityPlanService } from '../../../services/ConnectivityPlan.service';
import { SubBaseComponent } from '../../ConnectivityPlan/sub.base.component';


@Component({
    selector: 'app-edit-connectivityPlan',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditConnectivityPlanComponent extends SubBaseComponent implements OnInit {

    title = 'Edit ConnectivityPlan';

    connectivityPlanForm: FormGroup;
    connectivityPlan: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: ConnectivityPlanService,
        private fb: FormBuilder
) {
        super(http);
        this.connectivityPlanForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      dataCapMB: ['', Validators.required],
      billingCycleDays: ['', Validators.required],
      SimCards: ['', ],
      Tenant: ['', ]
        });
    }

    
    updateConnectivityPlan(name, dataCapMB, billingCycleDays, SimCards, Tenant): void {
        this.route.params.subscribe((params) => {

                        this.service.updateConnectivityPlan(name, dataCapMB, billingCycleDays, SimCards, Tenant, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexConnectivityPlan']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getConnectivityPlan(params['id']).subscribe(res => {
                this.connectivityPlan = res;
            });
        });
    }
}