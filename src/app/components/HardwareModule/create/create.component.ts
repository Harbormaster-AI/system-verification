
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HardwareModuleService } from '../../../services/HardwareModule.service';
import { HardwareModule } from '../../../models/HardwareModule';
import { SubBaseComponent } from '../../HardwareModule/sub.base.component';

@Component({
    selector: 'app-create-hardwareModule',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateHardwareModuleComponent extends SubBaseComponent implements OnInit {

    title = 'Add HardwareModule';

    hardwareModuleForm: FormGroup;
    hardwareModule: HardwareModule;

    constructor( http: HttpClient,
        private hardwareModuleService: HardwareModuleService,
        private fb: FormBuilder,
        private router: Router
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

    
    addHardwareModule(moduleCode, datasheetUri, Vendor, ModuleType): void {
        this.hardwareModuleService
        .addHardwareModule(moduleCode, datasheetUri, Vendor, ModuleType)
            .subscribe(() => {
                this.router.navigate(['/indexHardwareModule']);
            });
    }

    ngOnInit(): void {
    }
}