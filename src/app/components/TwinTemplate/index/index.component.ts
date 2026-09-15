

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwinTemplateService } from '../../../services/TwinTemplate.service';
import { TwinTemplate } from '../../../models/TwinTemplate';

@Component({
    selector: 'app-index-twinTemplate',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexTwinTemplateComponent implements OnInit {

    twinTemplates: TwinTemplate[] = [];

    constructor(
        private router: Router,
        private service: TwinTemplateService
) {}

    ngOnInit(): void {
        this.getTwinTemplates();
}

    getTwinTemplates(): void {
        this.service.getTwinTemplates().subscribe((res) => {
        this.twinTemplates = res;
    });
}

    deleteTwinTemplate(id: any): void {
        this.service.deleteTwinTemplate(id)
            .subscribe(() => {
                this.getTwinTemplates();
            });
    }
}