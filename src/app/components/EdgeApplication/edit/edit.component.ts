
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EdgeApplicationService } from '../../../services/EdgeApplication.service';
import { SubBaseComponent } from '../../EdgeApplication/sub.base.component';


@Component({
    selector: 'app-edit-edgeApplication',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditEdgeApplicationComponent extends SubBaseComponent implements OnInit {

    title = 'Edit EdgeApplication';

    edgeApplicationForm: FormGroup;
    edgeApplication: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: EdgeApplicationService,
        private fb: FormBuilder
) {
        super(http);
        this.edgeApplicationForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      version: ['', Validators.required],
      image: ['', Validators.required],
      Gateway: ['', ],
      Status: ['', ]
        });
    }

    
    updateEdgeApplication(name, version, image, Gateway, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateEdgeApplication(name, version, image, Gateway, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexEdgeApplication']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getEdgeApplication(params['id']).subscribe(res => {
                this.edgeApplication = res;
            });
        });
    }
}