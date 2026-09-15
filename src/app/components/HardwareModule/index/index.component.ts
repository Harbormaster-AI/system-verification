

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareModuleService } from '../../../services/HardwareModule.service';
import { HardwareModule } from '../../../models/HardwareModule';

@Component({
    selector: 'app-index-hardwareModule',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexHardwareModuleComponent implements OnInit {

    hardwareModules: HardwareModule[] = [];

    constructor(
        private router: Router,
        private service: HardwareModuleService
) {}

    ngOnInit(): void {
        this.getHardwareModules();
}

    getHardwareModules(): void {
        this.service.getHardwareModules().subscribe((res) => {
        this.hardwareModules = res;
    });
}

    deleteHardwareModule(id: any): void {
        this.service.deleteHardwareModule(id)
            .subscribe(() => {
                this.getHardwareModules();
            });
    }
}