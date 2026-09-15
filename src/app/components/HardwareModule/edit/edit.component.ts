
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HardwareModuleService } from '../../../services/HardwareModule.service';
import { SubBaseComponent } from '../../HardwareModule/sub.base.component';


@Component({
    selector: 'app-edit-hardwareModule',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditHardwareModuleComponent extends SubBaseComponent implements OnInit {

    title = 'Edit HardwareModule';

    hardwareModuleForm: FormGroup;
    hardwareModule: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: HardwareModuleService,
        private fb: FormBuilder
) {
        super(http);
        this.hardwareModuleForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  moduleCode: ['', Validators.required],
      datasheetUri: ['', Validators.required],
      Vendor: ['', ],
      ModuleType: ['', ]
        });
    }

    
    updateHardwareModule(moduleCode, datasheetUri, Vendor, ModuleType): void {
        this.route.params.subscribe((params) => {

                        this.service.updateHardwareModule(moduleCode, datasheetUri, Vendor, ModuleType, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexHardwareModule']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getHardwareModule(params['id']).subscribe(res => {
                this.hardwareModule = res;
            });
        });
    }
}