
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TwinTemplateService } from '../../../services/TwinTemplate.service';
import { SubBaseComponent } from '../../TwinTemplate/sub.base.component';


@Component({
    selector: 'app-edit-twinTemplate',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditTwinTemplateComponent extends SubBaseComponent implements OnInit {

    title = 'Edit TwinTemplate';

    twinTemplateForm: FormGroup;
    twinTemplate: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: TwinTemplateService,
        private fb: FormBuilder
) {
        super(http);
        this.twinTemplateForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      schemaUri: ['', Validators.required],
      version: ['', Validators.required],
      DeviceModels: ['', ]
        });
    }

    
    updateTwinTemplate(name, schemaUri, version, DeviceModels): void {
        this.route.params.subscribe((params) => {

                        this.service.updateTwinTemplate(name, schemaUri, version, DeviceModels, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexTwinTemplate']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getTwinTemplate(params['id']).subscribe(res => {
                this.twinTemplate = res;
            });
        });
    }
}