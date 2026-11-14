
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepaymentScheduleService } from '../../../services/RepaymentSchedule.service';
import { RepaymentSchedule } from '../../../models/RepaymentSchedule';
import { SubBaseComponent } from '../../RepaymentSchedule/sub.base.component';

@Component({
    selector: 'app-create-repaymentSchedule',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateRepaymentScheduleComponent extends SubBaseComponent implements OnInit {

    title = 'Add RepaymentSchedule';

    repaymentScheduleForm: FormGroup;
    repaymentSchedule: RepaymentSchedule;

    constructor( http: HttpClient,
        private repaymentScheduleService: RepaymentScheduleService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.repaymentScheduleForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
            #outputDataValidators()
        });
    }

    
    addRepaymentSchedule(installmentNumber, dueDate, principalDue, interestDue, totalDue, LoanAccount, Payment, Status): void {
        this.repaymentScheduleService
        .addRepaymentSchedule(installmentNumber, dueDate, principalDue, interestDue, totalDue, LoanAccount, Payment, Status)
            .subscribe(() => {
                this.router.navigate(['/indexRepaymentSchedule']);
            });
    }

    ngOnInit(): void {
    }
}