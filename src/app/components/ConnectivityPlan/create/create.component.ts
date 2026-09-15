
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectivityPlanService } from '../../../services/ConnectivityPlan.service';
import { ConnectivityPlan } from '../../../models/ConnectivityPlan';
import { SubBaseComponent } from '../../ConnectivityPlan/sub.base.component';

@Component({
    selector: 'app-create-connectivityPlan',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateConnectivityPlanComponent extends SubBaseComponent implements OnInit {

    title = 'Add ConnectivityPlan';

    connectivityPlanForm: FormGroup;
    connectivityPlan: ConnectivityPlan;

    constructor( http: HttpClient,
        private connectivityPlanService: ConnectivityPlanService,
        private fb: FormBuilder,
        private router: Router
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

    
    addConnectivityPlan(name, dataCapMB, billingCycleDays, SimCards, Tenant): void {
        this.connectivityPlanService
        .addConnectivityPlan(name, dataCapMB, billingCycleDays, SimCards, Tenant)
            .subscribe(() => {
                this.router.navigate(['/indexConnectivityPlan']);
            });
    }

    ngOnInit(): void {
    }
}