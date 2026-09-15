
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwinTemplateService } from '../../../services/TwinTemplate.service';
import { TwinTemplate } from '../../../models/TwinTemplate';
import { SubBaseComponent } from '../../TwinTemplate/sub.base.component';

@Component({
    selector: 'app-create-twinTemplate',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateTwinTemplateComponent extends SubBaseComponent implements OnInit {

    title = 'Add TwinTemplate';

    twinTemplateForm: FormGroup;
    twinTemplate: TwinTemplate;

    constructor( http: HttpClient,
        private twinTemplateService: TwinTemplateService,
        private fb: FormBuilder,
        private router: Router
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

    
    addTwinTemplate(name, schemaUri, version, DeviceModels): void {
        this.twinTemplateService
        .addTwinTemplate(name, schemaUri, version, DeviceModels)
            .subscribe(() => {
                this.router.navigate(['/indexTwinTemplate']);
            });
    }

    ngOnInit(): void {
    }
}