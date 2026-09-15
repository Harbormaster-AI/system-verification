
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoftwareUpdateExecutionService } from '../../../services/SoftwareUpdateExecution.service';
import { SoftwareUpdateExecution } from '../../../models/SoftwareUpdateExecution';
import { SubBaseComponent } from '../../SoftwareUpdateExecution/sub.base.component';

@Component({
    selector: 'app-create-softwareUpdateExecution',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateSoftwareUpdateExecutionComponent extends SubBaseComponent implements OnInit {

    title = 'Add SoftwareUpdateExecution';

    softwareUpdateExecutionForm: FormGroup;
    softwareUpdateExecution: SoftwareUpdateExecution;

    constructor( http: HttpClient,
        private softwareUpdateExecutionService: SoftwareUpdateExecutionService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.softwareUpdateExecutionForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  startedAt: ['', Validators.required],
      completedAt: ['', Validators.required],
      Campaign: ['', ],
      Device: ['', ],
      Status: ['', ]
        });
    }

    
    addSoftwareUpdateExecution(startedAt, completedAt, Campaign, Device, Status): void {
        this.softwareUpdateExecutionService
        .addSoftwareUpdateExecution(startedAt, completedAt, Campaign, Device, Status)
            .subscribe(() => {
                this.router.navigate(['/indexSoftwareUpdateExecution']);
            });
    }

    ngOnInit(): void {
    }
}