
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdgeApplicationService } from '../../../services/EdgeApplication.service';
import { EdgeApplication } from '../../../models/EdgeApplication';
import { SubBaseComponent } from '../../EdgeApplication/sub.base.component';

@Component({
    selector: 'app-create-edgeApplication',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateEdgeApplicationComponent extends SubBaseComponent implements OnInit {

    title = 'Add EdgeApplication';

    edgeApplicationForm: FormGroup;
    edgeApplication: EdgeApplication;

    constructor( http: HttpClient,
        private edgeApplicationService: EdgeApplicationService,
        private fb: FormBuilder,
        private router: Router
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

    
    addEdgeApplication(name, version, image, Gateway, Status): void {
        this.edgeApplicationService
        .addEdgeApplication(name, version, image, Gateway, Status)
            .subscribe(() => {
                this.router.navigate(['/indexEdgeApplication']);
            });
    }

    ngOnInit(): void {
    }
}