
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SoftwareUpdateExecutionService } from '../../../services/SoftwareUpdateExecution.service';
import { SubBaseComponent } from '../../SoftwareUpdateExecution/sub.base.component';


@Component({
    selector: 'app-edit-softwareUpdateExecution',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditSoftwareUpdateExecutionComponent extends SubBaseComponent implements OnInit {

    title = 'Edit SoftwareUpdateExecution';

    softwareUpdateExecutionForm: FormGroup;
    softwareUpdateExecution: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: SoftwareUpdateExecutionService,
        private fb: FormBuilder
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

    
    updateSoftwareUpdateExecution(startedAt, completedAt, Campaign, Device, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateSoftwareUpdateExecution(startedAt, completedAt, Campaign, Device, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexSoftwareUpdateExecution']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getSoftwareUpdateExecution(params['id']).subscribe(res => {
                this.softwareUpdateExecution = res;
            });
        });
    }
}